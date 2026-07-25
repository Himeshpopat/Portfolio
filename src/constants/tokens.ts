/**
 * Reusable design system tokens mapped to CSS variables or brand palette.
 * Ensures zero visual change while providing internal code consistency.
 */
export const TOKENS = {
  colors: {
    bg: 'var(--bg)',
    bgCard: 'var(--bg-card)',
    accent: 'var(--accent)',
    accentGlow: 'var(--accent-glow)',
    numeric: 'var(--numeric)',
    tag: 'var(--tag)',
    text: 'var(--text)',
    textMuted: 'var(--text-muted)',
    border: 'var(--border)',

    // Raw color values preserved for dynamic opacity / inline styles
    cyan: '#06b6d4',
    violet: '#8b5cf6',
    amber: '#f59e0b',
    emerald: '#22c55e',
    rose: '#f43f5e',
    darkBg: '#0c1020',
    cardBg: '#111827',
    textMain: '#f1f5f9',
    textSub: '#94a3b8',
    textDark: '#64748b',
  },
  fonts: {
    display: 'var(--font-display)',
    body: 'var(--font-body)',
    mono: 'var(--font-mono)',
  },
} as const
