import { memo } from 'react'
import { FadeSection } from '../components/ui/FadeSection'
import { SectionLabel } from '../components/ui/SectionLabel'

export const AboutSection = memo(function AboutSection() {
  return (
    <FadeSection id="about">
      <SectionLabel>About</SectionLabel>
      <div className="grid md:grid-cols-[3fr_2fr] gap-10 md:gap-14 items-start">
        <div className="space-y-5">
          <h2
            id="about-heading"
            className="font-bold leading-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              letterSpacing: '-0.025em',
              color: '#f1f5f9',
            }}
          >
            Engineering software with rigor, clarity, and real-world impact.
          </h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.75, fontFamily: 'var(--font-body)', fontSize: 15 }}>
            I'm Himesh, an Information Technology student at KJ Somaiya Institute of Technology, Mumbai (CGPA 9.83). I approach software engineering as the discipline of transforming complex operational problems into clean, reliable, and high-performance software solutions.
          </p>
          <p style={{ color: '#94a3b8', lineHeight: 1.75, fontFamily: 'var(--font-body)', fontSize: 15 }}>
            My interests span data structures &amp; algorithms, problem solving, full-stack web development, scalable backend systems, RESTful API architecture, and production-ready machine learning pipelines. From digitizing B2B wholesale workflows to benchmarking ML regression models on 297K+ meteorological records, I focus on building maintainable systems backed by rigorous evaluation and measurable impact.
          </p>
        </div>

        {/* Education card */}
        <div
          data-card
          className="rounded-2xl p-6"
          style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: '#06b6d4',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Education
          </p>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 16,
              color: '#f1f5f9',
              lineHeight: 1.4,
              marginBottom: 4,
            }}
          >
            KJ Somaiya Institute of Technology
          </h3>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 2, fontFamily: 'var(--font-body)' }}>
            B.Tech — Information Technology
          </p>
          <p style={{ color: '#475569', fontSize: 13, fontFamily: 'var(--font-body)', marginBottom: 20 }}>
            Sep 2024 – Jun 2028 · Mumbai, India
          </p>
          <div
            className="pt-5"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-baseline gap-2 mb-1">
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 36,
                  fontWeight: 700,
                  color: '#f59e0b',
                  lineHeight: 1,
                }}
              >
                9.83
              </span>
              <span style={{ color: '#64748b', fontSize: 13 }}>CGPA</span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#475569', letterSpacing: '0.1em' }}>
              Semesters II &amp; IV · SGPA 10.0
            </p>
          </div>
        </div>
      </div>
    </FadeSection>
  )
})
