import { memo, useEffect, useRef } from 'react'
import {
  getResponsiveCount,
  setupHiDPICanvas,
  usePointerTracker,
  usePrefersReducedMotion,
  useSectionVisibility,
} from './ambientUtils'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  baseAlpha: number
  color: string
  phase: number
  freq: number
  amp: number
}

const COLORS = [
  '184, 70, 31',   // Terracotta
  '125, 139, 116', // Sage
  '207, 171, 128', // Warm Gold/Ivory
  '189, 195, 178', // Paper Tint
]

export const AmbientHero = memo(function AmbientHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isVisible = useSectionVisibility(containerRef, true)
  const reducedMotion = usePrefersReducedMotion()
  const { getCoords } = usePointerTracker(containerRef)

  useEffect(() => {
    if (reducedMotion || !isVisible) return

    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let width = container.clientWidth
    let height = container.clientHeight

    const setup = () => {
      width = container.clientWidth
      height = container.clientHeight
      setupHiDPICanvas(canvas, ctx, width, height)
    }

    setup()

    const count = getResponsiveCount(32)
    const particles: Particle[] = Array.from({ length: count }, () => {
      const baseAlpha = 0.12 + Math.random() * 0.28
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(0.18 + Math.random() * 0.35), // gentle upward float
        radius: 0.9 + Math.random() * 1.5,
        alpha: baseAlpha,
        baseAlpha,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        phase: Math.random() * Math.PI * 2,
        freq: 0.008 + Math.random() * 0.012,
        amp: 0.4 + Math.random() * 0.8,
      }
    })

    const resizeObserver = new ResizeObserver(() => {
      setup()
    })
    resizeObserver.observe(container)

    let lastTime = performance.now()

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1)
      lastTime = time

      ctx.clearRect(0, 0, width, height)

      const pointer = getCoords()

      // Interactive subtle ambient cursor halo
      if (pointer.active && pointer.x > 0 && pointer.y > 0) {
        const glow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 320)
        glow.addColorStop(0, 'rgba(184, 70, 31, 0.045)')
        glow.addColorStop(0.5, 'rgba(125, 139, 116, 0.02)')
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = glow
        ctx.fillRect(0, 0, width, height)
      }

      // Render stardust particles
      for (const p of particles) {
        p.phase += p.freq
        p.x += p.vx + Math.sin(p.phase) * p.amp * dt * 30
        p.y += p.vy * dt * 45

        // Interactive deflection from pointer
        if (pointer.active) {
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const dist = Math.hypot(dx, dy)
          const minDist = 120
          if (dist < minDist && dist > 0.1) {
            const force = (1 - dist / minDist) * 1.2
            p.x += (dx / dist) * force
            p.y += (dy / dist) * force
          }
        }

        // Wrap around boundaries smoothly
        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        } else if (p.y > height + 10) {
          p.y = -10
        }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        // Soft pulse in opacity
        const pulse = Math.sin(p.phase * 0.7) * 0.1
        const alpha = Math.max(0.05, Math.min(0.5, p.baseAlpha + pulse))

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${alpha})`
        ctx.fill()
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      resizeObserver.disconnect()
    }
  }, [isVisible, reducedMotion, getCoords])

  return (
    <div ref={containerRef} className="ambient-wrapper" aria-hidden="true">
      {/* Organic atmospheric gradient mesh */}
      <div className="ambient-orb hero-ambient-orb-1" />
      <div className="ambient-orb hero-ambient-orb-2" />
      <div className="ambient-orb hero-ambient-orb-3" />

      {/* Architectural precision rings */}
      <svg className="hero-precision-rings" viewBox="0 0 600 600" fill="none">
        <circle cx="300" cy="300" r="160" stroke="#bdc3b2" strokeWidth="0.8" strokeDasharray="3 7" strokeOpacity="0.4" />
        <circle cx="300" cy="300" r="230" stroke="#bdc3b2" strokeWidth="0.6" strokeDasharray="6 10" strokeOpacity="0.3" />
        <circle cx="300" cy="300" r="285" stroke="#b8461f" strokeWidth="0.5" strokeOpacity="0.22" />
        <line x1="290" y1="300" x2="310" y2="300" stroke="#b8461f" strokeWidth="1" strokeOpacity="0.35" />
        <line x1="300" y1="290" x2="300" y2="310" stroke="#b8461f" strokeWidth="1" strokeOpacity="0.35" />
      </svg>

      {/* Living stardust canvas */}
      <canvas ref={canvasRef} className="ambient-canvas" />
    </div>
  )
})

