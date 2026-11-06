import { memo, useEffect, useRef } from 'react'
import {
  getResponsiveCount,
  setupHiDPICanvas,
  usePointerTracker,
  usePrefersReducedMotion,
  useSectionVisibility,
} from './ambientUtils'

interface WaveMote {
  baseY: number
  x: number
  speed: number
  amplitude: number
  frequency: number
  radius: number
  alpha: number
  color: string
}

const LEARNING_PALETTE = [
  '223, 183, 243',   // Terracotta
  '188, 133, 205', // Sage
  '219, 201, 235', // Warm Gold
]

export const AmbientLearning = memo(function AmbientLearning({
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

    const count = getResponsiveCount(22)
    const motes: WaveMote[] = Array.from({ length: count }, () => ({
      baseY: Math.random() * height,
      x: Math.random() * width,
      speed: 0.25 + Math.random() * 0.45,
      amplitude: 15 + Math.random() * 25,
      frequency: 0.005 + Math.random() * 0.008,
      radius: 0.9 + Math.random() * 1.5,
      alpha: 0.12 + Math.random() * 0.28,
      color: LEARNING_PALETTE[Math.floor(Math.random() * LEARNING_PALETTE.length)],
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
        m.x += m.speed * dt * 50
        const y = m.baseY + Math.sin(m.x * m.frequency + time * 0.001) * m.amplitude

        if (pointer.active) {
          const dx = pointer.x - m.x
          const dy = pointer.y - y
          const dist = Math.hypot(dx, dy)
          if (dist < 120 && dist > 1) {
            m.x -= (dx / dist) * 0.4
          }
        }

        if (m.x > width + 20) {
          m.x = -20
          m.baseY = Math.random() * height
        }

        ctx.beginPath()
        ctx.arc(m.x, y, m.radius, 0, Math.PI * 2)
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
      <canvas ref={canvasRef} className="ambient-canvas" />
    </div>
  )
})

