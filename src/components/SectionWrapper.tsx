import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function SectionWrapper({ id, children, className = '', ariaLabel }: SectionWrapperProps) {
  const isReduced = useReducedMotion();

  // Detect touch devices (hover: none) to scale down motion curves
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  const duration = isReduced ? 0.3 : (isTouch ? 0.25 : 0.4);
  const yOffset = isReduced ? 0 : (isTouch ? 10 : 16);

  return (
    <section 
      id={id} 
      className={`py-14 md:py-24 border-t border-line relative overflow-hidden ${className}`}
      aria-label={ariaLabel}
    >
      <motion.div
        initial={{ opacity: 0, y: yOffset }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
