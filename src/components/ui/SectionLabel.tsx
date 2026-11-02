import { memo, type ReactNode } from 'react'

export const SectionLabel = memo(function SectionLabel({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <div className="section-label flex items-center gap-3 mb-5 md:mb-12">
      <span id={id}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: '#06b6d4',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        {children}
      </span>
      <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
    </div>
  )
})
