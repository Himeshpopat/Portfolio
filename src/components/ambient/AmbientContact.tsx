import { memo, useEffect, useRef } from 'react'
import {
  getResponsiveCount,
  setupHiDPICanvas,
  usePointerTracker,
  usePrefersReducedMotion,
  useSectionVisibility,
} from './ambientUtils'

interface Ember {
  x: number
  y: number
  speedY: number
  wobbleSpeed: number
  wobbleAmp: number
  wobblePhase: number
  radius: number
  maxAlpha: number
  color: string
}

const EMBER_COLORS = [
  '235, 165, 125', // Warm Peach
  '215, 125, 80',  // Hearth Terracotta
  '245, 195, 160', // Golden Amber
]

export const AmbientContact = memo(function AmbientContact({
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

    const count = getResponsiveCount(36)
    const embers: Ember[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speedY: 0.35 + Math.random() * 0.65,
      wobbleSpeed: 0.015 + Math.random() * 0.025,
      wobbleAmp: 0.6 + Math.random() * 1.2,
      wobblePhase: Math.random() * Math.PI * 2,
      radius: 1.0 + Math.random() * 1.8,
      maxAlpha: 0.35 + Math.random() * 0.45,
      color: EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)],
    }))

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

      // Interactive warm lantern aura around email & links
      if (pointer.active && pointer.x > 0 && pointer.y > 0) {
        const lantern = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 340)
        lantern.addColorStop(0, 'rgba(235, 165, 125, 0.09)')
        lantern.addColorStop(0.4, 'rgba(48, 75, 42, 0.04)')
        lantern.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = lantern
        ctx.fillRect(0, 0, width, height)
      }

      // Render rising embers
      for (const e of embers) {
        e.wobblePhase += e.wobbleSpeed
        e.y -= e.speedY * dt * 50
        e.x += Math.sin(e.wobblePhase) * e.wobbleAmp * dt * 30

        // Cursor deflection
        if (pointer.active) {
          const dx = e.x - pointer.x
          const dy = e.y - pointer.y
          const dist = Math.hypot(dx, dy)
          if (dist < 140 && dist > 1) {
            const push = (1 - dist / 140) * 0.8
            e.x += (dx / dist) * push
            e.y += (dy / dist) * push
          }
        }

        // Fade in from bottom, fade out near top
        const relativeY = e.y / height
        let alphaFactor = 1
        if (relativeY > 0.85) {
          alphaFactor = (1 - relativeY) / 0.15
        } else if (relativeY < 0.25) {
          alphaFactor = relativeY / 0.25
        }
        const alpha = Math.max(0, Math.min(1, e.maxAlpha * alphaFactor))

        if (e.y < -15) {
          e.y = height + 10
          e.x = Math.random() * width
        }
        if (e.x < -10) e.x = width + 10
        if (e.x > width + 10) e.x = -10

        // Ember soft glow halo
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.radius * 2.6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${e.color}, ${alpha * 0.25})`
        ctx.fill()

        // Ember hot core
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${e.color}, ${alpha})`
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
      {/* Closing atmospheric aurora breath */}
      <div className="contact-aurora" />

      {/* Ascending warm embers canvas */}
      <canvas ref={canvasRef} className="ambient-canvas" />
    </div>
  )
})

