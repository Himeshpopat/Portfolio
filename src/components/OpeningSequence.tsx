import React, { useEffect, useState, useRef, useCallback } from 'react';

export interface OpeningSequenceProps {
    /** Primary name displayed in the kinetic mask reveal */
    name?: string;
    /** Subtitle / engineering discipline */
    role?: string;
    /** Callback fired as the shutter begins opening so the hero can animate in */
    onRevealStart?: () => void;
    /** Callback fired when the animation finishes and unmounts */
    onComplete?: () => void;
}

export const OpeningSequence: React.FC<OpeningSequenceProps> = ({
    name = 'PUT YOUR NAME HERE', // <-- 1. CHANGE THIS TO YOUR FULL NAME
    role = 'SOFTWARE ENGINEER · AI & FULL-STACK SYSTEMS', // <-- 2. CHANGE THIS TO YOUR TAGLINE
    onRevealStart,
    onComplete,
}) => {
    const [phase, setPhase] = useState<'calibrating' | 'revealing' | 'done'>('calibrating');
    const [progress, setProgress] = useState<number>(0);
    const [viewport, setViewport] = useState<{ w: number; h: number }>({
        w: typeof window !== 'undefined' ? window.innerWidth : 1440,
        h: typeof window !== 'undefined' ? window.innerHeight : 900,
    });

    const rafRef = useRef<number | null>(null);
    const revealTriggeredRef = useRef(false);
    const completedRef = useRef(false);

    const finishSequence = useCallback(() => {
        if (completedRef.current) return;
        completedRef.current = true;
        setPhase('done');
        document.body.style.overflow = '';
        onComplete?.();
    }, [onComplete]);

    const triggerReveal = useCallback(() => {
        if (revealTriggeredRef.current) return;
        revealTriggeredRef.current = true;
        setPhase('revealing');
        onRevealStart?.();
    }, [onRevealStart]);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            onRevealStart?.();
            finishSequence();
            return;
        }

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleResize = () => {
            setViewport({ w: window.innerWidth, h: window.innerHeight });
        };
        window.addEventListener('resize', handleResize, { passive: true });

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setProgress(100);
                triggerReveal();
                setTimeout(finishSequence, 450);
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        const duration = 1650;
        const revealDuration = 750;
        const startTime = performance.now();

        const tick = (now: number) => {
            const elapsed = now - startTime;
            const raw = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - raw, 4);
            setProgress(Math.round(eased * 100));

            if (raw < 1) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                triggerReveal();
            }
        };

        rafRef.current = requestAnimationFrame(tick);

        const completeTimer = window.setTimeout(() => {
            finishSequence();
        }, duration + revealDuration);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            clearTimeout(completeTimer);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [finishSequence, onRevealStart, triggerReveal]);

    if (phase === 'done') return null;

    const words = name.trim().split(/\s+/);
    const formattedProgress = String(progress).padStart(3, '0');

    return (
        <div
            className={`os-root ${phase === 'revealing' ? 'os-root--revealing' : ''}`}
            role="region"
            aria-label="Opening portfolio introduction"
        >
            <style>{`
        .os-root {
          position: fixed;
          inset: 0;
          z-index: 99999;
          pointer-events: auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: clamp(1.25rem, 3.5vw, 2.75rem);
          color: #f4f5f8;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          user-select: none;
          -webkit-font-smoothing: antialiased;
          overflow: hidden;
        }

        .os-root--revealing {
          pointer-events: none;
        }

        /* Split Architectural Shutters — Tuned to match #0c1020 portfolio background */
        .os-shutter {
          position: absolute;
          left: 0;
          right: 0;
          background: #080b16;
          z-index: 0;
          will-change: transform;
          transition: transform 0.78s cubic-bezier(0.76, 0, 0.24, 1);
        }

        .os-shutter--top {
          top: 0;
          height: 50.5%;
          transform-origin: top center;
          border-bottom: 1px solid rgba(56, 189, 248, 0.14);
          background: radial-gradient(circle at 50% 100%, #131a33 0%, #080b16 72%);
        }

        .os-shutter--bottom {
          bottom: 0;
          height: 50.5%;
          transform-origin: bottom center;
          background: radial-gradient(circle at 50% 0%, #131a33 0%, #080b16 72%);
        }

        .os-root--revealing .os-shutter--top {
          transform: translate3d(0, -102%, 0);
        }

        .os-root--revealing .os-shutter--bottom {
          transform: translate3d(0, 102%, 0);
        }

        /* Architectural Precision Grid */
        .os-grid {
          position: absolute;
          inset: clamp(1.25rem, 3.5vw, 2.75rem);
          z-index: 1;
          pointer-events: none;
          border: 1px solid rgba(255, 255, 255, 0.07);
          transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.75s cubic-bezier(0.76, 0, 0.24, 1);
        }

        .os-root--revealing .os-grid {
          opacity: 0;
          transform: scale(1.03);
        }

        .os-grid-axis-v {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 1px;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.06) 20%,
            rgba(255, 255, 255, 0.06) 80%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: scaleY(0);
          transform-origin: center;
          animation: osAxisGrow 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Corner Registration Crosshairs */
        .os-corner {
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: rgba(56, 189, 248, 0.45);
          border-style: solid;
          border-width: 0;
        }
        .os-corner--tl { top: -1px; left: -1px; border-top-width: 1.5px; border-left-width: 1.5px; }
        .os-corner--tr { top: -1px; right: -1px; border-top-width: 1.5px; border-right-width: 1.5px; }
        .os-corner--bl { bottom: -1px; left: -1px; border-bottom-width: 1.5px; border-left-width: 1.5px; }
        .os-corner--br { bottom: -1px; right: -1px; border-bottom-width: 1.5px; border-right-width: 1.5px; }

        /* Top & Bottom Telemetry Bars */
        .os-bar {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.35rem 0.6rem;
          font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: clamp(0.65rem, 1.1vw, 0.75rem);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(244, 245, 248, 0.58);
          transition: opacity 0.35s ease, transform 0.45s cubic-bezier(0.76, 0, 0.24, 1);
        }

        .os-root--revealing .os-bar--top {
          opacity: 0;
          transform: translate3d(0, -16px, 0);
        }

        .os-root--revealing .os-bar--bottom {
          opacity: 0;
          transform: translate3d(0, 16px, 0);
        }

        .os-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .os-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #38bdf8;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.85);
        }

        /* Center Composition */
        .os-center {
          position: relative;
          z-index: 2;
          margin: auto 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 clamp(0.5rem, 3vw, 2rem);
          transition: opacity 0.42s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.65s cubic-bezier(0.76, 0, 0.24, 1);
        }

        .os-root--revealing .os-center {
          opacity: 0;
          transform: scale(0.965) translate3d(0, -8px, 0);
        }

        /* Optical Spectrum Calibration Strip */
        .os-spectrum {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: clamp(1rem, 2.5vh, 1.75rem);
          opacity: 0;
          transform: translate3d(0, 10px, 0);
          animation: osFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.08s forwards;
        }

        .os-spectrum-swatch {
          height: 3px;
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        /* Kinetic Masked Title */
        .os-title {
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          column-gap: clamp(0.45rem, 1.8vw, 1.25rem);
          row-gap: 0.15rem;
          font-size: clamp(2rem, 6.8vw, 5.25rem);
          font-weight: 700;
          line-height: 1.04;
          letter-spacing: -0.035em;
          color: #ffffff;
        }

        .os-word-mask {
          display: inline-block;
          overflow: hidden;
          padding-bottom: 0.06em;
        }

        .os-word-inner {
          display: inline-block;
          transform: translate3d(0, 112%, 0) rotate(1.5deg);
          transform-origin: left bottom;
          will-change: transform;
          animation: osWordReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Role / Discipline Subtitle */
        .os-role-mask {
          overflow: hidden;
          margin-top: clamp(0.75rem, 2vh, 1.35rem);
          max-width: 90vw;
        }

        .os-role {
          margin: 0;
          font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, monospace;
          font-size: clamp(0.66rem, 1.25vw, 0.82rem);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(244, 245, 248, 0.68);
          transform: translate3d(0, 110%, 0);
          animation: osWordReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.26s forwards;
        }

        /* Precision Progress Line */
        .os-meter-wrap {
          margin-top: clamp(1.5rem, 3.8vh, 2.5rem);
          width: min(280px, 72vw);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.55rem;
        }

        .os-meter-track {
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.12);
          position: relative;
          overflow: hidden;
        }

        .os-meter-fill {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          background: linear-gradient(90deg, #38bdf8, #818cf8, #f43f5e);
          transition: width 0.06s linear;
        }

        .os-counter {
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
          font-size: clamp(0.7rem, 1.2vw, 0.8rem);
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.18em;
          color: rgba(255, 255, 255, 0.85);
        }

        .os-skip-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: rgba(244, 245, 248, 0.6);
          font-family: inherit;
          font-size: inherit;
          letter-spacing: inherit;
          text-transform: inherit;
          padding: 0.3rem 0.65rem;
          border-radius: 999px;
          cursor: pointer;
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        }

        .os-skip-btn:hover,
        .os-skip-btn:focus-visible {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.05);
          outline: none;
        }

        @keyframes osWordReveal {
          0% {
            transform: translate3d(0, 112%, 0) rotate(1.5deg);
          }
          100% {
            transform: translate3d(0, 0%, 0) rotate(0deg);
          }
        }

        @keyframes osFadeUp {
          0% {
            opacity: 0;
            transform: translate3d(0, 10px, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes osAxisGrow {
          0% {
            transform: scaleY(0);
          }
          100% {
            transform: scaleY(1);
          }
        }

        @media (max-width: 640px) {
          .os-root {
            padding: 1rem;
          }
          .os-grid {
            inset: 1rem;
          }
          .os-hide-mobile {
            display: none;
          }
          .os-title {
            font-size: clamp(1.75rem, 9.2vw, 2.6rem);
            line-height: 1.08;
          }
          .os-role {
            font-size: 0.64rem;
            letter-spacing: 0.13em;
            line-height: 1.5;
          }
          .os-bar {
            padding: 0.25rem 0.35rem;
            font-size: 0.62rem;
            letter-spacing: 0.1em;
          }
        }
      `}</style>

            {/* Split Architectural Shutters */}
            <div className="os-shutter os-shutter--top" aria-hidden="true" />
            <div className="os-shutter os-shutter--bottom" aria-hidden="true" />

            {/* Architectural Frame & Registration Marks */}
            <div className="os-grid" aria-hidden="true">
                <div className="os-grid-axis-v" />
                <span className="os-corner os-corner--tl" />
                <span className="os-corner os-corner--tr" />
                <span className="os-corner os-corner--bl" />
                <span className="os-corner os-corner--br" />
            </div>

            {/* Top Telemetry Bar */}
            <div className="os-bar os-bar--top">
                <span className="os-status-pill">
                    <span className="os-status-dot" />
                    {/* 3. OPTIONAL: Change this text if you want */}
                    <span>HIMESH.DEV // PORTFOLIO</span>
                </span>
                <span className="os-hide-mobile">
                    VP {viewport.w}×{viewport.h}PX
                </span>
            </div>

            {/* Center Focal Reveal */}
            <div className="os-center">
                <div className="os-spectrum" aria-hidden="true">
                    <span className="os-spectrum-swatch" style={{ width: 18, background: '#38bdf8' }} />
                    <span className="os-spectrum-swatch" style={{ width: 12, background: '#818cf8' }} />
                    <span className="os-spectrum-swatch" style={{ width: 24, background: '#f43f5e' }} />
                    <span className="os-spectrum-swatch" style={{ width: 10, background: '#10b981' }} />
                </div>

                <h1 className="os-title" aria-label={name}>
                    {words.map((word, idx) => (
                        <span key={idx} className="os-word-mask">
                            <span
                                className="os-word-inner"
                                style={{ animationDelay: `${idx * 0.09 + 0.06}s` }}
                            >
                                {word}
                            </span>
                        </span>
                    ))}
                </h1>

                <div className="os-role-mask">
                    <p className="os-role">{role}</p>
                </div>

                <div className="os-meter-wrap" aria-hidden="true">
                    <div className="os-meter-track">
                        <div className="os-meter-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="os-counter">{formattedProgress}%</div>
                </div>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="os-bar os-bar--bottom">
                <span>STATUS // OPEN TO WORK</span>
                <button
                    type="button"
                    className="os-skip-btn"
                    onClick={() => {
                        setProgress(100);
                        triggerReveal();
                        setTimeout(finishSequence, 450);
                    }}
                    aria-label="Skip opening animation"
                >
                    SKIP [ESC]
                </button>
            </div>
        </div>
    );
};

export default OpeningSequence;