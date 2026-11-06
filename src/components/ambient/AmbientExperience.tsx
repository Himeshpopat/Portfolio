import { memo, useEffect, useRef } from 'react'
import {
  getResponsiveCount,
  setupHiDPICanvas,
  usePointerTracker,
  usePrefersReducedMotion,
  useSectionVisibility,
} from './ambientUtils'

interface TimeMote {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  color: string
}

const EXP_PALETTE = [
  '223, 183, 243',   // Terracotta
  '188, 133, 205', // Sage
  '192, 174, 211', // Paper Tint
]

export const AmbientExperience = memo(function AmbientExperience({
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

    const count = getResponsiveCount(24)
    const motes: TimeMote[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0.2 + Math.random() * 0.4, // Steady forward progression
      vy: (Math.random() - 0.45) * 0.15,
      radius: 0.9 + Math.random() * 1.4,
      alpha: 0.1 + Math.random() * 0.25,
      color: EXP_PALETTE[Math.floor(Math.random() * EXP_PALETTE.length)],
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

      for (const m of motes) {
        m.x += m.vx * dt * 45
        m.y += m.vy * dt * 45

        // Subtle cursor eddy
        if (pointer.active) {
          const dx = m.x - pointer.x
          const dy = m.y - pointer.y
          const dist = Math.hypot(dx, dy)
          if (dist < 140 && dist > 1) {
            // Perpendicular swirl component
            m.x += (-dy / dist) * 0.4
            m.y += (dx / dist) * 0.4
          }
        }

        if (m.x > width + 10) m.x = -10
        if (m.y < -10) m.y = height + 10
        if (m.y > height + 10) m.y = -10

        ctx.beginPath()
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${m.color}, ${m.alpha})`
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
      {/* Timeline luminous vertical beam */}
      <div className="experience-stream" />

      {/* Laminar time-mote canvas */}
      <canvas ref={canvasRef} className="ambient-canvas" />
    </div>
  )
})

