import { useState, memo } from 'react'
import type { Achievement } from '../../types/portfolio'

export const AchievementCard = memo(function AchievementCard({ a }: { a: Achievement }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="rounded-xl md:rounded-2xl p-3 xs:p-3.5 md:p-6 flex flex-col justify-between h-full min-w-0 box-border overflow-hidden"
      style={{
        background: '#111827',
        border: hov ? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(255,255,255,0.07)',
        transform: hov ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hov ? '0 12px 32px rgba(0,0,0,0.35)' : 'none',
        transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
      }}
    >
      <div>
        {a.stat || a.unit ? (
          <div className="flex items-baseline gap-1.5 mb-1 md:mb-2 flex-wrap">
            {a.stat && (
              <span
                className="font-mono font-extrabold text-xl xs:text-2xl md:text-[clamp(1.8rem,3.2vw,2.4rem)] leading-none"
                style={{
                  color: a.isNumeric ? '#f59e0b' : '#06b6d4',
                }}
              >
                {a.stat}
              </span>
            )}
            {a.unit && (
              <span className="font-mono text-[10px] xs:text-[11px] md:text-xs text-slate-400 font-semibold uppercase tracking-wider">
                {a.unit}
              </span>
            )}
          </div>
        ) : null}
        <p className="font-display font-bold text-xs xs:text-sm md:text-base text-slate-100 leading-snug mb-1 md:mb-1.5">
          {a.label}
        </p>
      </div>
      <p className="text-slate-400 text-[11px] xs:text-[12px] md:text-xs font-sans leading-relaxed mt-auto">
        {a.sub}
      </p>
    </div>
  )
})
