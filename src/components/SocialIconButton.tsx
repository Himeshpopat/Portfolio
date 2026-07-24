import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface SocialIconButtonProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

export default function SocialIconButton({ href, icon: Icon, label }: SocialIconButtonProps) {
  const isReduced = useReducedMotion();

  const motionProps = isReduced ? {} : {
    whileHover: { scale: 1.08 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring" as const, stiffness: 400, damping: 15 }
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="inline-flex items-center justify-center w-10 h-10 rounded-[10px] border border-line bg-surface text-text-muted hover:border-signal-cyan hover:text-signal-cyan transition-colors duration-200 outline-none focus-visible:outline-2 focus-visible:outline-signal-cyan"
      {...motionProps}
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  );
}
