import { useState, useEffect } from 'react'

export function useScrolled(): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // The only consumer needs the threshold, not a render per scroll pixel.
    const handleScroll = () => setScrolled(window.scrollY > 64)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrolled
}
