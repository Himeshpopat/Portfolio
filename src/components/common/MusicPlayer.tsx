import { useState, useEffect, useRef, useCallback, memo } from 'react'
import { SITE_CONFIG } from '../../constants/siteConfig'

const MUSIC_SRC = SITE_CONFIG.musicSrc
const TARGET_VOLUME = 0.75
const FADE_IN_DURATION = 800
const FADE_OUT_DURATION = 500
const STORAGE_KEY = 'himesh_portfolio_music_enabled'

export const MusicPlayer = memo(function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const requestRef = useRef(0)
  const desiredPlaying = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeIntervalRef = useRef<number | null>(null)

  const clearFadeTimer = useCallback(() => {
    if (fadeIntervalRef.current !== null) {
      clearInterval(fadeIntervalRef.current)
      fadeIntervalRef.current = null
    }
  }, [])

  const getAudio = useCallback(() => {
    if (!audioRef.current && typeof window !== 'undefined') {
      const audio = new Audio(MUSIC_SRC)
      audio.loop = true
      audio.preload = 'none'
      audio.volume = 0
      audio.onerror = (e) => {
        console.error('Failed to load background music audio file:', e)
        requestRef.current++
        desiredPlaying.current = false
        clearFadeTimer()
        setPlaying(false)
      }
      audioRef.current = audio
    }
    return audioRef.current
  }, [clearFadeTimer])

  const fadeIn = useCallback(() => {
    const audio = getAudio()
    if (!audio) return
    clearFadeTimer()

    const request = ++requestRef.current
    desiredPlaying.current = true
    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          if (request !== requestRef.current) return
          clearFadeTimer()
          setPlaying(true)
          try {
            localStorage.setItem(STORAGE_KEY, 'true')
          } catch {
            /* ignore quota/security issues */
          }

          const stepMs = 30
          const totalSteps = FADE_IN_DURATION / stepMs
          const volumeIncrement = TARGET_VOLUME / totalSteps
          let currentVol = audio.volume

          fadeIntervalRef.current = window.setInterval(() => {
            currentVol = Math.min(TARGET_VOLUME, currentVol + volumeIncrement)
            audio.volume = currentVol
            if (currentVol >= TARGET_VOLUME) {
              clearFadeTimer()
            }
          }, stepMs)
        })
        .catch((err) => {
          if (request !== requestRef.current) return
          desiredPlaying.current = false
          console.warn('Playback interrupted or blocked by browser policy:', err)
          setPlaying(false)
        })
    }
  }, [getAudio, clearFadeTimer])

  const fadeOut = useCallback(() => {
    requestRef.current++
    desiredPlaying.current = false
    setPlaying(false)
    const audio = audioRef.current
    if (!audio) return
    clearFadeTimer()

    try {
      localStorage.setItem(STORAGE_KEY, 'false')
    } catch {
      /* ignore */
    }

    const stepMs = 30
    const totalSteps = FADE_OUT_DURATION / stepMs
    const volumeDecrement = (audio.volume || TARGET_VOLUME) / totalSteps
    let currentVol = audio.volume

    fadeIntervalRef.current = window.setInterval(() => {
      currentVol = Math.max(0, currentVol - volumeDecrement)
      audio.volume = currentVol
      if (currentVol <= 0) {
        clearFadeTimer()
        audio.pause()
        setPlaying(false)
      }
    }, stepMs)
  }, [clearFadeTimer])

  useEffect(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY)
      if (savedState === 'true') {
        fadeIn()
      }
    } catch {
      /* ignore */
    }

    return () => {
      requestRef.current++
      desiredPlaying.current = false
      clearFadeTimer()
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [fadeIn, clearFadeTimer])

  const toggle = () => {
    if (desiredPlaying.current) {
      fadeOut()
    } else {
      fadeIn()
    }
  }

  return (
    <div
      className="music-player fixed bottom-[72px] right-3 md:bottom-6 md:right-6 z-40 flex items-center gap-3 rounded-full"
      style={{
        background: 'rgba(12,16,32,0.92)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        padding: '8px',
      }}
    >
      <div className="hidden md:flex items-center gap-0.5 pl-2" aria-hidden="true">
        {[0.4, 0.7, 1, 0.6, 0.9, 0.5].map((h, i) => (
          <div
            key={i}
            className="w-0.5 rounded-full"
            style={{
              height: 14,
              background: 'var(--accent)',
              transformOrigin: 'center',
              transform: playing ? `scaleY(${h})` : 'scaleY(0.25)',
              animation: playing ? `pulse-bar ${0.5 + i * 0.1}s ease-in-out infinite alternate` : 'none',
              opacity: playing ? 0.85 : 0.3,
              transition: 'transform 0.3s ease, opacity 0.3s ease',
            }}
          />
        ))}
      </div>

      <button
        onClick={toggle}
        className="w-9 h-9 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 flex-shrink-0 cursor-pointer"
        style={{ background: playing ? 'var(--accent)' : 'rgba(6,182,212,0.15)' }}
        aria-pressed={playing}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
      >
        {playing ? (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="var(--button-ink)" aria-hidden="true">
            <rect x="0" y="0" width="3" height="12" rx="1" />
            <rect x="6" y="0" width="3" height="12" rx="1" />
          </svg>
        ) : (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="var(--accent)" aria-hidden="true">
            <path d="M0 0 L10 6 L0 12 Z" />
          </svg>
        )}
      </button>

      <span
        className="hidden md:inline pr-2"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--text-muted)',
          letterSpacing: '0.1em',
          whiteSpace: 'nowrap',
        }}
      >
        {playing ? 'MUSIC' : 'MUTED'}
      </span>
    </div>
  )
})
