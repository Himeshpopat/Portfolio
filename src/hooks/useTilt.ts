import { useRef, useCallback, type MouseEvent, type RefObject } from 'react'

export function useTilt(): {
  ref: RefObject<HTMLDivElement | null>
  onMove: (e: MouseEvent<HTMLDivElement>) => void
  onLeave: () => void
} {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth < 900) return
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    ref.current.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 6}deg) translateZ(10px)`
    ref.current.style.boxShadow = `${-x * 20}px ${y * 20}px 40px rgba(0,0,0,0.4), 0 0 40px rgba(6,182,212,0.05)`
  }, [])

  const onLeave = useCallback(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 900) return
    if (!ref.current) return

    ref.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
    ref.current.style.boxShadow = 'none'
  }, [])

  return { ref, onMove, onLeave }
}
