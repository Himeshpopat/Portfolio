import { memo, useEffect, useRef } from 'react'
import {
  getResponsiveCount,
  setupHiDPICanvas,
  usePointerTracker,
  usePrefersReducedMotion,
  useSectionVisibility,
} from './ambientUtils'

interface GitNode {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  connectedTo: number[]
}

export const AmbientGithub = memo(function AmbientGithub({
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
    const nodes: GitNode[] = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: 1.2 + Math.random() * 1.0,
      alpha: 0.14 + Math.random() * 0.22,
      connectedTo: i > 0 && Math.random() > 0.4 ? [Math.floor(Math.random() * i)] : [],
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

      // Render branch connections with traveling pulses
      for (let i = 0; i < nodes.length; i++) {
        for (const targetIdx of nodes[i].connectedTo) {
          const target = nodes[targetIdx]
          if (!target) continue

          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(target.x, target.y)
          ctx.strokeStyle = 'rgba(189, 195, 178, 0.18)'
          ctx.lineWidth = 0.7
          ctx.stroke()

          // Traveling pulse along commit branch
          const progress = ((time * 0.0006 + i * 0.2) % 1)
          const px = nodes[i].x + (target.x - nodes[i].x) * progress
          const py = nodes[i].y + (target.y - nodes[i].y) * progress

          ctx.beginPath()
          ctx.arc(px, py, 1.4, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(184, 70, 31, 0.4)'
          ctx.fill()
        }
      }

      // Render nodes
      for (const n of nodes) {
        n.x += n.vx * dt * 40
        n.y += n.vy * dt * 40

        if (pointer.active) {
          const dx = pointer.x - n.x
          const dy = pointer.y - n.y
          const dist = Math.hypot(dx, dy)
          if (dist < 120 && dist > 1) {
            n.x += (dx / dist) * 0.3
            n.y += (dy / dist) * 0.3
          }
        }

        if (n.x < -10) n.x = width + 10
        if (n.x > width + 10) n.x = -10
        if (n.y < -10) n.y = height + 10
        if (n.y > height + 10) n.y = -10

        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(52, 59, 50, ${n.alpha})`
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

