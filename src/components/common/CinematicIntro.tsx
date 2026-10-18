import { useState, useEffect, useRef, useCallback, memo } from 'react'
import './CinematicIntro.css'

/**
 * CinematicIntro — Award-level opening animation overlay.
 *
 * Phases:
 *   A) Geometry lines + light sweep activate instantly on render
 *   B) "HIMESH POPAT" revealed via masked kinetic typography
 *   C) Convergence lines & corner accents form engineering identity
 *   D) Dissolve transition reveals the existing portfolio underneath
 *
 * Guards:
 *   – Runs only once (sessionStorage flag prevents replay on internal nav / HMR)
 *   – prefers-reduced-motion: immediate reveal, no animation
 *   – Cleans up overlay from DOM after transition
 *   – Never intercepts clicks/keyboard after completion
 */

const SESSION_KEY = 'ci-intro-played'
const TOTAL_DURATION_MS = 1800 // ~1.8s total before dissolve begins
const DISSOLVE_MS = 550

export const CinematicIntro = memo(function CinematicIntro() {
  // Check if we should show the intro at all
  const shouldShow = useRef<boolean>((() => {
    // Don't replay on subsequent navigations within the same session
    if (typeof sessionStorage !== 'undefined') {
      try {
        if (sessionStorage.getItem(SESSION_KEY)) return false
      } catch {
        // Storage unavailable — show intro
      }
    }
    return true
  })())

  const [phase, setPhase] = useState<'active' | 'dissolving' | 'done'>(
    shouldShow.current ? 'active' : 'done',
  )
  const overlayRef = useRef<HTMLDivElement>(null)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  // Check reduced motion preference
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )

  const cleanup = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  useEffect(() => {
    if (phase === 'done') return

    // Mark as played immediately to prevent duplicates
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      // Ignore storage errors
    }

    // Lock scrolling while intro is active
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // If user prefers reduced motion, skip to dissolve immediately
    if (prefersReducedMotion.current) {
      const t = setTimeout(() => {
        setPhase('dissolving')
        const t2 = setTimeout(() => {
          setPhase('done')
          document.body.style.overflow = prevOverflow
        }, 50) // Near-instant for reduced motion
        timersRef.current.push(t2)
      }, 200) // Brief flash so the page doesn't feel jarring
      timersRef.current.push(t)

      return () => {
        cleanup()
        document.body.style.overflow = prevOverflow
      }
    }

    // Normal flow: start dissolve after full animation
    const t1 = setTimeout(() => {
      setPhase('dissolving')
    }, TOTAL_DURATION_MS)

    // Remove overlay completely after dissolve finishes
    const t2 = setTimeout(() => {
      setPhase('done')
      document.body.style.overflow = prevOverflow
    }, TOTAL_DURATION_MS + DISSOLVE_MS)

    timersRef.current.push(t1, t2)

    return () => {
      cleanup()
      document.body.style.overflow = prevOverflow
    }
  }, [phase, cleanup])

  // Nothing to render after intro completes
  if (phase === 'done') return null

  // Grid line positions — minimal, elegant
  const hLines = [25, 50, 75] // % from top
  const vLines = [20, 40, 60, 80] // % from left

  return (
    <div
      ref={overlayRef}
      className={`cinematic-intro${phase === 'dissolving' ? ' cinematic-intro--dissolving' : ''}`}
      aria-hidden={phase === 'dissolving' ? 'true' : undefined}
      role="presentation"
    >
      {/* Phase A: Technical geometry grid lines */}
      <div className="cinematic-intro__grid">
        {hLines.map((pos, i) => (
          <div
            key={`h-${i}`}
            className="cinematic-intro__hline"
            style={{
              top: `${pos}%`,
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}
        {vLines.map((pos, i) => (
          <div
            key={`v-${i}`}
            className="cinematic-intro__vline"
            style={{
              left: `${pos}%`,
              animationDelay: `${0.05 + i * 0.06}s`,
            }}
          />
        ))}
      </div>

      {/* Phase A: Light sweep pass */}
      <div className="cinematic-intro__lightsweep" />

      {/* Central ambient glow */}
      <div className="cinematic-intro__core-glow" />

      {/* Phase B: Name reveal — masked word-by-word */}
      <div className="cinematic-intro__name-wrap">
        <span className="cinematic-intro__word cinematic-intro__word--first" aria-label="Himesh">
          <span className="cinematic-intro__word-inner" aria-hidden="true">
            HIMESH
          </span>
        </span>
        <span className="cinematic-intro__word cinematic-intro__word--second" aria-label="Popat">
          <span className="cinematic-intro__word-inner" aria-hidden="true">
            POPAT
          </span>
        </span>

        {/* Light pass across the name */}
        <div className="cinematic-intro__name-shine" />
      </div>

      {/* Phase C: Convergence lines */}
      <div className="cinematic-intro__converge-line cinematic-intro__converge-line--h" />
      <div className="cinematic-intro__converge-line cinematic-intro__converge-line--v" />

      {/* Engineering corner accents */}
      <div className="cinematic-intro__corner cinematic-intro__corner--tl" />
      <div className="cinematic-intro__corner cinematic-intro__corner--tr" />
      <div className="cinematic-intro__corner cinematic-intro__corner--bl" />
      <div className="cinematic-intro__corner cinematic-intro__corner--br" />
    </div>
  )
})
