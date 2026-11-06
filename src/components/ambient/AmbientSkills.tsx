import { memo, useEffect, useRef } from 'react'
import {
  getResponsiveCount,
  setupHiDPICanvas,
  usePointerTracker,
  usePrefersReducedMotion,
  useSectionVisibility,
} from './ambientUtils'

interface SkillNode {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  hasRing: boolean
}

export const AmbientSkills = memo(function AmbientSkills({
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

    const count = getResponsiveCount(26)
    const nodes: SkillNode[] = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      radius: 1.1 + Math.random() * 0.8,
      alpha: 0.15 + Math.random() * 0.25,
      hasRing: i % 3 === 0,
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

      // Connect adjacent nodes with fine filaments
      const maxConn = 75
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.hypot(dx, dy)
          if (dist < maxConn) {
            const lineAlpha = (1 - dist / maxConn) * 0.14
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(192, 174, 211, ${lineAlpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // Render micro-nodes
      for (const n of nodes) {
        n.x += n.vx * dt * 40
        n.y += n.vy * dt * 40

        if (pointer.active) {
          const dx = pointer.x - n.x
          const dy = pointer.y - n.y
          const dist = Math.hypot(dx, dy)
          if (dist < 130 && dist > 1) {
            const pull = (1 - dist / 130) * 0.35
            n.x += (dx / dist) * pull
            n.y += (dy / dist) * pull
          }
        }

        if (n.x < -10) n.x = width + 10
        if (n.x > width + 10) n.x = -10
        if (n.y < -10) n.y = height + 10
        if (n.y > height + 10) n.y = -10

        // Solid core
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(188, 133, 205, ${n.alpha})`
        ctx.fill()

        // Occasional concentric radar ring
        if (n.hasRing) {
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.radius * 3.5, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(223, 183, 243, ${n.alpha * 0.35})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
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
      {/* Flowing technical gradient mesh */}
      <div className="skills-gradient-band" />

      {/* Technical micro-nodes canvas */}
      <canvas ref={canvasRef} className="ambient-canvas" />
    </div>
  )
})

