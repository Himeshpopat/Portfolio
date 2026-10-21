import { useState } from 'react'
import { useActiveSection } from './hooks/useActiveSection'
import { ALL_SECTION_IDS } from './data/navigationData'

import { OpeningSequence } from './components/OpeningSequence'
import { CustomCursor } from './components/common/CustomCursor'
import { FloatingBubbles } from './components/common/FloatingBubbles'
import { Nav } from './components/common/Nav'
import { MobileTabBar } from './components/common/MobileTabBar'
import { MusicPlayer } from './components/common/MusicPlayer'
import { Footer } from './components/common/Footer'

import { HeroSection } from './sections/HeroSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { ExperienceSection } from './sections/ExperienceSection'
import { AchievementsSection } from './sections/AchievementsSection'
import { SkillsSection } from './sections/SkillsSection'
import { CurrentlyLearningSection } from './sections/CurrentlyLearningSection'
import { AboutSection } from './sections/AboutSection'
import { GithubShowcaseSection } from './sections/GithubShowcaseSection'
import { ContactSection } from './sections/ContactSection'

export default function App() {
  const active = useActiveSection(ALL_SECTION_IDS)
  const [isRevealing, setIsRevealing] = useState(false)
  const [introFinished, setIntroFinished] = useState(false)

  return (
    <div
      style={{
        background: '#0c1020',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 2,
        overflowX: 'hidden',
        maxWidth: '100vw',
      }}
    >
      {!introFinished && (
        <OpeningSequence
          name="HIMESH POPAT" // <-- Change to your actual name
          role="SOFTWARE ENGINEER · AI & FULL-STACK SYSTEMS" // <-- Change to your subtitle
          onRevealStart={() => setIsRevealing(true)}
          onComplete={() => setIntroFinished(true)}
        />
      )}

      <CustomCursor />
      <FloatingBubbles />

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Nav active={active} />

        <div
          style={{
            transform: isRevealing || introFinished ? 'scale(1)' : 'scale(1.035)',
            opacity: isRevealing || introFinished ? 1 : 0.92,
            transition:
              'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out',
            willChange: introFinished ? 'auto' : 'transform, opacity',
          }}
        >
          <main>
            <HeroSection />
            <ProjectsSection />
            <ExperienceSection />
            <AchievementsSection />
            <SkillsSection />
            <CurrentlyLearningSection />
            <AboutSection />
            <GithubShowcaseSection />
            <ContactSection />
          </main>
          <Footer />
        </div>

        <MusicPlayer />
        <MobileTabBar active={active} />
      </div>
    </div>
  )
}