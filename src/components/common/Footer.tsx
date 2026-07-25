import { memo } from 'react'
import { SITE_CONFIG } from '../../constants/siteConfig'

export const Footer = memo(function Footer() {
  return (
    <footer
      className="px-6 py-8 pb-24 md:pb-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-3 md:gap-4 max-w-6xl mx-auto"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#475569', letterSpacing: '0.08em' }}>
        © {SITE_CONFIG.name}
      </p>
      <p className="text-center md:text-right w-full md:w-auto" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#475569', letterSpacing: '0.06em' }}>
        React · Tailwind CSS · Outfit · JetBrains Mono
      </p>
    </footer>
  )
})
