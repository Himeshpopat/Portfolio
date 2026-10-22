import { useCallback, useEffect, useRef, useState } from 'react'
import './OpeningSequence.css'

export interface OpeningSequenceProps {
  /** Name displayed in the opening sequence. */
  name?: string
  /** Short professional descriptor displayed beneath the name. */
  role?: string
}

type OpeningPhase = 'intro' | 'exiting' | 'done'

const INTRO_DURATION_MS = 2_280
const EXIT_DURATION_MS = 1_080

function getInitialPhase(): OpeningPhase {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return 'done'
  }

  return 'intro'
}

/**
 * OpeningSequence
 *
 * A short, identity-led opening animation. The visual system is deliberately
 * self-contained: it does not change the portfolio's layout or require an
 * animation library. CSS handles all continuous motion; React only manages
 * the two lifecycle transitions (intro -> exit -> unmount).
 */
export function OpeningSequence({
  name = 'HIMESH POPAT',
  role = 'SOFTWARE ENGINEERING · FULL-STACK · AI / ML',
}: OpeningSequenceProps) {
  const [phase, setPhase] = useState<OpeningPhase>(getInitialPhase)
  const phaseRef = useRef<OpeningPhase>(phase)
  const introTimerRef = useRef<number | null>(null)
  const exitTimerRef = useRef<number | null>(null)
  const skipButtonRef = useRef<HTMLButtonElement>(null)

  const beginExit = useCallback(() => {
    if (phaseRef.current !== 'intro') return

    phaseRef.current = 'exiting'
    setPhase('exiting')

    if (introTimerRef.current !== null) {
      window.clearTimeout(introTimerRef.current)
      introTimerRef.current = null
    }

    exitTimerRef.current = window.setTimeout(() => {
      phaseRef.current = 'done'
      setPhase('done')
    }, EXIT_DURATION_MS)
  }, [])

  useEffect(() => {
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''

    if (phase !== 'intro') return

    skipButtonRef.current?.focus({ preventScroll: true })

    introTimerRef.current = window.setTimeout(beginExit, INTRO_DURATION_MS)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        beginExit()
        return
      }

      // The intro is a short modal layer; keep keyboard focus on its only
      // control rather than allowing focus to move to obscured page content.
      if (event.key === 'Tab' && phaseRef.current === 'intro') {
        event.preventDefault()
        skipButtonRef.current?.focus({ preventScroll: true })
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      if (introTimerRef.current !== null) {
        window.clearTimeout(introTimerRef.current)
        introTimerRef.current = null
      }

      if (exitTimerRef.current !== null) {
        window.clearTimeout(exitTimerRef.current)
        exitTimerRef.current = null
      }

      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [beginExit, phase])

  if (phase === 'done') return null

  const words = name.trim().split(/\s+/).filter(Boolean)

  return (
    <div
      className={`opening-sequence${phase === 'exiting' ? ' opening-sequence--exiting' : ''}`}
      data-phase={phase}
      role="dialog"
      aria-modal="true"
      aria-label="Himesh Popat portfolio introduction"
    >
      <div className="opening-sequence__field" aria-hidden="true" />
      <div className="opening-sequence__beam" aria-hidden="true" />

      <div className="opening-sequence__topline" aria-hidden="true">
        <span className="opening-sequence__brand">
          <span className="opening-sequence__brand-mark">HP</span>
          <span className="opening-sequence__brand-divider" />
          <span>PERSONAL PORTFOLIO</span>
        </span>
      </div>

      <div className="opening-sequence__composition" aria-hidden="true">
        <div className="opening-sequence__monogram">
          <svg
            className="opening-sequence__monogram-svg"
            viewBox="0 0 240 240"
            fill="none"
            role="presentation"
          >
            <defs>
              <linearGradient id="opening-sequence-spectrum" x1="42" y1="190" x2="192" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#06b6d4" />
                <stop offset="0.58" stopColor="#67e8f9" />
                <stop offset="1" stopColor="#a78bfa" />
              </linearGradient>
              <radialGradient id="opening-sequence-core" cx="0" cy="0" r="1" gradientTransform="translate(120 118) rotate(90) scale(92)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#06b6d4" stopOpacity="0.16" />
                <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle className="opening-sequence__core-wash" cx="120" cy="120" r="92" fill="url(#opening-sequence-core)" />
            <circle className="opening-sequence__orbit opening-sequence__orbit--outer" cx="120" cy="120" r="91" stroke="url(#opening-sequence-spectrum)" strokeOpacity="0.52" strokeWidth="0.8" strokeDasharray="1 7" />
            <circle className="opening-sequence__orbit opening-sequence__orbit--inner" cx="120" cy="120" r="77" stroke="#e2e8f0" strokeOpacity="0.16" strokeWidth="0.7" strokeDasharray="34 12 3 12" />
            <path
              className="opening-sequence__monogram-trace"
              d="M72 62V166M72 114H120M120 62V166M120 62H151C171 62 179 73 179 88C179 103 169 114 151 114H120"
              stroke="url(#opening-sequence-spectrum)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="opening-sequence__monogram-highlight"
              d="M72 62V166M72 114H120M120 62V166M120 62H151C171 62 179 73 179 88C179 103 169 114 151 114H120"
              stroke="#ecfeff"
              strokeOpacity="0.68"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle className="opening-sequence__orbit-node" cx="120" cy="29" r="2.5" fill="#67e8f9" />
            <circle className="opening-sequence__orbit-node opening-sequence__orbit-node--warm" cx="184" cy="147" r="2" fill="#a78bfa" />
          </svg>
          <span className="opening-sequence__monogram-halo" />
        </div>

        <div className="opening-sequence__eyebrow">
          <span className="opening-sequence__eyebrow-line" />
          <span>DESIGNING · BUILDING · SOLVING</span>
          <span className="opening-sequence__eyebrow-line" />
        </div>

        <div className="opening-sequence__name" aria-label={name}>
          {words.map((word, index) => (
            <span className="opening-sequence__word-mask" key={`${word}-${index}`}>
              <span
                className="opening-sequence__word"
                style={{ animationDelay: `${630 + index * 150}ms` }}
              >
                {word}
              </span>
            </span>
          ))}
        </div>

        <div className="opening-sequence__signature-rule">
          <span />
        </div>

        <p className="opening-sequence__role">{role}</p>
      </div>

      <div className="opening-sequence__bottomline" aria-hidden="true">
        <span>MUMBAI, INDIA</span>
        <span className="opening-sequence__bottom-center">A PORTFOLIO BY HIMESH POPAT</span>
        <span>FULL-STACK <i /> AI / ML</span>
      </div>

      <button
        ref={skipButtonRef}
        className="opening-sequence__skip"
        type="button"
        onClick={beginExit}
        aria-label="Skip portfolio opening animation"
      >
        <span>SKIP INTRO</span>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8H12M8 3.5L12.5 8L8 12.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}

export default OpeningSequence
