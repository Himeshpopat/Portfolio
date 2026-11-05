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
      data-visible={visible}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </section>
  )
})
