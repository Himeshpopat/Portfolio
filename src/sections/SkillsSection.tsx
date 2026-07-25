import { memo } from 'react'
import { FadeSection } from '../components/ui/FadeSection'
import { SectionLabel } from '../components/ui/SectionLabel'
import { SKILLS_GROUPS } from '../data/skillsData'

export const SkillsSection = memo(function SkillsSection() {
  return (
    <FadeSection id="skills">
      <SectionLabel>Skills</SectionLabel>
      <h2
        id="skills-heading"
        className="mb-3"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          color: '#f1f5f9',
          letterSpacing: '-0.03em',
        }}
      >
        Technical Skills
      </h2>
      <p className="text-slate-400 text-sm mb-8 max-w-xl" style={{ fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
        Capability-based toolkit ordered by core proficiency, engineering focus, and production experience.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 items-stretch">
        {SKILLS_GROUPS.map((group) => (
          <div
            key={group.label}
            className="rounded-xl sm:rounded-2xl p-4 md:p-5 flex flex-col justify-start h-full"
            style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="mb-3.5 flex items-center">
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#06b6d4',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}
              >
                {group.label}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-start gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-md text-xs font-mono whitespace-nowrap transition-all duration-200 hover:scale-[1.03] hover:border-cyan-400/40 hover:bg-cyan-500/15 cursor-default select-none inline-flex items-center"
                  style={{
                    background: 'rgba(6,182,212,0.06)',
                    color: '#e2e8f0',
                    border: '1px solid rgba(6,182,212,0.16)',
                    fontFamily: 'var(--font-mono)',
                    height: 28,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full mr-1.5 flex-shrink-0" style={{ background: '#06b6d4' }} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </FadeSection>
  )
})
