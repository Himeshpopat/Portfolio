import { useState, memo, type ReactNode } from 'react'

export const SkillChip = memo(function SkillChip({ children }: { children: ReactNode }) {
  const [hov, setHov] = useState(false)
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
      style={{
        background: hov ? 'rgba(6,182,212,0.1)' : 'rgba(255,255,255,0.05)',
        color: hov ? '#06b6d4' : '#cbd5e1',
        border: hov ? '1px solid rgba(6,182,212,0.25)' : '1px solid transparent',
        fontFamily: 'var(--font-body)',
        userSelect: 'none',
      }}
    >
      {children}
    </span>
  )
})
