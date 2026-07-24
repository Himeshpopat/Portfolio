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

  const hasDigits = /\d/.test(target);
  const numTarget = parseInt(target.replace(/\D/g, ''), 10) || 0;
  const nonDigitPrefix = target.match(/^\D+/)?.[0] || '';
  // Only treat trailing non-digits as a "suffix" when the string actually has a digit somewhere;
  // otherwise this regex matches the whole string again and duplicates it (e.g. "Completed0Completed").
  const nonDigitSuffix = hasDigits ? (target.match(/\D+$/)?.[0] || '') : '';

  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(
    !hasDigits || isReduced ? target : (nonDigitPrefix + "0" + nonDigitSuffix)
  );

  useEffect(() => {
    if (!hasDigits || isReduced) {
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
  }, [isInView, numTarget, count, isReduced, target, nonDigitPrefix, nonDigitSuffix, hasDigits]);

  return (
    <span ref={ref} className="font-mono">
      {displayValue}
      {suffix}
    </span>
  );
}
