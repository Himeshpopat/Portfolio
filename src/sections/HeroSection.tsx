import { memo } from 'react'
import avatarImg from '../assets/avatar.webp'
import { EmailIcon, ExternalLinkIcon } from '../components/ui/Icons'
import { SITE_CONFIG } from '../constants/siteConfig'
import { AmbientHero } from '../components/ambient/AmbientHero'

function HeroAvatar() {
  return (
    <div className="hero-portrait">
      <div className="portrait-registration" aria-hidden="true" />
      <div className="portrait-frame">
        <img src={avatarImg} alt="Himesh Popat — Software Engineer" loading="eager" fetchPriority="high" width={390} height={390} />
      </div>
      <div className="portrait-rule" aria-hidden="true" />
    </div>
  )
}

export const HeroSection = memo(function HeroSection() {
  return (
    <section className="hero-section relative min-h-[88vh] md:min-h-screen flex items-center justify-center overflow-hidden" id="hero">
      <AmbientHero />
      <div className="hero-layout relative z-10 w-full max-w-6xl mx-auto px-5 pt-20 pb-10 md:pt-28 md:pb-20">
        <div className="hero-composition">
          {/* Text content */}
          <div className="hero-copy">
            <div className="hero-stage-1 inline-flex items-center gap-2 mb-4 max-w-full">
              <span
                className="inline-flex items-center gap-2 text-[10.5px] xs:text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded-full whitespace-nowrap max-w-full truncate"
                style={{
                  background: 'rgba(6,182,212,0.08)',
                  color: 'var(--accent)',
                  border: '1px solid rgba(6,182,212,0.18)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: 'var(--accent)', animation: 'pulse 1.8s ease-in-out infinite' }}
                />
                <span className="truncate">Software Engineer · Mumbai, India</span>
              </span>
            </div>

            <h1
              className="hero-stage-2 font-bold leading-tight md:leading-none mb-3 text-[clamp(2.2rem,8.5vw,3.2rem)] md:text-[clamp(2.4rem,8vw,5.5rem)]"
              style={{
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.035em',
                color: 'var(--text)',
              }}
            >
              Himesh <br className="hidden md:block" />
              <span style={{ color: 'var(--accent)' }}>Popat</span>
            </h1>

            <h2
              className="hero-stage-2 font-semibold mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.65rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.35,
                letterSpacing: '-0.015em',
              }}
            >
              Building production-ready software &amp; intelligent systems.
            </h2>

            <p
              className="hero-stage-3 text-base max-w-xl mx-auto md:mx-0 mb-6"
              style={{
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-body)',
                lineHeight: 1.7,
              }}
            >
              Specializing in full-stack web applications, scalable backend architecture, and production-ready AI/ML pipelines engineered for real-world impact.
            </p>

            {/* Achievement Badges */}
            <div className="hero-credentials hero-stage-3 flex flex-wrap items-center justify-center md:justify-start gap-2 mb-7 w-auto mx-auto md:mx-0">
              {[
                { val: '9.83 CGPA', detail: 'KJSIT' },
                { val: 'Full-Stack Intern', detail: 'IMD' },
                { val: 'ML Intern', detail: 'Tata Power' },
                { val: '250+ Solved', detail: 'LeetCode' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="w-auto h-9 min-h-[36px] inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--numeric)' }}>
                    {item.val}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: 11.5 }}>· {item.detail}</span>
                </div>
              ))}
            </div>

            <div className="hero-stage-4 flex flex-row items-center gap-3 justify-center md:justify-start w-full md:w-auto">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex-1 md:flex-initial min-h-[48px] inline-flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-full font-semibold text-xs xs:text-sm whitespace-nowrap transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                style={{ background: 'var(--accent)', color: 'var(--button-ink)', fontFamily: 'var(--font-body)' }}
              >
                <EmailIcon size={16} />
                Get in touch
              </a>
              <a
                href="#projects"
                className="flex-1 md:flex-initial min-h-[48px] inline-flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-full font-semibold text-xs xs:text-sm whitespace-nowrap transition-all duration-200 hover:bg-white/5"
                style={{
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                View work
                <ExternalLinkIcon size={14} />
              </a>
            </div>
          </div>

          {/* Avatar */}
          <div className="hero-image hero-stage-2 flex-shrink-0">
            <HeroAvatar />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="hero-scroll-cue hero-stage-6 absolute bottom-20 md:bottom-8 left-1/2 flex flex-col items-center gap-2"
        style={{ transform: 'translateX(-50%)', animation: 'drift 3s ease-in-out infinite' }}
      >
        <span
          style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em' }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: 1,
            height: 44,
            background: 'linear-gradient(to bottom, rgba(6,182,212,0.5), transparent)',
          }}
        />
      </div>
    </section>
  )
})
