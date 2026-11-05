import { memo, useEffect, useRef } from 'react'
import {
  getResponsiveCount,
  setupHiDPICanvas,
  usePointerTracker,
  usePrefersReducedMotion,
  useSectionVisibility,
} from './ambientUtils'

interface LeafMote {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  phase: number
}

export const AmbientAbout = memo(function AmbientAbout({
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
    const motes: LeafMote[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.45) * 0.25,
      vy: -(0.15 + Math.random() * 0.3), // gentle upward float
      radius: 0.9 + Math.random() * 1.5,
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

      // Interactive gentle warmth aura
      if (pointer.active && pointer.x > 0 && pointer.y > 0) {
        const aura = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 280)
        aura.addColorStop(0, 'rgba(184, 70, 31, 0.04)')
        aura.addColorStop(0.5, 'rgba(175, 185, 162, 0.03)')
        aura.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = aura
        ctx.fillRect(0, 0, width, height)
      }

      for (const m of motes) {
        m.phase += 0.015
        m.x += m.vx * dt * 40 + Math.sin(m.phase) * 0.3
        m.y += m.vy * dt * 40

        if (m.y < -10) {
          m.y = height + 10
          m.x = Math.random() * width
        }
        if (m.x < -10) m.x = width + 10
        if (m.x > width + 10) m.x = -10

        ctx.beginPath()
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(184, 70, 31, ${m.alpha})`
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
      {/* Topographical flowing contour waves (SVG) */}
      <svg className="about-contours" viewBox="0 0 1000 600" fill="none" preserveAspectRatio="none">
        <path
          d="M0,150 C250,90 400,240 700,160 C900,100 950,220 1000,190"
          stroke="#969f89"
          strokeWidth="0.8"
          strokeDasharray="4 8"
          strokeOpacity="0.45"
        />
        <path
          d="M0,320 C200,280 450,380 650,310 C850,250 920,340 1000,320"
          stroke="#969f89"
          strokeWidth="0.8"
          strokeDasharray="6 10"
          strokeOpacity="0.35"
        />
        <path
          d="M0,480 C300,420 500,520 800,460 C900,440 960,490 1000,480"
          stroke="#b8461f"
          strokeWidth="0.6"
          strokeDasharray="3 9"
          strokeOpacity="0.25"
        />
      </svg>

      {/* Academic card focal glow */}
      <div className="about-academic-glow" />

      {/* Drifting organic pollen canvas */}
      <canvas ref={canvasRef} className="ambient-canvas" />
    </div>
  )
})

