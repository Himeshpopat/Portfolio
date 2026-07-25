import { memo } from 'react'
import { useScrollY } from '../../hooks/useScrollY'
import { NAV_SECTIONS } from '../../data/navigationData'
import { SITE_CONFIG } from '../../constants/siteConfig'

export const Nav = memo(function Nav({ active }: { active: string }) {
  const scrollY = useScrollY()
  const scrolled = scrollY > 64

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header>
      {/* Desktop floating pill nav — untouched */}
      <nav
        aria-label="Main Navigation"
        className="fixed top-5 left-1/2 z-50 hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full"
        style={{
          transform: 'translateX(-50%)',
          background: scrolled ? 'rgba(12,16,32,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          border: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
          transition: 'background 0.5s, border-color 0.5s, box-shadow 0.5s, backdrop-filter 0.5s',
        }}
      >
        {NAV_SECTIONS.map((s) => (
          <button
            key={s}
            onClick={() => go(s)}
            aria-current={active === s ? 'page' : undefined}
            className="px-3.5 py-1.5 rounded-full text-sm capitalize transition-all duration-200 cursor-pointer"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              color: active === s ? '#06b6d4' : '#94a3b8',
              background: active === s ? 'rgba(6,182,212,0.1)' : 'transparent',
            }}
          >
            {s}
          </button>
        ))}
        <a
          href={`mailto:${SITE_CONFIG.email}`}
          className="ml-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-85"
          style={{ background: '#06b6d4', color: '#0c1020', fontFamily: 'var(--font-body)' }}
        >
          Let's Connect
        </a>
      </nav>

      {/* Mobile top bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 md:hidden flex items-center justify-between px-5"
        style={{
          height: 56,
          background: scrolled ? 'rgba(10,14,26,0.92)' : 'rgba(10,14,26,0.55)',
          backdropFilter: 'blur(16px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
          transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 21,
            color: '#f1f5f9',
            letterSpacing: '-0.02em',
          }}
        >
          <span style={{ color: '#06b6d4' }}>H</span>P
        </span>
        <a
          href={`mailto:${SITE_CONFIG.email}`}
          className="px-3 py-1 inline-flex items-center justify-center rounded-[12px] text-[11px] font-semibold active:scale-95 transition-transform duration-150 cursor-pointer"
          style={{ background: '#06b6d4', color: '#0c1020', fontFamily: 'var(--font-body)', minHeight: 27, height: 27 }}
        >
          Let's Connect
        </a>
      </div>
    </header>
  )
})
