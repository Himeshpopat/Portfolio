import { useState, useEffect, useRef, type RefObject } from 'react'

export function useInView(threshold = 0.1): {
  ref: RefObject<HTMLDivElement | null>
  visible: boolean
} {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: Math.min(threshold, 0.01), rootMargin: '80px 0px' },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, visible }
}
