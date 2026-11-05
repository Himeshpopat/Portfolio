import { memo, type ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'

export const FadeSection = memo(function FadeSection({
  id,
  children,
  className = '',
  noPad = false,
}: {
  id: string
  children: ReactNode
  className?: string
  noPad?: boolean
}) {
  const { ref, visible } = useInView()
  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`portfolio-section ${noPad ? '' : 'max-w-6xl mx-auto px-5 py-6 md:py-14'} ${className}`}
      style={{
        opacity: 1,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'transform 0.65s ease',
      }}
    >
      {children}
    </section>
  )
})
