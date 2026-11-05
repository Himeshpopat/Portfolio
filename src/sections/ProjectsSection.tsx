import { useState, useRef, useCallback, memo } from 'react'
import { PROJECTS } from '../data/projectsData'
import { ProjectCard } from '../components/cards/ProjectCard'
import { SectionLabel } from '../components/ui/SectionLabel'
import { useInView } from '../hooks/useInView'

export const ProjectsSection = memo(function ProjectsSection() {
  const { ref, visible } = useInView()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const handleScroll = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const cards = Array.from(el.children) as HTMLElement[]
    const idx = cards.reduce((best, card, i) => Math.abs(card.offsetLeft - cards[0].offsetLeft - el.scrollLeft) < Math.abs(cards[best].offsetLeft - cards[0].offsetLeft - el.scrollLeft) ? i : best, 0)
    setActiveIdx(Math.max(0, Math.min(PROJECTS.length - 1, idx)))
  }, [])

  const scrollToIdx = (idx: number) => {
    const el = scrollerRef.current
    if (!el) return
    const first = el.children[0] as HTMLElement
    const card = el.children[idx] as HTMLElement
    el.scrollTo({ left: card.offsetLeft - first.offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }

  return (
    <section
      ref={ref}
      id="projects"
      aria-labelledby="projects-heading"
      className="pt-16 pb-8 md:py-14"
      data-visible={visible}
      style={{
        background: 'rgba(255,255,255,0.012)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform',
      }}
    >
      <div className="max-w-6xl mx-auto md:px-6">
        <div className="px-6 md:px-0">
          <SectionLabel>Projects</SectionLabel>
          <div className="mb-6 md:mb-10">
            <h2
              id="projects-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                color: 'var(--text)',
                letterSpacing: '-0.03em',
              }}
            >
              Featured Projects
            </h2>
            <p style={{ color: 'var(--text-muted)', marginTop: 6, fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6 }}>
              Production-ready applications engineered with scalable architecture, performance optimization, and measurable impact.
            </p>
          </div>
        </div>

        {/* Mobile: horizontal swipe carousel */}
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="project-track relative flex md:block overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-4 px-6 md:px-0 pb-2 no-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {PROJECTS.map((p) => (
            <div key={p.id} className="project-slide flex-shrink-0 w-[87vw] md:w-full snap-center">
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
        <div className="flex md:hidden items-center justify-center gap-2 mt-5">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => scrollToIdx(i)}
              aria-label={`Go to ${p.name}`}
              aria-current={activeIdx === i ? 'true' : undefined}
              className="project-dot rounded-full transition-all duration-300"
              style={{
                width: activeIdx === i ? 20 : 6,
                height: 6,
                background: activeIdx === i ? 'var(--accent)' : 'rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>
        <p
          className="md:hidden text-center mt-3"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--text-muted)', letterSpacing: '0.12em' }}
        >
          ← SWIPE →
        </p>
      </div>
    </section>
  )
})
