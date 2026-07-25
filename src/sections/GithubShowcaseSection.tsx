import { memo } from 'react'
import { FadeSection } from '../components/ui/FadeSection'
import { SectionLabel } from '../components/ui/SectionLabel'
import { GITHUB_REPOS, GITHUB_QUICK_STATS } from '../data/githubData'
import { GithubIcon } from '../components/ui/Icons'
import { SITE_CONFIG } from '../constants/siteConfig'

export const GithubShowcaseSection = memo(function GithubShowcaseSection() {
  return (
    <FadeSection id="github">
      <SectionLabel>Open Source</SectionLabel>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2
            id="github-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: '#f1f5f9',
              letterSpacing: '-0.03em',
            }}
          >
            GitHub Activity &amp; Repositories
          </h2>
          <p style={{ color: '#94a3b8', marginTop: 4, fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6 }}>
            Explore open-source projects, algorithm implementations, and software repositories.
          </p>
        </div>
        <a
          href={SITE_CONFIG.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="self-center md:self-auto w-fit inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-200 hover:bg-cyan-500/10"
          style={{
            background: 'rgba(6,182,212,0.06)',
            color: '#06b6d4',
            border: '1px solid rgba(6,182,212,0.2)',
          }}
        >
          <GithubIcon size={14} />
          github.com/Himeshpopat
        </a>
      </div>

      {/* GitHub Quick Stats Grid */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-6 w-full max-w-full">
        {GITHUB_QUICK_STATS.map((stat, i) => (
          <div
            key={i}
            className="rounded-xl p-2.5 xs:p-3 sm:p-3.5 text-center min-w-0 overflow-hidden box-border"
            style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div
              className="text-xs xs:text-sm sm:text-base font-mono font-bold leading-snug break-words"
              style={{
                fontFamily: 'var(--font-mono)',
                color: '#f59e0b',
                marginBottom: 2,
              }}
            >
              {stat.val}
            </div>
            <div className="text-[9.5px] xs:text-[10px] sm:text-xs leading-snug break-words" style={{ color: '#64748b', fontFamily: 'var(--font-mono)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Repo Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-full">
        {GITHUB_REPOS.map((repo) => (
          <a
            key={repo.name}
            href={repo.link}
            target="_blank"
            rel="noopener noreferrer"
            data-card
            className="rounded-xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:border-white/20 hover:-translate-y-1 w-full max-w-full box-border overflow-hidden"
            style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="w-full max-w-full min-w-0">
              <div className="flex items-center justify-between gap-2 mb-2 w-full max-w-full min-w-0">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <GithubIcon size={16} />
                  <span
                    className="truncate font-semibold text-slate-200 text-sm"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {repo.name}
                  </span>
                </div>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded flex-shrink-0 whitespace-nowrap"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    color: '#94a3b8',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {repo.stars}
                </span>
              </div>
              <p className="break-words" style={{ color: '#64748b', fontSize: 12, lineHeight: 1.6, fontFamily: 'var(--font-body)', marginBottom: 14 }}>
                {repo.desc}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono flex-shrink-0">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: repo.langColor }} />
              <span className="truncate">{repo.lang}</span>
            </div>
          </a>
        ))}
      </div>
    </FadeSection>
  )
})
