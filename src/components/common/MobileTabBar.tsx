import { memo, type ReactNode } from 'react'
import { NAV_SECTIONS } from '../../data/navigationData'

const TAB_ICONS: Record<string, (active: boolean) => ReactNode> = {
  about: (active) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#22d3ee' : '#64748b'} strokeWidth={2}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  ),
  experience: (active) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#22d3ee' : '#64748b'} strokeWidth={2}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  projects: (active) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#22d3ee' : '#64748b'} strokeWidth={2}>
      <polyline points="8 6 3 12 8 18" />
      <polyline points="16 6 21 12 16 18" />
    </svg>
  ),
  skills: (active) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#22d3ee' : '#64748b'} strokeWidth={2}>
      <rect x="6" y="6" width="12" height="12" rx="1" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </svg>
  ),
  achievements: (active) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#22d3ee' : '#64748b'} strokeWidth={2}>
      <path d="M8 21h8M12 17v4" />
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M5 5H3v1a4 4 0 0 0 4 4M19 5h2v1a4 4 0 0 1-4 4" />
    </svg>
  ),
  contact: (active) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#22d3ee' : '#64748b'} strokeWidth={2}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  ),
}

export const MobileTabBar = memo(function MobileTabBar({ active }: { active: string }) {
  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex items-center justify-around px-2"
      style={{
        background: 'rgba(10,14,26,0.96)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        paddingTop: '3px',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1px)',
      }}
      aria-label="Mobile section navigation"
    >
      {NAV_SECTIONS.map((s) => {
        const isActive = active === s
        return (
          <button
            key={s}
            onClick={() => go(s)}
            className="flex-1 min-w-0 flex flex-col items-center justify-center gap-1.5 py-1 px-1 transition-all duration-150 active:scale-95 text-center cursor-pointer"
            aria-label={s}
            aria-current={isActive ? 'page' : undefined}
          >
            <span
              className="flex items-center justify-center"
              style={{
                transform: isActive ? 'translateY(-1px) scale(1.08)' : 'scale(1)',
                filter: isActive ? 'drop-shadow(0 0 6px rgba(6,182,212,0.6))' : 'none',
                transition: 'transform 0.2s ease, filter 0.2s ease',
              }}
            >
              {TAB_ICONS[s]?.(isActive)}
            </span>
            <span
              className="capitalize truncate w-full text-center block"
              style={{
                fontSize: 'clamp(9.5px, 2.6vw, 10.5px)',
                fontFamily: 'var(--font-mono)',
                lineHeight: 1.1,
                letterSpacing: '0.01em',
                color: isActive ? '#38bdf8' : '#64748b',
                fontWeight: isActive ? 600 : 400,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {s}
            </span>
            <span
              style={{
                width: isActive ? 16 : 0,
                height: 3,
                borderRadius: 3,
                background: '#06b6d4',
                boxShadow: isActive ? '0 0 8px rgba(6,182,212,0.8)' : 'none',
                transition: 'width 0.2s ease, box-shadow 0.2s ease',
                marginTop: 1,
              }}
            />
          </button>
        )
      })}
    </nav>
  )
})
