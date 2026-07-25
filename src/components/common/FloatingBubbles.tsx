import { memo } from 'react'

export const FloatingBubbles = memo(function FloatingBubbles() {
  const bubbles = [
    { left: '4%', size: 18, color: '#06b6d4', delay: '0s', dur: '16s' },
    { left: '14%', size: 10, color: '#8b5cf6', delay: '3s', dur: '13s' },
    { left: '24%', size: 24, color: '#06b6d4', delay: '7s', dur: '20s' },
    { left: '38%', size: 8, color: '#f59e0b', delay: '1.5s', dur: '11s' },
    { left: '52%', size: 14, color: '#8b5cf6', delay: '5s', dur: '17s' },
    { left: '64%', size: 20, color: '#06b6d4', delay: '9s', dur: '19s' },
    { left: '76%', size: 10, color: '#f59e0b', delay: '2.5s', dur: '14s' },
    { left: '86%', size: 16, color: '#8b5cf6', delay: '6s', dur: '15s' },
    { left: '94%', size: 12, color: '#06b6d4', delay: '4s', dur: '18s' },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="absolute rounded-full bubble-rise"
          style={{
            left: b.left,
            bottom: -40,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle at 35% 30%, ${b.color}55, ${b.color}00 70%)`,
            border: `1px solid ${b.color}33`,
            animationDelay: b.delay,
            animationDuration: b.dur,
          }}
        />
      ))}
    </div>
  )
})
