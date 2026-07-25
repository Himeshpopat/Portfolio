import React, { useState, useEffect, useRef, useMemo, memo } from 'react'
import type { Screenshot } from '../../types/portfolio'

export const ProjectScreenshotCarousel = memo(function ProjectScreenshotCarousel({
  screenshots,
  title,
  color,
}: {
  screenshots: Screenshot[]
  title: string
  color: string
}) {
  const validScreenshots = useMemo(
    () => (Array.isArray(screenshots) ? screenshots.filter((s) => Boolean(s && s.url)) : []),
    [screenshots],
  )
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const count = validScreenshots.length
  const safeIndex = count > 0 ? ((index % count) + count) % count : 0

  useEffect(() => {
    if (isPaused || count <= 1) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % count)
    }, 4500)
    return () => clearInterval(timer)
  }, [isPaused, count])

  const goNext = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setIsPaused(true)
    if (count <= 1) return
    setIndex((prev) => (prev + 1) % count)
  }

  const goPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setIsPaused(true)
    if (count <= 1) return
    setIndex((prev) => (prev - 1 + count) % count)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const diff = touchStartX.current - touchEndX.current
    if (diff > 40) goNext()
    if (diff < -40) goPrev()
    touchStartX.current = 0
    touchEndX.current = 0
  }

  if (count === 0) return null

  const currentScreenshot = validScreenshots[safeIndex]

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden mb-6 border border-white/10 group select-none"
      style={{
        background: '#0b0f19',
        boxShadow: `0 12px 36px ${color}12, 0 4px 20px rgba(0,0,0,0.5)`,
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Browser Window Header */}
      <div className="px-3 py-2 bg-black/65 border-b border-white/5 flex items-center justify-between z-20 relative">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-rose-500/80 flex-shrink-0" />
          <span className="w-2 h-2 rounded-full bg-amber-500/80 flex-shrink-0" />
          <span className="w-2 h-2 rounded-full bg-emerald-500/80 flex-shrink-0" />
          <span className="ml-1.5 font-mono text-[10.5px] text-slate-400 truncate max-w-[170px] sm:max-w-none">
            {currentScreenshot?.caption || title}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          <span
            className="text-[9.5px] font-mono px-1.5 py-0.5 rounded"
            style={{
              background: `${color}15`,
              color: color,
              border: `1px solid ${color}30`,
            }}
          >
            {safeIndex + 1} / {count}
          </span>
        </div>
      </div>

      {/* Image Viewport Frame — Absolutely Layered Slides */}
      <div className="relative w-full h-[210px] xs:h-[245px] sm:h-[310px] md:h-[420px] bg-slate-950/90 overflow-hidden">
        {validScreenshots.map((s, idx) => {
          const isActive = idx === safeIndex
          return (
            <div
              key={s.url || idx}
              className="absolute inset-0 flex items-center justify-center p-1 xs:p-1.5 sm:p-3 transition-opacity duration-500 ease-in-out"
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 10 : 0,
                pointerEvents: isActive ? 'auto' : 'none',
              }}
            >
              <img
                src={s.url}
                alt={`${title} - ${s.caption}`}
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="max-w-full max-h-full w-auto h-auto object-contain object-center rounded shadow-lg"
              />
            </div>
          )
        })}

        {/* Navigation Arrows */}
        {count > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label="Previous screenshot"
              className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white flex items-center justify-center text-xs md:text-lg leading-none transition-all opacity-95 md:opacity-70 group-hover:opacity-100 hover:scale-105 hover:bg-black/90 active:scale-95 z-30 cursor-pointer"
            >
              ‹
            </button>
            <button
              onClick={goNext}
              aria-label="Next screenshot"
              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white flex items-center justify-center text-xs md:text-lg leading-none transition-all opacity-95 md:opacity-70 group-hover:opacity-100 hover:scale-105 hover:bg-black/90 active:scale-95 z-30 cursor-pointer"
            >
              ›
            </button>
          </>
        )}

        {/* Pagination Dots */}
        {count > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 z-30">
            {validScreenshots.map((_, posIdx) => (
              <button
                key={posIdx}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsPaused(true)
                  setIndex(posIdx)
                }}
                aria-label={`Go to screenshot ${posIdx + 1}`}
                className="transition-all duration-300 rounded-full cursor-pointer p-2.5 -m-2.5 md:p-0 md:m-0 flex items-center justify-center"
              >
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: posIdx === safeIndex ? 14 : 5,
                    height: 5,
                    background: posIdx === safeIndex ? color : 'rgba(255,255,255,0.3)',
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
})
