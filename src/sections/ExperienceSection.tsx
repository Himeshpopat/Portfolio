import { memo } from 'react'
import { FadeSection } from '../components/ui/FadeSection'
import { SectionLabel } from '../components/ui/SectionLabel'
import { EXPERIENCES, ExperienceItem } from '../data/experienceData'

const ExperienceCard = memo(function ExperienceCard({ experience }: { experience: ExperienceItem }) {
  const isViolet = experience.accentColor === '#8b5cf6'

  const primaryBadgeStyle = isViolet
    ? {
        background: 'rgba(139,92,246,0.12)',
        color: '#a78bfa',
        border: '1px solid rgba(139,92,246,0.25)',
        fontFamily: 'var(--font-mono)',
      }
    : {
        background: 'rgba(6,182,212,0.1)',
        color: '#06b6d4',
        border: '1px solid rgba(6,182,212,0.2)',
        fontFamily: 'var(--font-mono)',
      }

  const roleAccentColor = isViolet ? '#a78bfa' : '#06b6d4'
  const checkmarkColor = isViolet ? '#a78bfa' : '#06b6d4'

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.07)', background: '#111827' }}
    >
      {/* Header */}
      <div
        className="px-5 md:px-10 pt-7 md:pt-8 pb-6"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between text-center md:text-left gap-3 md:gap-4">
          <div className="flex flex-col items-center md:items-start w-full md:w-auto">
            <div className="flex flex-row flex-wrap items-center justify-center md:justify-start gap-2 mb-3.5 w-full md:w-auto">
              {experience.badges.map((b) => (
                <span
                  key={b.label}
                  className="inline-block px-2.5 py-0.5 md:px-3 md:py-1 rounded-md text-[9.5px] xs:text-[10.5px] md:text-xs font-mono tracking-widest uppercase whitespace-nowrap flex-shrink-0"
                  style={
                    b.variant === 'primary'
                      ? primaryBadgeStyle
                      : {
                          background: 'rgba(255,255,255,0.03)',
                          color: '#94a3b8',
                          border: '1px solid rgba(255,255,255,0.08)',
                          fontFamily: 'var(--font-mono)',
                        }
                  }
                >
                  {b.label}
                </span>
              ))}
            </div>
            <h3
              id={`experience-heading-${experience.id}`}
              className="mb-1.5 md:mb-1"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(1.35rem, 3vw, 2rem)',
                color: '#f1f5f9',
                letterSpacing: '-0.02em',
              }}
            >
              {experience.role}
            </h3>
            <p className="mb-2 md:mb-0" style={{ color: roleAccentColor, fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 13.5 }}>
              {experience.organization} · {experience.location}
            </p>
          </div>
          <p
            className="text-center md:text-right w-full md:w-auto mt-1 md:mt-0"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12.5,
              color: '#64748b',
              whiteSpace: 'nowrap',
            }}
          >
            {experience.duration}
          </p>
        </div>
      </div>

      {/* Key metrics */}
      {experience.metrics && experience.metrics.length > 0 && (
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.06)' }}
        >
          {experience.metrics.map((m) => (
            <div
              key={m.label}
              className="px-4 md:px-5 py-5 text-center"
              style={{ background: '#111827' }}
            >
              <div
                className="flex items-baseline justify-center gap-1.5 flex-wrap"
                style={{ marginBottom: 6 }}
              >
                {m.prefix && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      fontSize: 12,
                      color: 'rgba(245,158,11,0.7)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {m.prefix}
                  </span>
                )}
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
                    color: '#f59e0b',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {m.value}
                </span>
              </div>
              <div style={{ color: '#64748b', fontSize: 12, fontFamily: 'var(--font-mono)' }}>{m.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Detail bullets */}
      <div className="px-6 md:px-10 py-7 space-y-3">
        {experience.bullets.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <span
              className="font-bold text-xs mt-0.5 flex-shrink-0"
              style={{ color: checkmarkColor }}
            >
              ✓
            </span>
            <p style={{ color: '#94a3b8', fontSize: 13.5, lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>
              {item}
            </p>
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <div
        className="px-6 md:px-10 pb-7 flex flex-wrap gap-2"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <div className="w-full pt-5 pb-1">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#475569', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Tech Stack
          </p>
        </div>
        {experience.stack.map((t) => (
          <span
            key={t}
            className="px-3 py-1 rounded-full text-xs font-mono"
            style={{
              background: 'rgba(139,92,246,0.08)',
              color: '#8b5cf6',
              border: '1px solid rgba(139,92,246,0.18)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
})

export const ExperienceSection = memo(function ExperienceSection() {
  return (
    <FadeSection id="experience">
      <SectionLabel>Experience</SectionLabel>
      <div className="space-y-6 md:space-y-8">
        {EXPERIENCES.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>
    </FadeSection>
  )
})
