import { useEffect, useRef } from "react"

/** Decorative motion stays outside React's render loop and pauses off screen. */
export function StudioMotion() {
  const progress = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const sections = [
      ...document.querySelectorAll<HTMLElement>("main > section"),
    ]
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce), (pointer: coarse)",
    )
    let frame = 0
    let pointerFrame = 0
    const update = () => {
      frame = 0
      const range = document.documentElement.scrollHeight - innerHeight
      if (progress.current)
        progress.current.style.transform = `scaleX(${
          range > 0 ? scrollY / range : 0
        })`
    }
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries)
        (entry.target as HTMLElement).dataset.motionActive = String(
          entry.isIntersecting && !document.hidden,
        )
    })
    sections.forEach((section) => observer.observe(section))
    const visibility = () => {
      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        section.dataset.motionActive = String(
          !document.hidden && rect.bottom > 0 && rect.top < innerHeight,
        )
      }
    }
    const move = (event: PointerEvent) => {
      if (media.matches || pointerFrame) return
      const target = (event.target as HTMLElement).closest<HTMLElement>(
        ".hero-section, .surface-card",
      )
      if (!target) return
      pointerFrame = requestAnimationFrame(() => {
        pointerFrame = 0
        const rect = target.getBoundingClientRect()
        target.style.setProperty(
          "--pointer-x",
          `${event.clientX - rect.left}px`,
        )
        target.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`)
      })
    }
    update()
    window.addEventListener("scroll", scroll, { passive: true })
    window.addEventListener("resize", scroll, { passive: true })
    document.addEventListener("pointermove", move, { passive: true })
    document.addEventListener("visibilitychange", visibility)
    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(pointerFrame)
      observer.disconnect()
      window.removeEventListener("scroll", scroll)
      window.removeEventListener("resize", scroll)
      document.removeEventListener("pointermove", move)
      document.removeEventListener("visibilitychange", visibility)
    }
  }, [])
  return <div ref={progress} className="reading-progress" aria-hidden="true" />
}
