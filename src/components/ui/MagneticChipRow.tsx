import { useRef, useCallback, memo, type MouseEvent } from 'react'
import { SkillChip } from './SkillChip'

export const MagneticChipRow = memo(function MagneticChipRow({ items }: { items: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chipRefs = useRef<(HTMLSpanElement | null)[]>([])
  const rafRef = useRef<number | null>(null)

  const handleMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const clientX = e.clientX
    const clientY = e.clientY
    rafRef.current = requestAnimationFrame(() => {
      chipRefs.current.forEach((chip) => {
        if (!chip) return
        const rect = chip.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = cx - clientX
        const dy = cy - clientY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const radius = 70
        if (dist < radius) {
          const force = (1 - dist / radius) * 14
          const angle = Math.atan2(dy, dx)
          chip.style.transform = `translate(${Math.cos(angle) * force}px, ${Math.sin(angle) * force}px)`
        } else {
          chip.style.transform = 'translate(0px, 0px)'
        }
      })
    })
  }, [])

  const handleLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    chipRefs.current.forEach((chip) => {
      if (chip) chip.style.transform = 'translate(0px, 0px)'
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className="flex flex-wrap gap-2.5 sm:gap-3 items-center justify-center md:justify-start"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {items.map((skill, i) => (
        <span
          key={skill}
          ref={(el) => {
            chipRefs.current[i] = el
          }}
          style={{ transition: 'transform 0.15s ease-out', display: 'inline-block' }}
        >
          <SkillChip>{skill}</SkillChip>
        </span>
      ))}
    </div>
  )
})
