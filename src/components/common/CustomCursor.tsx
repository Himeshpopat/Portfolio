import React, { useState, useEffect, memo } from 'react'
import type { ClickBurst } from '../../types/portfolio'

export const CustomCursor = memo(function CustomCursor() {
  const [clicks, setClicks] = useState<ClickBurst[]>([])

  useEffect(() => {
    const onClick = (e: globalThis.MouseEvent) => {
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
      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== newClick.id))
      }, 450)
    }

    window.addEventListener('pointerdown', onClick, { capture: true, passive: true })
    return () => {
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
                border: '1.5px solid #06b6d4',
                animation: 'cursorRingBurst 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                willChange: 'transform, opacity',
              }}
            />
          </div>
          {c.particles.map((p, idx) => {
            const pColor = idx % 2 === 0 ? '#06b6d4' : '#8b5cf6'
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
