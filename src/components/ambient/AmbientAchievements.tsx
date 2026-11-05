import { memo, useEffect, useRef } from 'react'
import {
  getResponsiveCount,
  setupHiDPICanvas,
  usePointerTracker,
  usePrefersReducedMotion,
  useSectionVisibility,
} from './ambientUtils'

interface DustParticle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  phase: number
}

export const AmbientAchievements = memo(function AmbientAchievements({
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

    const count = getResponsiveCount(20)
    const dust: DustParticle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      radius: 0.8 + Math.random() * 1.4,
      alpha: 0.12 + Math.random() * 0.25,
      phase: Math.random() * Math.PI * 2,
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

      // Precision technical coordinate ticks
      const stepX = 140
      const stepY = 120
      const tickAlpha = 0.14 + Math.sin(time * 0.001) * 0.05
      ctx.strokeStyle = `rgba(189, 195, 178, ${tickAlpha})`
      ctx.lineWidth = 0.6

      for (let x = stepX; x < width; x += stepX) {
        for (let y = stepY; y < height; y += stepY) {
          ctx.beginPath()
          ctx.moveTo(x - 4, y)
          ctx.lineTo(x + 4, y)
          ctx.moveTo(x, y - 4)
          ctx.lineTo(x, y + 4)
          ctx.stroke()
        }
      }

      // Amber dust particles
      for (const d of dust) {
        d.phase += 0.015
        d.x += d.vx * dt * 40
        d.y += d.vy * dt * 40

        if (pointer.active) {
          const dx = pointer.x - d.x
          const dy = pointer.y - d.y
          const dist = Math.hypot(dx, dy)
          if (dist < 120 && dist > 1) {
            d.x += (dx / dist) * 0.3
            d.y += (dy / dist) * 0.3
          }
        }

        if (d.x < -10) d.x = width + 10
        if (d.x > width + 10) d.x = -10
        if (d.y < -10) d.y = height + 10
        if (d.y > height + 10) d.y = -10

        const a = Math.max(0.05, Math.min(0.4, d.alpha + Math.sin(d.phase) * 0.1))
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(184, 70, 31, ${a})`
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
      {/* High impact metric focal halo */}
      <div className="achievements-halo" />

      {/* Coordinate ticks and amber dust canvas */}
      <canvas ref={canvasRef} className="ambient-canvas" />
    </div>
  )
})

