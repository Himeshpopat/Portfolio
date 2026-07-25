import { memo } from 'react'
import { FadeSection } from '../components/ui/FadeSection'
import { SectionLabel } from '../components/ui/SectionLabel'
import { LEARNING_ITEMS } from '../data/learningData'

export const CurrentlyLearningSection = memo(function CurrentlyLearningSection() {
  return (
    <FadeSection id="learning">
      <SectionLabel>Currently Expanding</SectionLabel>
      <div className="mb-6">
        <h2
          id="learning-heading"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            color: '#f1f5f9',
            letterSpacing: '-0.03em',
          }}
        >
          Active Learning Focus
        </h2>
        <p style={{ color: '#94a3b8', fontSize: 14, marginTop: 4, fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
          Technologies &amp; concepts I am actively mastering to deepen backend and architectural depth.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {LEARNING_ITEMS.map((item) => (
          <div
            key={item.name}
            data-card
            className="rounded-xl p-3 xs:p-3.5 sm:p-4 transition-all duration-200 hover:border-cyan-500/30"
            style={{
              background: '#111827',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div className="flex items-center justify-between gap-1.5 mb-2">
              <span className="font-display font-bold text-xs xs:text-sm text-slate-100 flex-1 min-w-0">
                {item.name}
              </span>
              <span
                className="text-[9.5px] xs:text-[10px] font-mono uppercase px-1.5 xs:px-2 py-0.5 rounded whitespace-nowrap flex-shrink-0"
                style={{
                  background: `${item.color}14`,
                  color: item.color,
                  border: `1px solid ${item.color}25`,
                }}
              >
                {item.tag}
              </span>
            </div>
            <p style={{ color: '#64748b', fontSize: 12, lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </FadeSection>
  )
})
