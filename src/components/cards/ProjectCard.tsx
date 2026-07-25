import { useState, memo } from 'react'
import type { Project } from '../../types/portfolio'
import { useTilt } from '../../hooks/useTilt'
import { ProjectScreenshotCarousel } from './ProjectScreenshotCarousel'
import { GithubIcon, ExternalLinkIcon } from '../ui/Icons'

export const ProjectCard = memo(function ProjectCard({ project }: { project: Project }) {
  const { ref, onMove, onLeave } = useTilt()
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      ref={ref}
      data-card
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="rounded-2xl overflow-hidden h-full flex flex-col justify-between"
      style={{
        background: '#111827',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'transform 0.15s ease',
        willChange: 'transform',
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          height: 3,
          background: `linear-gradient(to right, ${project.color}, transparent 70%)`,
        }}
      />

      <div className="p-3.5 xs:p-4 sm:p-6 md:p-8 flex flex-col flex-1 justify-between">
        <div>
          {/* 1. Project Title & Tagline */}
          <div className="mb-6 md:mb-3 text-center md:text-left">
            <h3
              className="mb-3 md:mb-1"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)',
                color: '#f1f5f9',
                letterSpacing: '-0.015em',
                lineHeight: 1.3,
                wordBreak: 'break-word',
              }}
            >
              {project.name}
            </h3>
            <p
              style={{
                color: project.color,
                fontSize: 12.5,
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
              }}
            >
              {project.tagline}
            </p>
          </div>

          {/* 2. Screenshot Carousel */}
          <div className="mb-6 md:mb-0">
            <ProjectScreenshotCarousel
              screenshots={project.screenshots}
              title={project.name}
              color={project.color}
            />
          </div>

          {/* 3. Compact Metrics Row — Mobile Only */}
          <div className="grid grid-cols-2 gap-2 mb-6 md:hidden">
            {project.pullMetrics.map((m) => (
              <div
                key={m.label}
                className="rounded-lg p-2 text-center"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: project.color,
                    lineHeight: 1.15,
                  }}
                >
                  {m.value}
                </div>
                <div className="truncate" style={{ color: '#64748b', fontSize: 10, fontFamily: 'var(--font-mono)' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* 4. Tech Stack Badges — Mobile Only */}
          <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 mb-6 md:hidden">
            {project.stack.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-full text-[10.5px] font-mono"
                style={{
                  background: `${project.color}12`,
                  color: project.color,
                  border: `1px solid ${project.color}25`,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* 5. Expandable Details */}
        <div className={`${expanded ? 'block' : 'hidden'} md:!block`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div
              className="rounded-xl p-3"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: '#64748b',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 3,
                }}
              >
                Problem
              </p>
              <p style={{ color: '#cbd5e1', fontSize: 12.5, lineHeight: 1.55, fontFamily: 'var(--font-body)' }}>
                {project.problem}
              </p>
            </div>
            <div
              className="rounded-xl p-3"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: '#64748b',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 3,
                }}
              >
                Solution
              </p>
              <p style={{ color: '#cbd5e1', fontSize: 12.5, lineHeight: 1.55, fontFamily: 'var(--font-body)' }}>
                {project.solution}
              </p>
            </div>
          </div>

          <div className="mb-4 space-y-2">
            {project.outcomes.map((o, i) => (
              <div key={i} className="flex items-start gap-2">
                <span
                  className="flex-shrink-0 font-bold text-xs mt-0.5"
                  style={{ color: project.color }}
                >
                  ✓
                </span>
                <p style={{ color: '#94a3b8', fontSize: 12.5, lineHeight: 1.55, fontFamily: 'var(--font-body)' }}>
                  {o}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Expand Toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="md:hidden w-full min-h-[38px] flex items-center justify-center gap-1.5 mb-6 rounded-lg text-[11px] font-mono active:scale-[0.98] transition-all cursor-pointer"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            color: project.color,
          }}
        >
          {expanded ? 'Hide details' : 'View problem, solution & highlights'}
          <span style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
            ↓
          </span>
        </button>

        {/* Desktop-only Metrics & Stack footer */}
        <div className="hidden md:flex flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
          <div className="flex gap-6 flex-shrink-0">
            {project.pullMetrics.map((m) => (
              <div key={m.label}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    color: project.color,
                    lineHeight: 1.1,
                  }}
                >
                  {m.value}
                </div>
                <div style={{ color: '#64748b', fontSize: 11, fontFamily: 'var(--font-mono)' }}>{m.label}</div>
              </div>
            ))}
          </div>

          <div className="flex-1 flex flex-col items-end text-right">
            <span
              className="text-[10px] font-mono font-semibold tracking-widest text-slate-400 uppercase mb-1.5"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              TECH STACK
            </span>
            <div className="flex flex-wrap items-center justify-end gap-x-2 gap-y-1.5">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full text-xs font-mono whitespace-nowrap"
                  style={{
                    background: `${project.color}12`,
                    color: project.color,
                    border: `1px solid ${project.color}25`,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 6. Action Buttons */}
        <div className="flex flex-row items-center gap-2.5 pt-3 mt-1 w-full border-t border-white/5 md:border-t-0 md:pt-0 md:mt-6.5">
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 rounded-lg text-xs font-semibold font-mono whitespace-nowrap transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{
                background: project.color,
                color: '#0c1020',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <ExternalLinkIcon size={14} />
              Live Demo
            </a>
          ) : null}

          {project.source ? (
            <a
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 rounded-lg text-xs font-semibold font-mono whitespace-nowrap transition-all duration-200 hover:opacity-90"
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: '#f1f5f9',
                border: '1px solid rgba(255,255,255,0.1)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <GithubIcon size={14} />
              Source Code
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )
})
