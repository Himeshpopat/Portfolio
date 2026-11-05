import { useEffect, useRef, useState } from 'react'

/**
 * Detects prefers-reduced-motion media query.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  return reduced
}

/**
 * Tracks visibility of a section container using IntersectionObserver
 * so animations automatically pause when off-screen.
 */
export function useSectionVisibility(
  targetRef: React.RefObject<HTMLElement | null>,
  fallbackVisible = true
): boolean {
  const [isVisible, setIsVisible] = useState(fallbackVisible)

  useEffect(() => {
    const el = targetRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) {
          setIsVisible(entry.isIntersecting)
        }
      },
      { rootMargin: '120px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [targetRef])

  return isVisible
}

/**
 * Smoothly tracks mouse pointer coordinates over a container with damped lerp interpolation.
 */
export function usePointerTracker(targetRef: React.RefObject<HTMLElement | null>) {
  const coordsRef = useRef({
    currentX: -1000,
    currentY: -1000,
    targetX: -1000,
    targetY: -1000,
    active: false,
    lerpSpeed: 0.08,
  })

  useEffect(() => {
    const el = targetRef.current
    if (!el) return

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      coordsRef.current.targetX = e.clientX - rect.left
      coordsRef.current.targetY = e.clientY - rect.top
      coordsRef.current.active = true
      // On first entry, snap current coordinates to avoid a jarring jump across screen
      if (coordsRef.current.currentX < -500) {
        coordsRef.current.currentX = coordsRef.current.targetX
        coordsRef.current.currentY = coordsRef.current.targetY
      }
    }

    const handlePointerLeave = () => {
      coordsRef.current.active = false
    }

    el.addEventListener('pointermove', handlePointerMove, { passive: true })
    el.addEventListener('pointerleave', handlePointerLeave, { passive: true })

    return () => {
      el.removeEventListener('pointermove', handlePointerMove)
      el.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [targetRef])

  const getCoords = () => {
    const c = coordsRef.current
    c.currentX += (c.targetX - c.currentX) * c.lerpSpeed
    c.currentY += (c.targetY - c.currentY) * c.lerpSpeed
    return {
      x: c.currentX,
      y: c.currentY,
      active: c.active,
    }
  }

  return { getCoords, coordsRef }
}

/**
 * Automatically throttles particle counts for smaller screens to ensure 60fps on mobile.
 */
export function getResponsiveCount(desktopCount: number): number {
  if (typeof window === 'undefined') return desktopCount
  if (window.innerWidth < 640) return Math.max(6, Math.round(desktopCount * 0.35))
  if (window.innerWidth < 1024) return Math.max(10, Math.round(desktopCount * 0.6))
  return desktopCount
}

/**
 * Prepares high-DPI canvas dimensions.
 */
export function setupHiDPICanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): number {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = Math.floor(width * dpr)
  canvas.height = Math.floor(height * dpr)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.scale(dpr, dpr)
  return dpr
}

