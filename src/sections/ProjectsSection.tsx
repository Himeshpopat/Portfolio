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
    const cardWidth = el.scrollWidth / PROJECTS.length
    const idx = Math.round(el.scrollLeft / cardWidth)
    setActiveIdx(Math.max(0, Math.min(PROJECTS.length - 1, idx)))
  }, [])

  const scrollToIdx = (idx: number) => {
    const el = scrollerRef.current
    if (!el) return
    const cardWidth = el.scrollWidth / PROJECTS.length
    el.scrollTo({ left: cardWidth * idx, behavior: 'smooth' })
  }

  return (
    <section
      ref={ref}
      id="projects"
      aria-labelledby="projects-heading"
      className="pt-16 pb-8 md:py-14"
      style={{
        background: 'rgba(255,255,255,0.012)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.75s ease, transform 0.75s ease',
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
                color: '#f1f5f9',
                letterSpacing: '-0.03em',
              }}
            >
              Featured Projects
            </h2>
            <p style={{ color: '#94a3b8', marginTop: 6, fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6 }}>
              Production-ready applications engineered with scalable architecture, performance optimization, and measurable impact.
            </p>
          </div>
        </div>

        {/* Mobile: horizontal swipe carousel */}
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-2 no-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {PROJECTS.map((p) => (
            <div key={p.id} className="flex-shrink-0 w-[87vw] snap-center">
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
              className="rounded-full transition-all duration-300"
              style={{
                width: activeIdx === i ? 20 : 6,
                height: 6,
                background: activeIdx === i ? '#06b6d4' : 'rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>
        <p
          className="md:hidden text-center mt-3"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#334155', letterSpacing: '0.12em' }}
        >
          ← SWIPE →
        </p>

        <div className="hidden md:block space-y-6 px-0">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
})
