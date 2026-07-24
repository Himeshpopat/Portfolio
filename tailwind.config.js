/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-raised': 'var(--surface-raised)',
        line: 'var(--line)',
        'text-primary': 'var(--text-primary)',
        'text-muted': 'var(--text-muted)',
        'signal-cyan': 'var(--signal-cyan)',
        'signal-amber': 'var(--signal-amber)',
        'signal-violet': 'var(--signal-violet)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        soft: '0 8px 32px rgba(0, 0, 0, 0.4)',
        cyan: '0 0 20px rgba(95, 212, 214, 0.12)',
      },
      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
