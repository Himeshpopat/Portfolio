import { memo, useEffect, useRef } from 'react'
import {
  getResponsiveCount,
  setupHiDPICanvas,
  usePointerTracker,
  usePrefersReducedMotion,
  useSectionVisibility,
} from './ambientUtils'

interface Firefly {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseAlpha: number
  pulseSpeed: number
  pulsePhase: number
  color: string
}

const PROJECT_PALETTE = [
  '235, 165, 125', // Warm Peach
  '110, 165, 102', // Bioluminescent Forest Emerald
  '166, 176, 158', // Sage Dust
  '200, 140, 100', // Deep Terracotta Warmth
]

export const AmbientProjects = memo(function AmbientProjects({
  visible = true,
}: {
  visible?: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isIntersecting = useSectionVisibility(containerRef, visible)
  const reducedMotion = usePrefersReducedMotion()
  const { getCoords } = usePointerTracker(containerRef)

  const isVisible = visible && isIntersecting

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

    const count = getResponsiveCount(34)
    const fireflies: Firefly[] = Array.from({ length: count }, () => {
      const baseAlpha = 0.2 + Math.random() * 0.45
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 1.0 + Math.random() * 1.8,
        baseAlpha,
        pulseSpeed: 0.015 + Math.random() * 0.025,
        pulsePhase: Math.random() * Math.PI * 2,
        color: PROJECT_PALETTE[Math.floor(Math.random() * PROJECT_PALETTE.length)],
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

      // Interactive warm peach lantern glow on dark forest ground
      if (pointer.active && pointer.x > 0 && pointer.y > 0) {
        const lantern = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 360)
        lantern.addColorStop(0, 'rgba(235, 165, 125, 0.075)')
        lantern.addColorStop(0.4, 'rgba(48, 82, 44, 0.04)')
        lantern.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = lantern
        ctx.fillRect(0, 0, width, height)
      }

      // Constellation proximity lines
      const maxDist = 78
      for (let i = 0; i < fireflies.length; i++) {
        for (let j = i + 1; j < fireflies.length; j++) {
          const dx = fireflies[i].x - fireflies[j].x
          const dy = fireflies[i].y - fireflies[j].y
          const dist = Math.hypot(dx, dy)
          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.12
            ctx.beginPath()
            ctx.moveTo(fireflies[i].x, fireflies[i].y)
            ctx.lineTo(fireflies[j].x, fireflies[j].y)
            ctx.strokeStyle = `rgba(235, 165, 125, ${lineAlpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // Update and render fireflies
      for (const f of fireflies) {
        f.pulsePhase += f.pulseSpeed
        f.x += f.vx * dt * 40
        f.y += f.vy * dt * 40

        // Gentle interactive attraction toward cursor
        if (pointer.active) {
          const dx = pointer.x - f.x
          const dy = pointer.y - f.y
          const dist = Math.hypot(dx, dy)
          if (dist < 180 && dist > 10) {
            const pull = (1 - dist / 180) * 0.4
            f.x += (dx / dist) * pull
            f.y += (dy / dist) * pull
          }
        }

        // Boundary wrap
        if (f.x < -10) f.x = width + 10
        if (f.x > width + 10) f.x = -10
        if (f.y < -10) f.y = height + 10
        if (f.y > height + 10) f.y = -10

        const alpha = Math.max(0.1, Math.min(0.9, f.baseAlpha + Math.sin(f.pulsePhase) * 0.25))

        // Soft outer aura
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.radius * 2.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${f.color}, ${alpha * 0.22})`
        ctx.fill()

        // Crisp inner firefly core
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${f.color}, ${alpha})`
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
      {/* Deep forest aurora fields */}
      <div className="ambient-orb projects-aurora-1" />
      <div className="ambient-orb projects-aurora-2" />
      <div className="ambient-orb projects-aurora-3" />

      {/* Bioluminescent firefly & constellation canvas */}
      <canvas ref={canvasRef} className="ambient-canvas" />
    </div>
  )
})

