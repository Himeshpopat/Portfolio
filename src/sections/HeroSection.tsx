import { memo } from 'react'
import avatarImg from '../assets/avatar.webp'
import { EmailIcon, ExternalLinkIcon } from '../components/ui/Icons'
import { SITE_CONFIG } from '../constants/siteConfig'

function HeroAvatar() {
  const particles = [
    { top: '2%', left: '10%', size: 4, color: '#06b6d4', delay: '0s', dur: '6s' },
    { top: '85%', left: '4%', size: 3, color: '#8b5cf6', delay: '1.2s', dur: '7.5s' },
    { top: '10%', left: '92%', size: 3, color: '#f59e0b', delay: '0.6s', dur: '5.5s' },
    { top: '92%', left: '86%', size: 5, color: '#06b6d4', delay: '2s', dur: '8s' },
    { top: '48%', left: '-2%', size: 3, color: '#8b5cf6', delay: '1.6s', dur: '6.5s' },
    { top: '45%', left: '100%', size: 4, color: '#f59e0b', delay: '0.3s', dur: '7s' },
  ]

  return (
    <div className="relative flex items-center justify-center flex-shrink-0 avatar-float w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[425px] md:h-[425px] lg:w-[445px] lg:h-[445px]">
      {/* Ambient pulsing glow behind everything */}
      <div
        className="absolute rounded-full avatar-glow-pulse w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] md:w-[495px] md:h-[495px] lg:w-[515px] lg:h-[515px]"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, rgba(139,92,246,0.09) 45%, transparent 72%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Drifting ambient particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full avatar-particle"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 8px ${p.color}`,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        />
      ))}

      {/* Outer slow ring */}
      <div
        className="absolute rounded-full animate-spin-slow"
        style={{ inset: 6, background: 'conic-gradient(from 0deg, #06b6d4, #8b5cf6, #0c1020 60%, #06b6d4)', padding: 2 }}
      >
        <div className="w-full h-full rounded-full" style={{ background: '#0c1020' }} />
      </div>

      {/* A second, thinner ring */}
      <div
        className="absolute rounded-full animate-spin-reverse"
        style={{
          inset: 0,
          border: '1px dashed rgba(6,182,212,0.25)',
        }}
      />

      {/* Inner circle with Avatar image */}
      <div
        className="relative z-10 rounded-full overflow-hidden flex items-center justify-center w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[375px] md:h-[375px] lg:w-[390px] lg:h-[390px]"
        style={{
          border: '2px solid rgba(6,182,212,0.4)',
          boxShadow: '0 0 32px rgba(6,182,212,0.28)',
        }}
      >
        <img
          src={avatarImg}
          alt="Himesh Popat — Software Engineer"
          loading="eager"
          fetchPriority="high"
          width={390}
          height={390}
          className="w-full h-full object-cover object-top"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Faster orbiting dot */}
      <div className="absolute inset-0 rounded-full animate-spin-fast">
        <div
          className="absolute top-0 left-1/2 rounded-full"
          style={{
            width: 10,
            height: 10,
            background: '#8b5cf6',
            boxShadow: '0 0 12px #8b5cf6',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Static accent dot at bottom-right */}
      <div
        className="absolute bottom-3 right-3 rounded-full"
        style={{ width: 16, height: 16, background: '#06b6d4', boxShadow: '0 0 16px #06b6d4', opacity: 0.8 }}
      />
    </div>
  )
}

export const HeroSection = memo(function HeroSection() {
  return (
    <section className="relative min-h-[88vh] md:min-h-screen flex items-center justify-center overflow-hidden" id="hero">
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Animated aurora */}
      <div className="absolute pointer-events-none aurora-blob aurora-cyan" />
      <div className="absolute pointer-events-none aurora-blob aurora-violet" />
      <div className="absolute pointer-events-none aurora-blob aurora-amber" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 pt-20 pb-10 md:pt-28 md:pb-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-8">
          {/* Text content */}
          <div className="flex-1 min-w-0 text-center md:text-left">
            <div className="hero-stage-1 inline-flex items-center gap-2 mb-4 max-w-full">
              <span
                className="inline-flex items-center gap-2 text-[10.5px] xs:text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded-full whitespace-nowrap max-w-full truncate"
                style={{
                  background: 'rgba(6,182,212,0.08)',
                  color: '#06b6d4',
                  border: '1px solid rgba(6,182,212,0.18)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: '#06b6d4', animation: 'pulse 1.8s ease-in-out infinite' }}
                />
                <span className="truncate">Software Engineer · Mumbai, India</span>
              </span>
            </div>

            <h1
              className="hero-stage-2 font-bold leading-tight md:leading-none mb-3 max-md:whitespace-nowrap text-[clamp(2.2rem,8.5vw,3.2rem)] md:text-[clamp(2.4rem,8vw,5.5rem)]"
              style={{
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.035em',
                color: '#f1f5f9',
              }}
            >
              Himesh <br className="hidden md:block" />
              <span style={{ color: '#06b6d4' }}>Popat</span>
            </h1>

            <h2
              className="hero-stage-2 font-semibold mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.65rem)',
                color: '#cbd5e1',
                lineHeight: 1.35,
                letterSpacing: '-0.015em',
              }}
            >
              Building production-ready software &amp; intelligent systems.
            </h2>

            <p
              className="hero-stage-3 text-base max-w-xl mx-auto md:mx-0 mb-6"
              style={{
                color: '#94a3b8',
                fontFamily: 'var(--font-body)',
                lineHeight: 1.7,
              }}
            >
              Specializing in full-stack web applications, scalable backend architecture, and production-ready AI/ML pipelines engineered for real-world impact.
            </p>

            {/* Achievement Badges */}
            <div className="hero-stage-3 flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 mb-7 w-auto mx-auto md:mx-0">
              {[
                { val: '9.83 CGPA', detail: 'KJSIT' },
                { val: 'AI/ML Intern', detail: 'IMD Mumbai' },
                { val: '150+ Solved', detail: 'LeetCode' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="w-[215px] md:w-auto h-9 min-h-[36px] inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#f59e0b' }}>
                    {item.val}
                  </span>
                  <span style={{ color: '#64748b', fontSize: 11.5 }}>· {item.detail}</span>
                </div>
              ))}
            </div>

            <div className="hero-stage-4 flex flex-row items-center gap-3 justify-center md:justify-start w-full md:w-auto">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex-1 md:flex-initial min-h-[48px] inline-flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-full font-semibold text-xs xs:text-sm whitespace-nowrap transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                style={{ background: '#06b6d4', color: '#0c1020', fontFamily: 'var(--font-body)' }}
              >
                <EmailIcon size={16} />
                Get in touch
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="flex-1 md:flex-initial min-h-[48px] inline-flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-full font-semibold text-xs xs:text-sm whitespace-nowrap transition-all duration-200 hover:bg-white/5"
                style={{
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: '#e2e8f0',
                  fontFamily: 'var(--font-body)',
                }}
              >
                View work
                <ExternalLinkIcon size={14} />
              </a>
            </div>
          </div>

          {/* Avatar */}
          <div className="hero-stage-2 flex-shrink-0">
            <HeroAvatar />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="hero-stage-6 absolute bottom-20 md:bottom-8 left-1/2 flex flex-col items-center gap-2"
        style={{ transform: 'translateX(-50%)', animation: 'drift 3s ease-in-out infinite' }}
      >
        <span
          style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#334155', letterSpacing: '0.2em' }}
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
