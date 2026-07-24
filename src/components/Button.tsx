import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'ghost';
  children: ReactNode;
}

export default function Button({ variant = 'primary', children, className = '', disabled, ...props }: ButtonProps) {
  const isReduced = useReducedMotion();

  const baseStyles = "relative inline-flex items-center justify-center gap-2 font-sans font-medium text-sm rounded-[10px] px-6 py-3 transition-colors duration-200 select-none outline-none focus-visible:outline-2 focus-visible:outline-signal-cyan focus-visible:outline-offset-2";
  
  const variantStyles = variant === 'primary' 
    ? "bg-signal-cyan text-bg hover:bg-opacity-90 hover:brightness-110 active:brightness-95"
    : "border border-line bg-transparent text-text-primary hover:border-signal-cyan hover:text-signal-cyan";
    
  const disabledStyles = "opacity-40 pointer-events-none";

  const motionProps = isReduced || disabled ? {} : {
    whileTap: { scale: 0.97 },
    transition: { duration: 0.1 }
  };

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles} ${disabled ? disabledStyles : ''} ${className}`}
      disabled={disabled}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  );
}
