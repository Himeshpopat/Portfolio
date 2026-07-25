import { memo } from 'react'
import { FadeSection } from '../components/ui/FadeSection'
import { SectionLabel } from '../components/ui/SectionLabel'
import { ACHIEVEMENTS } from '../data/achievementsData'
import { AchievementCard } from '../components/cards/AchievementCard'

export const AchievementsSection = memo(function AchievementsSection() {
  return (
    <FadeSection id="achievements">
      <SectionLabel>Achievements</SectionLabel>
      <h2
        id="achievements-heading"
        className="mb-2 md:mb-3"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          color: '#f1f5f9',
          letterSpacing: '-0.03em',
        }}
      >
        Achievements
      </h2>
      <p className="text-slate-400 text-xs sm:text-sm mb-5 md:mb-8 max-w-xl" style={{ fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
        Quantifiable academic performance, competitive problem solving, and technical recognitions.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4">
        {ACHIEVEMENTS.map((a, i) => (
          <AchievementCard key={i} a={a} />
        ))}
      </div>
    </FadeSection>
  )
})
