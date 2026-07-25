import { useState, memo, type ReactNode } from 'react'

export const SocialPill = memo(function SocialPill({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: ReactNode
}) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
      style={{
        border: hov ? '1px solid rgba(6,182,212,0.5)' : '1px solid rgba(255,255,255,0.1)',
        color: hov ? '#06b6d4' : '#94a3b8',
        background: hov ? 'rgba(6,182,212,0.06)' : 'transparent',
        transform: hov ? 'scale(1.1)' : 'scale(1)',
      }}
    >
      {children}
    </a>
  )
})
