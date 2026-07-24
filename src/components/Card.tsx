import React from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export default function Card({ children, className = '', onClick, interactive = false }: CardProps) {
  const isReduced = useReducedMotion();
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  const isClickable = !!onClick || interactive;

  const baseStyles = "bg-surface border border-line rounded-[10px] relative overflow-hidden transition-all duration-300 ease-out-expo outline-none";
  
  // Conditionally construct hover classes based on accessibility and input constraints
  const hoverClasses = isClickable
    ? `cursor-pointer ${
        isReduced
          ? "hover:border-signal-cyan/40 hover:bg-surface-raised"
          : isTouch
            ? "active:border-signal-cyan/40 active:bg-surface-raised active:scale-[0.98]"
            : "hover:border-signal-cyan/40 hover:bg-surface-raised hover:-translate-y-1 hover:shadow-soft"
      }`
    : "";

  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${hoverClasses} ${className}`}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? "button" : undefined}
      onKeyDown={(e) => {
        if (isClickable && onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
    </div>
  );
}
