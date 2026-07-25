import { useActiveSection } from './hooks/useActiveSection'
import { ALL_SECTION_IDS } from './data/navigationData'

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
      <CustomCursor />
      <FloatingBubbles />
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Nav active={active} />
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
        <MusicPlayer />
        <MobileTabBar active={active} />
      </div>
    </div>
  )
}
