import React, { useState, useEffect, memo } from 'react'
import type { ClickBurst } from '../../types/portfolio'

export const CustomCursor = memo(function CustomCursor() {
  const [clicks, setClicks] = useState<ClickBurst[]>([])

  useEffect(() => {
    const timers = new Set<ReturnType<typeof setTimeout>>()
    const onClick = (e: globalThis.MouseEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return
      const angles = [0, 45, 90, 135, 180, 225, 270, 315]
      const dist = 70
      const newClick: ClickBurst = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        particles: angles.map((a) => ({
          dx: Math.cos((a * Math.PI) / 180) * dist,
          dy: Math.sin((a * Math.PI) / 180) * dist,
        })),
      }
      setClicks((prev) => [...prev.slice(-4), newClick])
      const timer = setTimeout(() => {
        timers.delete(timer)
        setClicks((prev) => prev.filter((c) => c.id !== newClick.id))
      }, 450)
      timers.add(timer)
    }

    window.addEventListener('pointerdown', onClick, { capture: true, passive: true })
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('pointerdown', onClick, { capture: true })
    }
  }, [])

  return (
    <>
      {clicks.map((c) => (
        <React.Fragment key={c.id}>
          <div
            className="pointer-events-none fixed top-0 left-0 z-[9997]"
            style={{
              left: c.x,
              top: c.y,
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: 24,
                height: 24,
                border: '1.5px solid var(--accent)',
                animation: 'cursorRingBurst 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                willChange: 'transform, opacity',
              }}
            />
          </div>
          {c.particles.map((p, idx) => {
            const pColor = idx % 2 === 0 ? 'var(--accent)' : '#8b5cf6'
            return (
              <div
                key={idx}
                className="pointer-events-none fixed top-0 left-0 z-[9997] rounded-full"
                style={{
                  width: 6,
                  height: 6,
                  background: pColor,
                  boxShadow: `0 0 8px ${pColor}`,
                  left: c.x,
                  top: c.y,
                  ['--dx' as string]: `${p.dx}px`,
                  ['--dy' as string]: `${p.dy}px`,
                  animation: 'cursorParticleBurst 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                  willChange: 'transform, opacity',
                }}
              />
            )
          })}
        </React.Fragment>
      ))}
    </>
  )
})
