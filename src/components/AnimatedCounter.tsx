import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, animate } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface AnimatedCounterProps {
  target: string; // e.g. "150", "96", etc.
  suffix?: string; // e.g. "+", "%ile", etc.
}

export default function AnimatedCounter({ target, suffix = '' }: AnimatedCounterProps) {
  const isReduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const numTarget = parseInt(target.replace(/\D/g, ''), 10) || 0;
  const nonDigitPrefix = target.match(/^\D+/)?.[0] || '';
  const nonDigitSuffix = target.match(/\D+$/)?.[0] || '';

  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(isReduced ? target : (nonDigitPrefix + "0" + nonDigitSuffix));

  useEffect(() => {
    if (isReduced) {
      setDisplayValue(target);
      return;
    }

    if (isInView) {
      const controls = animate(count, numTarget, {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
        onUpdate: (latest) => {
          setDisplayValue(nonDigitPrefix + Math.round(latest) + nonDigitSuffix);
        }
      });
      return () => controls.stop();
    }
  }, [isInView, numTarget, count, isReduced, target, nonDigitPrefix, nonDigitSuffix]);

  return (
    <span ref={ref} className="font-mono">
      {displayValue}
      {suffix}
    </span>
  );
}
