import { useState, useEffect } from 'react'

export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] || '')

  useEffect(() => {
    if (!ids || ids.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })

    return () => obs.disconnect()
  }, [ids])

  return active
}
