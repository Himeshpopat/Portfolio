import React, { useState, useEffect, useRef, useCallback, useMemo, Fragment } from 'react'
import type { ReactNode, MouseEvent } from 'react'

import avatarImg from './assets/avatar.webp'

import veloxaHome from './assets/projects/veloxa/HomePage.webp'
import veloxaDash from './assets/projects/veloxa/Dashboard.webp'
import veloxaProd from './assets/projects/veloxa/Products.webp'
import veloxaCart from './assets/projects/veloxa/Cart.webp'
import veloxaOrder from './assets/projects/veloxa/OrderDetails.webp'

import cvdHome from './assets/projects/cvd/HomePage.webp'
import cvdReport from './assets/projects/cvd/Report.webp'
import cvdIshihara from './assets/projects/cvd/Ishihara.webp'
import cvdD15 from './assets/projects/cvd/D15.webp'
import cvdMosaic from './assets/projects/cvd/Mosaic.webp'

import diabetesP1 from './assets/projects/diabetes/p1.webp'
import diabetesP2 from './assets/projects/diabetes/p2.webp'
import diabetesP3 from './assets/projects/diabetes/p3.webp'

function getAssetUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const base = import.meta.env.BASE_URL || '/'
  const cleanBase = base.endsWith('/') ? base : `${base}/`
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${cleanBase}${cleanPath}`
}

// ─── Data ──────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: 'veloxa',
    name: 'Veloxa — B2B Commerce Platform',
    tagline: 'Full-stack B2B ordering system digitizing wholesale operations',
    problem:
      'Manual wholesale ordering created bottlenecks with no order tracking, inventory validation, or role separation.',
    solution:
      'Engineered a full-stack platform featuring a 3-stage automated order workflow, role-based access control, and OTP authentication.',
    outcomes: [
      '3-stage automated order workflow replacing manual paper orders',
      'Role-based access control (RBAC) & secure OTP authentication for multi-tier users',
      'Automated inventory validation & Cloudinary dynamic media storage',
      'Transactional email notification engine integrated via Brevo SMTP',
    ],
    pullMetrics: [
      { value: '50+', label: 'Registered Users' },
      { value: '3-Stage', label: 'Order Pipeline' },
    ],
    stack: ['Python', 'Flask', 'SQLAlchemy', 'Bootstrap', 'REST APIs', 'Render', 'Cloudinary', 'Brevo'],
    demo: 'https://veloxa-kla4.onrender.com/',
    source: 'https://github.com/Himeshpopat/Veloxa',
    screenshots: [
      { url: veloxaHome, caption: 'Veloxa — Landing Page & Platform Overview' },
      { url: veloxaDash, caption: 'Veloxa — B2B Admin Management Dashboard' },
      { url: veloxaProd, caption: 'Veloxa — Wholesale Product Catalog' },
      { url: veloxaCart, caption: 'Veloxa — Cart & Bulk Order Checkout' },
      { url: veloxaOrder, caption: 'Veloxa — 3-Stage Order Workflow & Tracking' },
    ],
    color: '#06b6d4',
  },
  {
    id: 'color-vision',
    name: 'Color Vision Deficiency System',
    tagline: 'Real-time CVD simulation with sub-200ms processing latency',
    problem:
      'Designers lacked lightweight browser tools to verify how colorblind users perceive visual assets across CVD types.',
    solution:
      'Developed a high-performance REST API utilizing optimized NumPy matrix transformations for real-time Protanopia, Deuteranopia, and Tritanopia simulation.',
    outcomes: [
      '<200ms processing latency per image via optimized NumPy matrix ops',
      'Simulates all 3 major CVD types: Protanopia, Deuteranopia, Tritanopia',
      'Drag-and-drop upload with side-by-side interactive visual comparison',
      'Lightweight REST API architecture built for seamless client integration',
    ],
    pullMetrics: [
      { value: '<200ms', label: 'Processing Latency' },
      { value: '3 Types', label: 'CVD Simulators' },
    ],
    stack: ['Python', 'Flask', 'NumPy', 'JavaScript', 'HTML5/CSS3', 'SQLite', 'REST APIs'],
    demo: 'https://color-blindness-app.onrender.com/',
    source: 'https://github.com/Himeshpopat/Color-Blindness-Detection-System',
    screenshots: [
      { url: cvdHome, caption: 'CVD Simulator — Interactive Application Interface' },
      { url: cvdReport, caption: 'CVD Simulator — Diagnostic Vision Report & Spectrum Analysis' },
      { url: cvdIshihara, caption: 'CVD Simulator — Ishihara Color Plate Assessment' },
      { url: cvdD15, caption: 'CVD Simulator — Farnsworth D15 Arrangement Test' },
      { url: cvdMosaic, caption: 'CVD Simulator — Color Mosaic Diagnostic Pattern' },
    ],
    color: '#22c55e',
  },
  {
    id: 'diabetes',
    name: 'Diabetes Risk Prediction System',
    tagline: 'ML diagnostic classifier with SMOTE-enhanced minority recall',
    problem:
      'Standard ML classifiers on imbalanced medical datasets suffer from high false-negative rates on at-risk patients.',
    solution:
      'Built an end-to-end ML pipeline applying SMOTE oversampling to boost minority-class diagnostic recall on the 768-record Pima Indians dataset.',
    outcomes: [
      '71.4% overall classification accuracy on benchmark clinical dataset',
      'Boosted minority-class recall from 58% to 67% via SMOTE oversampling',
      'Deployed interactive Streamlit app for real-time patient risk evaluation',
      'Feature importance analysis for clinical interpretability and diagnostic insight',
    ],
    pullMetrics: [
      { value: '71.4%', label: 'Model Accuracy' },
      { value: '58 → 67%', label: 'Recall via SMOTE' },
    ],
    stack: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit', 'SMOTE', 'Machine Learning'],
    demo: 'https://ai-diabetes-detection-by-himesh.streamlit.app/',
    source: '',
    screenshots: [
      { url: diabetesP1, caption: 'Diabetes Risk Classifier — Clinical Patient Input Interface' },
      { url: diabetesP2, caption: 'Diabetes Risk Classifier — Real-Time Risk Assessment & Output' },
      { url: diabetesP3, caption: 'Diabetes Risk Classifier — Feature Importance & Analytics' },
    ],
    color: '#f59e0b',
  },
]

const SKILLS_GROUPS = [
  { label: 'Backend & APIs', items: ['Python', 'Flask', 'REST APIs', 'SQLAlchemy', 'RBAC & Auth', 'Brevo SMTP'] },
  { label: 'Frontend', items: ['React', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'] },
  { label: 'Database & Storage', items: ['MySQL', 'SQLite', 'SQLAlchemy ORM', 'Cloudinary', 'Relational Design'] },
  { label: 'AI & Data Science', items: ['Scikit-learn', 'Pandas', 'NumPy', 'LightGBM', 'XGBoost', 'SMOTE', 'Feature Engineering'] },
  { label: 'Cloud & DevOps', items: ['Git', 'GitHub', 'Render', 'Streamlit', 'VS Code', 'Linux Basics'] },
  { label: 'Programming Languages', items: ['C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'SQL'] },
]

const ACHIEVEMENTS = [
  {
    stat: 'Intern',
    unit: 'IMD',
    label: 'Research & Development Intern',
    sub: 'India Meteorological Department — operational forecasting models',
    isNumeric: false,
  },
  {
    stat: '150+',
    unit: 'LeetCode',
    label: 'DSA Problem Solving',
    sub: 'Arrays, Trees, Graphs & Dynamic Programming algorithms',
    isNumeric: true,
  },
  {
    stat: '9.83',
    unit: 'CGPA',
    label: 'Academic Excellence',
    sub: 'KJSIT · Semesters II & IV · SGPA 10.0',
    isNumeric: true,
  },
  {
    stat: '96th',
    unit: '%ile',
    label: 'JEE Main 2024',
    sub: 'Top percentile nationwide among ~1.2 million candidates',
    isNumeric: true,
  },
  {
    stat: 'Completed',
    unit: '',
    label: 'Deloitte Data Analytics Job Simulation',
    sub: 'Data Analytics & Forensic Technology',
    isNumeric: false,
  },
  {
    stat: '100%',
    unit: 'Score',
    label: 'IIT Bombay Certified',
    sub: 'Python Spoken Tutorial Certification (100% Score) & Java (95%)',
    isNumeric: true,
  },
]

// ─── Hooks ─────────────────────────────────────────────────────────────────

function useScrollY() {
  const [y, setY] = useState(0)
  useEffect(() => {
    const fn = () => setY(window.scrollY)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return y
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [ids])
  return active
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function useTilt() {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth < 900) return
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    ref.current.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 6}deg) translateZ(10px)`
    ref.current.style.boxShadow = `${-x * 20}px ${y * 20}px 40px rgba(0,0,0,0.4), 0 0 40px rgba(6,182,212,0.05)`
  }, [])
  const onLeave = useCallback(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 900) return
    if (!ref.current) return
    ref.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
    ref.current.style.boxShadow = 'none'
  }, [])
  return { ref, onMove, onLeave }
}

// ─── Custom Cursor ─────────────────────────────────────────────────────────

type ClickBurst = {
  id: number
  x: number
  y: number
  particles: { dx: number; dy: number }[]
}

function CustomCursor() {
  const [clicks, setClicks] = useState<ClickBurst[]>([])

  useEffect(() => {
    const onClick = (e: globalThis.MouseEvent) => {
      const angles = [0, 45, 90, 135, 180, 225, 270, 315]
      const dist = 70
      const newClick: ClickBurst = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        particles: angles.map((a) => ({
          dx: Math.cos((a * Math.PI) / 180) * dist,
          dy: Math.sin((a * Math.PI) / 180) * dist,
        })),
      }
      setClicks((prev) => [...prev.slice(-4), newClick])
      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== newClick.id))
      }, 450)
    }

    window.addEventListener('pointerdown', onClick, { capture: true, passive: true })
    return () => {
      window.removeEventListener('pointerdown', onClick, { capture: true })
    }
  }, [])

  return (
    <>
      {clicks.map((c) => (
        <React.Fragment key={c.id}>
          <div
            className="pointer-events-none fixed top-0 left-0 z-[9997]"
            style={{
              left: c.x,
              top: c.y,
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: 24,
                height: 24,
                border: '1.5px solid #06b6d4',
                animation: 'cursorRingBurst 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                willChange: 'transform, opacity',
              }}
            />
          </div>
          {c.particles.map((p, idx) => {
            const pColor = idx % 2 === 0 ? '#06b6d4' : '#8b5cf6'
            return (
              <div
                key={idx}
                className="pointer-events-none fixed top-0 left-0 z-[9997] rounded-full"
                style={{
                  width: 6,
                  height: 6,
                  background: pColor,
                  boxShadow: `0 0 8px ${pColor}`,
                  left: c.x,
                  top: c.y,
                  ['--dx' as string]: `${p.dx}px`,
                  ['--dy' as string]: `${p.dy}px`,
                  animation: 'cursorParticleBurst 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                  willChange: 'transform, opacity',
                }}
              />
            )
          })}
        </React.Fragment>
      ))}
    </>
  )
}

// ─── Icons ─────────────────────────────────────────────────────────────────

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function LeetcodeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  )
}

function EmailIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  )
}

function ExternalLinkIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

const NAV_SECTIONS = ['projects', 'experience', 'achievements', 'skills', 'about', 'contact']

function Nav({ active }: { active: string }) {
  const scrollY = useScrollY()
  const scrolled = scrollY > 64

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Desktop floating pill nav — untouched */}
      <nav
        className="fixed top-5 left-1/2 z-50 hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full"
        style={{
          transform: 'translateX(-50%)',
          background: scrolled ? 'rgba(12,16,32,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          border: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
          transition: 'background 0.5s, border-color 0.5s, box-shadow 0.5s, backdrop-filter 0.5s',
        }}
      >
        {NAV_SECTIONS.map((s) => (
          <button
            key={s}
            onClick={() => go(s)}
            className="px-3.5 py-1.5 rounded-full text-sm capitalize transition-all duration-200 cursor-pointer"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              color: active === s ? '#06b6d4' : '#94a3b8',
              background: active === s ? 'rgba(6,182,212,0.1)' : 'transparent',
            }}
          >
            {s}
          </button>
        ))}
        <a
          href="mailto:himeshpopat2006@gmail.com"
          className="ml-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-85"
          style={{ background: '#06b6d4', color: '#0c1020', fontFamily: 'var(--font-body)' }}
        >
          Let's Connect
        </a>
      </nav>

      {/* Mobile top bar — minimal, since the bottom tab bar (see MobileTabBar)
          owns section navigation on mobile. A hamburger + full-screen drawer
          alongside a persistent bottom tab bar was two different nav patterns
          doing the same job — that inconsistency is exactly what a native app
          never does, so it's removed here in favor of one clear pattern. */}
      <div
        className="fixed top-0 left-0 right-0 z-50 md:hidden flex items-center justify-between px-5"
        style={{
          height: 56,
          background: scrolled ? 'rgba(10,14,26,0.92)' : 'rgba(10,14,26,0.55)',
          backdropFilter: 'blur(16px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
          transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 21,
            color: '#f1f5f9',
            letterSpacing: '-0.02em',
          }}
        >
          <span style={{ color: '#06b6d4' }}>H</span>P
        </span>
        <a
          href="mailto:himeshpopat2006@gmail.com"
          className="px-3 py-1 inline-flex items-center justify-center rounded-[12px] text-[11px] font-semibold active:scale-95 transition-transform duration-150 cursor-pointer"
          style={{ background: '#06b6d4', color: '#0c1020', fontFamily: 'var(--font-body)', minHeight: 27, height: 27 }}
        >
          Let's Connect
        </a>
      </div>
    </>
  )
}

// ─── Mobile Tab Bar ─────────────────────────────────────────────────────────
// A persistent bottom navigation bar, mobile-only — the pattern real native
// apps use, not a shrunk desktop nav. Each tab has its own minimal icon,
// scales down and lights up on press, and highlights the active section.

const TAB_ICONS: Record<string, (active: boolean) => ReactNode> = {
  about: (active) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#22d3ee' : '#64748b'} strokeWidth={2}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  ),
  experience: (active) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#22d3ee' : '#64748b'} strokeWidth={2}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  projects: (active) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#22d3ee' : '#64748b'} strokeWidth={2}>
      <polyline points="8 6 3 12 8 18" />
      <polyline points="16 6 21 12 16 18" />
    </svg>
  ),
  skills: (active) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#22d3ee' : '#64748b'} strokeWidth={2}>
      <rect x="6" y="6" width="12" height="12" rx="1" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </svg>
  ),
  achievements: (active) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#22d3ee' : '#64748b'} strokeWidth={2}>
      <path d="M8 21h8M12 17v4" />
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M5 5H3v1a4 4 0 0 0 4 4M19 5h2v1a4 4 0 0 1-4 4" />
    </svg>
  ),
  contact: (active) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#22d3ee' : '#64748b'} strokeWidth={2}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  ),
}

function MobileTabBar({ active }: { active: string }) {
  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex items-center justify-around px-2"
      style={{
        background: 'rgba(10,14,26,0.96)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        paddingTop: '3px',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1px)',
      }}
      aria-label="Section navigation"
    >
      {NAV_SECTIONS.map((s) => {
        const isActive = active === s
        return (
          <button
            key={s}
            onClick={() => go(s)}
            className="flex-1 min-w-0 flex flex-col items-center justify-center gap-1.5 py-1 px-1 transition-all duration-150 active:scale-95 text-center cursor-pointer"
            aria-label={s}
            aria-current={isActive ? 'true' : undefined}
          >
            <span
              className="flex items-center justify-center"
              style={{
                transform: isActive ? 'translateY(-1px) scale(1.08)' : 'scale(1)',
                filter: isActive ? 'drop-shadow(0 0 6px rgba(6,182,212,0.6))' : 'none',
                transition: 'transform 0.2s ease, filter 0.2s ease',
              }}
            >
              {TAB_ICONS[s]?.(isActive)}
            </span>
            <span
              className="capitalize truncate w-full text-center block"
              style={{
                fontSize: 'clamp(9.5px, 2.6vw, 10.5px)',
                fontFamily: 'var(--font-mono)',
                lineHeight: 1.1,
                letterSpacing: '0.01em',
                color: isActive ? '#38bdf8' : '#64748b',
                fontWeight: isActive ? 600 : 400,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {s}
            </span>
            <span
              style={{
                width: isActive ? 16 : 0,
                height: 3,
                borderRadius: 3,
                background: '#06b6d4',
                boxShadow: isActive ? '0 0 8px rgba(6,182,212,0.8)' : 'none',
                transition: 'width 0.2s ease, box-shadow 0.2s ease',
                marginTop: 1,
              }}
            />
          </button>
        )
      })}
    </nav>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────

function SocialPill({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: ReactNode
}) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
      style={{
        border: hov ? '1px solid rgba(6,182,212,0.5)' : '1px solid rgba(255,255,255,0.1)',
        color: hov ? '#06b6d4' : '#94a3b8',
        background: hov ? 'rgba(6,182,212,0.06)' : 'transparent',
        transform: hov ? 'scale(1.1)' : 'scale(1)',
      }}
    >
      {children}
    </a>
  )
}

function HeroAvatar() {
  // Scattered ambient particles around the avatar, each with its own size/drift timing
  const particles = [
    { top: '2%', left: '10%', size: 4, color: '#06b6d4', delay: '0s', dur: '6s' },
    { top: '85%', left: '4%', size: 3, color: '#8b5cf6', delay: '1.2s', dur: '7.5s' },
    { top: '10%', left: '92%', size: 3, color: '#f59e0b', delay: '0.6s', dur: '5.5s' },
    { top: '92%', left: '86%', size: 5, color: '#06b6d4', delay: '2s', dur: '8s' },
    { top: '48%', left: '-2%', size: 3, color: '#8b5cf6', delay: '1.6s', dur: '6.5s' },
    { top: '45%', left: '100%', size: 4, color: '#f59e0b', delay: '0.3s', dur: '7s' },
  ]

  return (
    <div className="relative flex items-center justify-center flex-shrink-0 avatar-float w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[425px] md:h-[425px] lg:w-[445px] lg:h-[445px]">
      {/* Ambient pulsing glow behind everything */}
      <div
        className="absolute rounded-full avatar-glow-pulse w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] md:w-[495px] md:h-[495px] lg:w-[515px] lg:h-[515px]"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, rgba(139,92,246,0.09) 45%, transparent 72%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Drifting ambient particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full avatar-particle"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 8px ${p.color}`,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        />
      ))}

      {/* Outer slow ring */}
      <div
        className="absolute rounded-full animate-spin-slow"
        style={{ inset: 6, background: 'conic-gradient(from 0deg, #06b6d4, #8b5cf6, #0c1020 60%, #06b6d4)', padding: 2 }}
      >
        <div className="w-full h-full rounded-full" style={{ background: '#0c1020' }} />
      </div>

      {/* A second, thinner ring */}
      <div
        className="absolute rounded-full animate-spin-reverse"
        style={{
          inset: 0,
          border: '1px dashed rgba(6,182,212,0.25)',
        }}
      />

      {/* Inner circle with Avatar image */}
      <div
        className="relative z-10 rounded-full overflow-hidden flex items-center justify-center w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[375px] md:h-[375px] lg:w-[390px] lg:h-[390px]"
        style={{
          border: '2px solid rgba(6,182,212,0.4)',
          boxShadow: '0 0 32px rgba(6,182,212,0.28)',
        }}
      >
        <img
          src={avatarImg}
          alt="Himesh Popat"
          className="w-full h-full object-cover object-top"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Faster orbiting dot */}
      <div className="absolute inset-0 rounded-full animate-spin-fast">
        <div
          className="absolute top-0 left-1/2 rounded-full"
          style={{
            width: 10,
            height: 10,
            background: '#8b5cf6',
            boxShadow: '0 0 12px #8b5cf6',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Static accent dot at bottom-right */}
      <div
        className="absolute bottom-3 right-3 rounded-full"
        style={{ width: 16, height: 16, background: '#06b6d4', boxShadow: '0 0 16px #06b6d4', opacity: 0.8 }}
      />
    </div>
  )
}

function Hero() {
  return (
    <section className="relative min-h-[88vh] md:min-h-screen flex items-center justify-center overflow-hidden" id="hero">
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Animated aurora */}
      <div className="absolute pointer-events-none aurora-blob aurora-cyan" />
      <div className="absolute pointer-events-none aurora-blob aurora-violet" />
      <div className="absolute pointer-events-none aurora-blob aurora-amber" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 pt-20 pb-10 md:pt-28 md:pb-20">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-8">
          {/* Text content */}
          <div className="flex-1 min-w-0 text-center md:text-left">
            <div className="hero-stage-1 inline-flex items-center gap-2 mb-4 max-w-full">
              <span
                className="inline-flex items-center gap-2 text-[10.5px] xs:text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded-full whitespace-nowrap max-w-full truncate"
                style={{
                  background: 'rgba(6,182,212,0.08)',
                  color: '#06b6d4',
                  border: '1px solid rgba(6,182,212,0.18)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: '#06b6d4', animation: 'pulse 1.8s ease-in-out infinite' }}
                />
                <span className="truncate">Software Engineer · Mumbai, India</span>
              </span>
            </div>

            <h1
              className="hero-stage-2 font-bold leading-tight md:leading-none mb-3 max-md:whitespace-nowrap text-[clamp(2.2rem,8.5vw,3.2rem)] md:text-[clamp(2.4rem,8vw,5.5rem)]"
              style={{
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.035em',
                color: '#f1f5f9',
              }}
            >
              Himesh <br className="hidden md:block" />
              <span style={{ color: '#06b6d4' }}>Popat</span>
            </h1>

            <h2
              className="hero-stage-2 font-semibold mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.65rem)',
                color: '#cbd5e1',
                lineHeight: 1.35,
                letterSpacing: '-0.015em',
              }}
            >
              Building production-ready software &amp; intelligent systems.
            </h2>

            <p
              className="hero-stage-3 text-base max-w-xl mx-auto md:mx-0 mb-6"
              style={{
                color: '#94a3b8',
                fontFamily: 'var(--font-body)',
                lineHeight: 1.7,
              }}
            >
              Specializing in full-stack web applications, scalable backend architecture, and production-ready AI/ML pipelines engineered for real-world impact.
            </p>

            {/* Achievement Badges — Vertical Stack (1 per row) on Mobile, Horizontal Row on Desktop */}
            <div className="hero-stage-3 flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 mb-7 w-auto mx-auto md:mx-0">
              {[
                { val: '9.83 CGPA', detail: 'KJSIT' },
                { val: 'R&D Intern', detail: 'IMD Mumbai' },
                { val: '150+ Solved', detail: 'LeetCode' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="w-[215px] md:w-auto h-9 min-h-[36px] inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#f59e0b' }}>
                    {item.val}
                  </span>
                  <span style={{ color: '#64748b', fontSize: 11.5 }}>· {item.detail}</span>
                </div>
              ))}
            </div>

            <div className="hero-stage-4 flex flex-row items-center gap-3 mb-8 justify-center md:justify-start w-full md:w-auto">
              <a
                href="mailto:himeshpopat2006@gmail.com"
                className="flex-1 md:flex-initial min-h-[48px] inline-flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-full font-semibold text-xs xs:text-sm whitespace-nowrap transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                style={{ background: '#06b6d4', color: '#0c1020', fontFamily: 'var(--font-body)' }}
              >
                <EmailIcon size={16} />
                Get in touch
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="flex-1 md:flex-initial min-h-[48px] inline-flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-full font-semibold text-xs xs:text-sm whitespace-nowrap transition-all duration-200 hover:bg-white/5"
                style={{
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: '#e2e8f0',
                  fontFamily: 'var(--font-body)',
                }}
              >
                View work
                <ExternalLinkIcon size={14} />
              </a>
            </div>

            <div className="hero-stage-5 flex items-center gap-2.5 justify-center md:justify-start">
              <SocialPill href="https://github.com/Himeshpopat" label="Himesh Popat on GitHub">
                <GithubIcon />
              </SocialPill>
              <SocialPill href="https://linkedin.com/in/himesh-popat" label="Himesh Popat on LinkedIn">
                <LinkedinIcon />
              </SocialPill>
              <SocialPill href="https://leetcode.com/u/himesh_popat" label="himesh_popat on LeetCode">
                <LeetcodeIcon />
              </SocialPill>
              <SocialPill href="mailto:himeshpopat2006@gmail.com" label="Email Himesh Popat">
                <EmailIcon />
              </SocialPill>
            </div>
          </div>

          {/* Avatar */}
          <div className="hero-stage-2 flex-shrink-0">
            <HeroAvatar />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="hero-stage-6 absolute bottom-20 md:bottom-8 left-1/2 flex flex-col items-center gap-2"
        style={{ transform: 'translateX(-50%)', animation: 'drift 3s ease-in-out infinite' }}
      >
        <span
          style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#334155', letterSpacing: '0.2em' }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: 1,
            height: 44,
            background: 'linear-gradient(to bottom, rgba(6,182,212,0.5), transparent)',
          }}
        />
      </div>
    </section>
  )
}

// ─── Shared section primitives ─────────────────────────────────────────────

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5 md:mb-12">
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: '#06b6d4',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        {children}
      </span>
      <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
    </div>
  )
}

function FadeSection({
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
    <div
      ref={ref}
      id={id}
      className={`${noPad ? '' : 'max-w-6xl mx-auto px-5 py-6 md:py-14'} ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.75s ease, transform 0.75s ease',
      }}
    >
      {children}
    </div>
  )
}

// ─── About ─────────────────────────────────────────────────────────────────

function About() {
  return (
    <FadeSection id="about">
      <SectionLabel>About</SectionLabel>
      <div className="grid md:grid-cols-[3fr_2fr] gap-10 md:gap-14 items-start">
        <div className="space-y-5">
          <h2
            className="font-bold leading-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              letterSpacing: '-0.025em',
              color: '#f1f5f9',
            }}
          >
            Engineering software with rigor, clarity, and real-world impact.
          </h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.75, fontFamily: 'var(--font-body)', fontSize: 15 }}>
            I'm Himesh, an Information Technology student at KJ Somaiya Institute of Technology, Mumbai (CGPA 9.83). I approach software engineering as the discipline of transforming complex operational problems into clean, reliable, and high-performance software solutions.
          </p>
          <p style={{ color: '#94a3b8', lineHeight: 1.75, fontFamily: 'var(--font-body)', fontSize: 15 }}>
            My interests span data structures & algorithms, problem solving, full-stack web development, scalable backend systems, RESTful API architecture, and production-ready machine learning pipelines. From digitizing B2B wholesale workflows to benchmarking ML regression models on 297K+ meteorological records, I focus on building maintainable systems backed by rigorous evaluation and measurable impact.
          </p>
        </div>

        {/* Education card */}
        <div
          data-card
          className="rounded-2xl p-6"
          style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: '#06b6d4',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Education
          </p>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 16,
              color: '#f1f5f9',
              lineHeight: 1.4,
              marginBottom: 4,
            }}
          >
            KJ Somaiya Institute of Technology
          </h3>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 2, fontFamily: 'var(--font-body)' }}>
            B.Tech — Information Technology
          </p>
          <p style={{ color: '#475569', fontSize: 13, fontFamily: 'var(--font-body)', marginBottom: 20 }}>
            Sep 2024 – Jun 2028 · Mumbai, India
          </p>
          <div
            className="pt-5"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-baseline gap-2 mb-1">
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 36,
                  fontWeight: 700,
                  color: '#f59e0b',
                  lineHeight: 1,
                }}
              >
                9.83
              </span>
              <span style={{ color: '#64748b', fontSize: 13 }}>CGPA</span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#475569', letterSpacing: '0.1em' }}>
              Semesters II &amp; IV · SGPA 10.0
            </p>
          </div>
        </div>
      </div>
    </FadeSection>
  )
}

// ─── Experience ─────────────────────────────────────────────────────────────

function Experience() {
  return (
    <FadeSection id="experience">
      <SectionLabel>Experience</SectionLabel>
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(255,255,255,0.07)', background: '#111827' }}
      >
        {/* Header */}
        <div
          className="px-5 md:px-10 pt-7 md:pt-8 pb-6"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between text-center md:text-left gap-3 md:gap-4">
            <div className="flex flex-col items-center md:items-start w-full md:w-auto">
              {/* Badge row — Same Row on Mobile */}
              <div className="flex flex-row items-center justify-center md:justify-start gap-2 mb-3.5 w-full md:w-auto">
                <span
                  className="inline-block px-2.5 py-0.5 md:px-3 md:py-1 rounded-md text-[9.5px] xs:text-[10.5px] md:text-xs font-mono tracking-widest uppercase whitespace-nowrap flex-shrink-0"
                  style={{
                    background: 'rgba(6,182,212,0.1)',
                    color: '#06b6d4',
                    border: '1px solid rgba(6,182,212,0.2)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  Active Internship
                </span>
                <span
                  className="inline-block px-2.5 py-0.5 md:px-3 md:py-1 rounded-md text-[9.5px] xs:text-[10.5px] md:text-xs font-mono tracking-wider uppercase text-slate-400 whitespace-nowrap flex-shrink-0"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  Government of India
                </span>
              </div>
              <h3
                className="mb-1.5 md:mb-1"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.35rem, 3vw, 2rem)',
                  color: '#f1f5f9',
                  letterSpacing: '-0.02em',
                }}
              >
                Research & Development Intern
              </h3>
              <p className="mb-2 md:mb-0" style={{ color: '#06b6d4', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 13.5 }}>
                India Meteorological Department (IMD) · Mumbai, India
              </p>
            </div>
            <p
              className="text-center md:text-right w-full md:w-auto mt-1 md:mt-0"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12.5,
                color: '#64748b',
                whiteSpace: 'nowrap',
              }}
            >
              Jun 2026 – Present
            </p>
          </div>
        </div>

        {/* Key metrics */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.06)' }}
        >
          {[
            { prefix: null, value: '297K+', label: 'Meteorological Records' },
            { prefix: 'R²', value: '0.9955', label: 'Temperature Model' },
            { prefix: 'R²', value: '0.9817', label: 'Rel. Humidity Model' },
            { prefix: null, value: '6 Models', label: 'Tested & Evaluated' },
          ].map((m) => (
            <div
              key={m.label}
              className="px-4 md:px-5 py-5 text-center"
              style={{ background: '#111827' }}
            >
              <div
                className="flex items-baseline justify-center gap-1.5 flex-wrap"
                style={{ marginBottom: 6 }}
              >
                {m.prefix && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      fontSize: 12,
                      color: 'rgba(245,158,11,0.7)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {m.prefix}
                  </span>
                )}
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
                    color: '#f59e0b',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {m.value}
                </span>
              </div>
              <div style={{ color: '#64748b', fontSize: 12, fontFamily: 'var(--font-mono)' }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Detail bullets */}
        <div className="px-6 md:px-10 py-7 space-y-3">
          {[
            'Engineered automated data preprocessing and feature-engineering pipeline for 297K+ historical meteorological records incorporating time-lag and rolling statistical features.',
            'Benchmarked six machine learning regression architectures (including LightGBM and XGBoost) using chronological split validation to prevent temporal data leakage.',
            'Achieved R² of 0.9955 for temperature forecasting and R² of 0.9817 for relative humidity on unseen operational holdout data.',
            'Optimized model inference latency and feature extraction workflows to support operational forecasting needs.',
            'Integrated trained regression models into an interactive forecasting dashboard for real-time meteorological visualization.',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span
                className="font-bold text-xs mt-0.5"
                style={{ color: '#06b6d4' }}
              >
                ✓
              </span>
              <p style={{ color: '#94a3b8', fontSize: 13.5, lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div
          className="px-6 md:px-10 pb-7 flex flex-wrap gap-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <div className="w-full pt-5 pb-1">
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#475569', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Tech Stack
            </p>
          </div>
          {['LightGBM', 'XGBoost', 'Scikit-learn', 'Pandas', 'Python', 'Feature Engineering', 'Time-Series CV'].map(
            (t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full text-xs font-mono"
                style={{
                  background: 'rgba(139,92,246,0.08)',
                  color: '#8b5cf6',
                  border: '1px solid rgba(139,92,246,0.18)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {t}
              </span>
            ),
          )}
        </div>
      </div>
    </FadeSection>
  )
}

// ─── Projects ──────────────────────────────────────────────────────────────

// ─── ProjectVisualMockup ───────────────────────────────────────────────────

// ─── ProjectScreenshotCarousel ──────────────────────────────────────────────

function ProjectScreenshotCarousel({
  screenshots,
  title,
  color,
}: {
  screenshots: { url: string; caption: string }[]
  title: string
  color: string
}) {
  const validScreenshots = useMemo(
    () => (Array.isArray(screenshots) ? screenshots.filter((s) => Boolean(s && s.url)) : []),
    [screenshots],
  )
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const count = validScreenshots.length
  const safeIndex = count > 0 ? ((index % count) + count) % count : 0

  useEffect(() => {
    if (isPaused || count <= 1) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % count)
    }, 4500)
    return () => clearInterval(timer)
  }, [isPaused, count])

  const goNext = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setIsPaused(true)
    if (count <= 1) return
    setIndex((prev) => (prev + 1) % count)
  }

  const goPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setIsPaused(true)
    if (count <= 1) return
    setIndex((prev) => (prev - 1 + count) % count)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const diff = touchStartX.current - touchEndX.current
    if (diff > 40) goNext()
    if (diff < -40) goPrev()
    touchStartX.current = 0
    touchEndX.current = 0
  }

  if (count === 0) return null

  const currentScreenshot = validScreenshots[safeIndex]

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden mb-6 border border-white/10 group select-none"
      style={{
        background: '#0b0f19',
        boxShadow: `0 12px 36px ${color}12, 0 4px 20px rgba(0,0,0,0.5)`,
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Browser Window Header */}
      <div className="px-3 py-2 bg-black/65 border-b border-white/5 flex items-center justify-between z-20 relative">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-rose-500/80 flex-shrink-0" />
          <span className="w-2 h-2 rounded-full bg-amber-500/80 flex-shrink-0" />
          <span className="w-2 h-2 rounded-full bg-emerald-500/80 flex-shrink-0" />
          <span className="ml-1.5 font-mono text-[10.5px] text-slate-400 truncate max-w-[170px] sm:max-w-none">
            {currentScreenshot?.caption || title}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          <span
            className="text-[9.5px] font-mono px-1.5 py-0.5 rounded"
            style={{
              background: `${color}15`,
              color: color,
              border: `1px solid ${color}30`,
            }}
          >
            {safeIndex + 1} / {count}
          </span>
        </div>
      </div>

      {/* Image Viewport Frame — Absolutely Layered Slides */}
      <div className="relative w-full h-[210px] xs:h-[245px] sm:h-[310px] md:h-[420px] bg-slate-950/90 overflow-hidden">
        {validScreenshots.map((s, idx) => {
          const isActive = idx === safeIndex
          return (
            <div
              key={s.url || idx}
              className="absolute inset-0 flex items-center justify-center p-1 xs:p-1.5 sm:p-3 transition-opacity duration-500 ease-in-out"
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 10 : 0,
                pointerEvents: isActive ? 'auto' : 'none',
              }}
            >
              <img
                src={s.url}
                alt={`${title} - ${s.caption}`}
                loading="eager"
                className="max-w-full max-h-full w-auto h-auto object-contain object-center rounded shadow-lg"
              />
            </div>
          )
        })}

        {/* Navigation Arrows */}
        {count > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label="Previous screenshot"
              className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white flex items-center justify-center text-xs md:text-lg leading-none transition-all opacity-95 md:opacity-70 group-hover:opacity-100 hover:scale-105 hover:bg-black/90 active:scale-95 z-30 cursor-pointer"
            >
              ‹
            </button>
            <button
              onClick={goNext}
              aria-label="Next screenshot"
              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white flex items-center justify-center text-xs md:text-lg leading-none transition-all opacity-95 md:opacity-70 group-hover:opacity-100 hover:scale-105 hover:bg-black/90 active:scale-95 z-30 cursor-pointer"
            >
              ›
            </button>
          </>
        )}

        {/* Pagination Dots */}
        {count > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 z-30">
            {validScreenshots.map((_, posIdx) => (
              <button
                key={posIdx}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsPaused(true)
                  setIndex(posIdx)
                }}
                aria-label={`Go to screenshot ${posIdx + 1}`}
                className="transition-all duration-300 rounded-full cursor-pointer p-2.5 -m-2.5 md:p-0 md:m-0 flex items-center justify-center"
              >
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: posIdx === safeIndex ? 14 : 5,
                    height: 5,
                    background: posIdx === safeIndex ? color : 'rgba(255,255,255,0.3)',
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  const { ref, onMove, onLeave } = useTilt()
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      ref={ref}
      data-card
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="rounded-2xl overflow-hidden h-full flex flex-col justify-between"
      style={{
        background: '#111827',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'transform 0.15s ease',
        willChange: 'transform',
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          height: 3,
          background: `linear-gradient(to right, ${project.color}, transparent 70%)`,
        }}
      />

      <div className="p-3.5 xs:p-4 sm:p-6 md:p-8 flex flex-col flex-1 justify-between">
        <div>
          {/* 1. Project Title & Tagline */}
          <div className="mb-6 md:mb-3 text-center md:text-left">
            <h3
              className="mb-3 md:mb-1"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)',
                color: '#f1f5f9',
                letterSpacing: '-0.015em',
                lineHeight: 1.3,
                wordBreak: 'break-word',
              }}
            >
              {project.name}
            </h3>
            <p
              style={{
                color: project.color,
                fontSize: 12.5,
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
              }}
            >
              {project.tagline}
            </p>
          </div>

          {/* 2. Screenshot Carousel */}
          <div className="mb-6 md:mb-0">
            <ProjectScreenshotCarousel
              screenshots={project.screenshots}
              title={project.name}
              color={project.color}
            />
          </div>

          {/* 3. Compact Metrics Row — Mobile Only (One Row) */}
          <div className="grid grid-cols-2 gap-2 mb-6 md:hidden">
            {project.pullMetrics.map((m) => (
              <div
                key={m.label}
                className="rounded-lg p-2 text-center"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: project.color,
                    lineHeight: 1.15,
                  }}
                >
                  {m.value}
                </div>
                <div className="truncate" style={{ color: '#64748b', fontSize: 10, fontFamily: 'var(--font-mono)' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* 4. Tech Stack Badges — Mobile Only */}
          <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 mb-6 md:hidden">
            {project.stack.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-full text-[10.5px] font-mono"
                style={{
                  background: `${project.color}12`,
                  color: project.color,
                  border: `1px solid ${project.color}25`,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* 5. Expandable Details (Problem, Solution & Highlights) */}
        <div className={`${expanded ? 'block' : 'hidden'} md:!block`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div
              className="rounded-xl p-3"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: '#64748b',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 3,
                }}
              >
                Problem
              </p>
              <p style={{ color: '#cbd5e1', fontSize: 12.5, lineHeight: 1.55, fontFamily: 'var(--font-body)' }}>
                {project.problem}
              </p>
            </div>
            <div
              className="rounded-xl p-3"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: '#64748b',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 3,
                }}
              >
                Solution
              </p>
              <p style={{ color: '#cbd5e1', fontSize: 12.5, lineHeight: 1.55, fontFamily: 'var(--font-body)' }}>
                {project.solution}
              </p>
            </div>
          </div>

          <div className="mb-4 space-y-2">
            {project.outcomes.map((o, i) => (
              <div key={i} className="flex items-start gap-2">
                <span
                  className="flex-shrink-0 font-bold text-xs mt-0.5"
                  style={{ color: project.color }}
                >
                  ✓
                </span>
                <p style={{ color: '#94a3b8', fontSize: 12.5, lineHeight: 1.55, fontFamily: 'var(--font-body)' }}>
                  {o}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Expand Toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="md:hidden w-full min-h-[38px] flex items-center justify-center gap-1.5 mb-6 rounded-lg text-[11px] font-mono active:scale-[0.98] transition-all cursor-pointer"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            color: project.color,
          }}
        >
          {expanded ? 'Hide details' : 'View problem, solution & highlights'}
          <span style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
            ↓
          </span>
        </button>

        {/* Desktop-only Metrics & Stack footer — Untouched on Desktop */}
        <div className="hidden md:flex flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
          <div className="flex gap-6 flex-shrink-0">
            {project.pullMetrics.map((m) => (
              <div key={m.label}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    color: project.color,
                    lineHeight: 1.1,
                  }}
                >
                  {m.value}
                </div>
                <div style={{ color: '#64748b', fontSize: 11, fontFamily: 'var(--font-mono)' }}>{m.label}</div>
              </div>
            ))}
          </div>

          <div className="flex-1 flex flex-col items-end text-right">
            <span
              className="text-[10px] font-mono font-semibold tracking-widest text-slate-400 uppercase mb-1.5"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              TECH STACK
            </span>
            <div className="flex flex-wrap items-center justify-end gap-x-2 gap-y-1.5">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full text-xs font-mono whitespace-nowrap"
                  style={{
                    background: `${project.color}12`,
                    color: project.color,
                    border: `1px solid ${project.color}25`,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 6. Action Buttons — Side by Side on ONE Row */}
        <div className="flex flex-row items-center gap-2.5 pt-3 mt-1 w-full border-t border-white/5 md:border-t-0 md:pt-0 md:mt-6.5">
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 rounded-lg text-xs font-semibold font-mono whitespace-nowrap transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{
                background: project.color,
                color: '#0c1020',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <ExternalLinkIcon size={14} />
              Live Demo
            </a>
          ) : null}

          {project.source ? (
            <a
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 rounded-lg text-xs font-semibold font-mono whitespace-nowrap transition-all duration-200 hover:opacity-90"
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: '#f1f5f9',
                border: '1px solid rgba(255,255,255,0.1)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <GithubIcon size={14} />
              Source Code
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const { ref, visible } = useInView()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const handleScroll = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const cardWidth = el.scrollWidth / PROJECTS.length
    const idx = Math.round(el.scrollLeft / cardWidth)
    setActiveIdx(Math.max(0, Math.min(PROJECTS.length - 1, idx)))
  }, [])

  const scrollToIdx = (idx: number) => {
    const el = scrollerRef.current
    if (!el) return
    const cardWidth = el.scrollWidth / PROJECTS.length
    el.scrollTo({ left: cardWidth * idx, behavior: 'smooth' })
  }

  return (
    <div
      ref={ref}
      id="projects"
      className="pt-16 pb-8 md:py-14"
      style={{
        background: 'rgba(255,255,255,0.012)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.75s ease, transform 0.75s ease',
      }}
    >
      <div className="max-w-6xl mx-auto md:px-6">
        <div className="px-6 md:px-0">
          <SectionLabel>Projects</SectionLabel>
          <div className="mb-6 md:mb-10">
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                color: '#f1f5f9',
                letterSpacing: '-0.03em',
              }}
            >
              Featured Projects
            </h2>
            <p style={{ color: '#94a3b8', marginTop: 6, fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6 }}>
              Production-ready applications engineered with scalable architecture, performance optimization, and measurable impact.
            </p>
          </div>
        </div>

        {/* Mobile: horizontal swipe carousel */}
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-2 no-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {PROJECTS.map((p) => (
            <div key={p.id} className="flex-shrink-0 w-[87vw] snap-center">
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
        <div className="flex md:hidden items-center justify-center gap-2 mt-5">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => scrollToIdx(i)}
              aria-label={`Go to ${p.name}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: activeIdx === i ? 20 : 6,
                height: 6,
                background: activeIdx === i ? '#06b6d4' : 'rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>
        <p
          className="md:hidden text-center mt-3"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#334155', letterSpacing: '0.12em' }}
        >
          ← SWIPE →
        </p>

        <div className="hidden md:block space-y-6 px-0">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── SkillChip with hover/focus state ─────────────────────────────────────

function SkillChip({ children }: { children: ReactNode }) {
  const [hov, setHov] = useState(false)
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
      style={{
        background: hov ? 'rgba(6,182,212,0.1)' : 'rgba(255,255,255,0.05)',
        color: hov ? '#06b6d4' : '#cbd5e1',
        border: hov ? '1px solid rgba(6,182,212,0.25)' : '1px solid transparent',
        fontFamily: 'var(--font-body)',
        userSelect: 'none',
      }}
    >
      {children}
    </span>
  )
}

function MagneticChipRow({ items }: { items: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chipRefs = useRef<(HTMLSpanElement | null)[]>([])
  const rafRef = useRef<number | null>(null)

  const handleMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const clientX = e.clientX
    const clientY = e.clientY
    rafRef.current = requestAnimationFrame(() => {
      chipRefs.current.forEach((chip) => {
        if (!chip) return
        const rect = chip.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = cx - clientX
        const dy = cy - clientY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const radius = 70
        if (dist < radius) {
          const force = (1 - dist / radius) * 14
          const angle = Math.atan2(dy, dx)
          chip.style.transform = `translate(${Math.cos(angle) * force}px, ${Math.sin(angle) * force}px)`
        } else {
          chip.style.transform = 'translate(0px, 0px)'
        }
      })
    })
  }, [])

  const handleLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    chipRefs.current.forEach((chip) => {
      if (chip) chip.style.transform = 'translate(0px, 0px)'
    })
  }, [])

  return (
    <div ref={containerRef} className="flex flex-wrap gap-2.5 sm:gap-3 items-center justify-center md:justify-start" onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {items.map((skill, i) => (
        <span
          key={skill}
          ref={(el) => {
            chipRefs.current[i] = el
          }}
          style={{ transition: 'transform 0.15s ease-out', display: 'inline-block' }}
        >
          <SkillChip>{skill}</SkillChip>
        </span>
      ))}
    </div>
  )
}

// ─── Skills ────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <FadeSection id="skills">
      <SectionLabel>Skills</SectionLabel>
      <h2
        className="mb-3"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          color: '#f1f5f9',
          letterSpacing: '-0.03em',
        }}
      >
        Technical Skills
      </h2>
      <p className="text-slate-400 text-sm mb-8 max-w-xl" style={{ fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
        Capability-based toolkit ordered by core proficiency, engineering focus, and production experience.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 items-stretch">
        {SKILLS_GROUPS.map((group) => (
          <div
            key={group.label}
            className="rounded-xl sm:rounded-2xl p-4 md:p-5 flex flex-col justify-start h-full"
            style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="mb-3.5 flex items-center">
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#06b6d4',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}
              >
                {group.label}
              </p>
            </div>
            {/* Vercel/Linear-style compact badge layout */}
            <div className="flex flex-wrap items-center justify-start gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-md text-xs font-mono whitespace-nowrap transition-all duration-200 hover:scale-[1.03] hover:border-cyan-400/40 hover:bg-cyan-500/15 cursor-default select-none inline-flex items-center"
                  style={{
                    background: 'rgba(6,182,212,0.06)',
                    color: '#e2e8f0',
                    border: '1px solid rgba(6,182,212,0.16)',
                    fontFamily: 'var(--font-mono)',
                    height: 28,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full mr-1.5 flex-shrink-0" style={{ background: '#06b6d4' }} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </FadeSection>
  )
}

// ─── Currently Learning ───────────────────────────────────────────────────

function CurrentlyLearning() {
  const items = [
    {
      name: 'Data Structures & Algorithms',
      desc: 'Advanced problem solving, graph algorithms, dynamic programming & optimization',
      color: '#06b6d4',
      tag: 'Core CS',
    },
    {
      name: 'Artificial Intelligence & Machine Learning',
      desc: 'Predictive modeling, neural architectures & ML pipeline development',
      color: '#8b5cf6',
      tag: 'AI / ML',
    },
    {
      name: 'Aptitude',
      desc: 'Quantitative reasoning, analytical speed & logical problem solving',
      color: '#f59e0b',
      tag: 'Analytical',
    },
    {
      name: 'MERN Stack',
      desc: 'MongoDB, Express.js, React & Node.js end-to-end web applications',
      color: '#10b981',
      tag: 'Full-Stack',
    },
  ]

  return (
    <FadeSection id="learning">
      <SectionLabel>Currently Expanding</SectionLabel>
      <div className="mb-6">
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            color: '#f1f5f9',
            letterSpacing: '-0.03em',
          }}
        >
          Active Learning Focus
        </h2>
        <p style={{ color: '#94a3b8', fontSize: 14, marginTop: 4, fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
          Technologies &amp; concepts I am actively mastering to deepen backend and architectural depth.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.name}
            data-card
            className="rounded-xl p-3 xs:p-3.5 sm:p-4 transition-all duration-200 hover:border-cyan-500/30"
            style={{
              background: '#111827',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div className="flex items-center justify-between gap-1.5 mb-2">
              <span
                className="font-display font-bold text-xs xs:text-sm text-slate-100 flex-1 min-w-0"
              >
                {item.name}
              </span>
              <span
                className="text-[9.5px] xs:text-[10px] font-mono uppercase px-1.5 xs:px-2 py-0.5 rounded whitespace-nowrap flex-shrink-0"
                style={{
                  background: `${item.color}14`,
                  color: item.color,
                  border: `1px solid ${item.color}25`,
                }}
              >
                {item.tag}
              </span>
            </div>
            <p style={{ color: '#64748b', fontSize: 12, lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </FadeSection>
  )
}

// ─── AchievementCard with hover lift ──────────────────────────────────────

type AchievementItem = (typeof ACHIEVEMENTS)[0]

function AchievementCard({ a }: { a: AchievementItem }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="rounded-xl md:rounded-2xl p-3 xs:p-3.5 md:p-6 flex flex-col justify-between h-full min-w-0 box-border overflow-hidden"
      style={{
        background: '#111827',
        border: hov ? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(255,255,255,0.07)',
        transform: hov ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hov ? '0 12px 32px rgba(0,0,0,0.35)' : 'none',
        transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
      }}
    >
      <div>
        {(a.stat || a.unit) ? (
          <div className="flex items-baseline gap-1.5 mb-1 md:mb-2 flex-wrap">
            {a.stat && (
              <span
                className="font-mono font-extrabold text-xl xs:text-2xl md:text-[clamp(1.8rem,3.2vw,2.4rem)] leading-none"
                style={{
                  color: a.isNumeric ? '#f59e0b' : '#06b6d4',
                }}
              >
                {a.stat}
              </span>
            )}
            {a.unit && (
              <span
                className="font-mono text-[10px] xs:text-[11px] md:text-xs text-slate-400 font-semibold uppercase tracking-wider"
              >
                {a.unit}
              </span>
            )}
          </div>
        ) : null}
        <p
          className="font-display font-bold text-xs xs:text-sm md:text-base text-slate-100 leading-snug mb-1 md:mb-1.5"
        >
          {a.label}
        </p>
      </div>
      <p className="text-slate-400 text-[11px] xs:text-[12px] md:text-xs font-sans leading-relaxed mt-auto">
        {a.sub}
      </p>
    </div>
  )
}

// ─── Achievements ──────────────────────────────────────────────────────────

function Achievements() {
  return (
    <FadeSection id="achievements">
      <SectionLabel>Achievements</SectionLabel>
      <h2
        className="mb-2 md:mb-3"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          color: '#f1f5f9',
          letterSpacing: '-0.03em',
        }}
      >
        Achievements
      </h2>
      <p className="text-slate-400 text-xs sm:text-sm mb-5 md:mb-8 max-w-xl" style={{ fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
        Quantifiable academic performance, competitive problem solving, and technical recognitions.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4">
        {ACHIEVEMENTS.map((a, i) => (
          <AchievementCard key={i} a={a} />
        ))}
      </div>
    </FadeSection>
  )
}

// ─── GitHub Showcase ───────────────────────────────────────────────────────

function GithubShowcase() {
  const repos = [
    {
      name: 'Veloxa',
      desc: 'Full-stack B2B wholesale ordering platform with RBAC, OTP auth & Brevo SMTP integration.',
      lang: 'Python / Flask',
      langColor: '#3572A5',
      stars: 'Featured',
      link: 'https://github.com/Himeshpopat/Veloxa',
    },
    {
      name: 'Color Blindness Detection System',
      desc: 'Real-time CVD simulation REST API utilizing optimized NumPy pixel-matrix transforms.',
      lang: 'Python / NumPy',
      langColor: '#f1e05a',
      stars: 'Featured',
      link: 'https://github.com/Himeshpopat/Color-Blindness-Detection-System',
    },
  ]

  return (
    <FadeSection id="github">
      <SectionLabel>Open Source</SectionLabel>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: '#f1f5f9',
              letterSpacing: '-0.03em',
            }}
          >
            GitHub Activity &amp; Repositories
          </h2>
          <p style={{ color: '#94a3b8', marginTop: 4, fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6 }}>
            Explore open-source projects, algorithm implementations, and software repositories.
          </p>
        </div>
        <a
          href="https://github.com/Himeshpopat"
          target="_blank"
          rel="noopener noreferrer"
          className="self-center md:self-auto w-fit inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-200 hover:bg-cyan-500/10"
          style={{
            background: 'rgba(6,182,212,0.06)',
            color: '#06b6d4',
            border: '1px solid rgba(6,182,212,0.2)',
          }}
        >
          <GithubIcon size={14} />
          github.com/Himeshpopat
        </a>
      </div>

      {/* GitHub Quick Stats Grid */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-6 w-full max-w-full">
        {[
          { label: 'LeetCode Solved', val: '150+' },
          { label: 'Primary Languages', val: 'C++ · Py' },
          { label: 'Public Repositories', val: '6' },
        ].map((stat, i) => (
          <div
            key={i}
            className="rounded-xl p-2.5 xs:p-3 sm:p-3.5 text-center min-w-0 overflow-hidden box-border"
            style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div
              className="text-xs xs:text-sm sm:text-base font-mono font-bold leading-snug break-words"
              style={{
                fontFamily: 'var(--font-mono)',
                color: '#f59e0b',
                marginBottom: 2,
              }}
            >
              {stat.val}
            </div>
            <div className="text-[9.5px] xs:text-[10px] sm:text-xs leading-snug break-words" style={{ color: '#64748b', fontFamily: 'var(--font-mono)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Repo Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-full">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.link}
            target="_blank"
            rel="noopener noreferrer"
            data-card
            className="rounded-xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:border-white/20 hover:-translate-y-1 w-full max-w-full box-border overflow-hidden"
            style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="w-full max-w-full min-w-0">
              <div className="flex items-center justify-between gap-2 mb-2 w-full max-w-full min-w-0">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <GithubIcon size={16} />
                  <span
                    className="truncate font-semibold text-slate-200 text-sm"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {repo.name}
                  </span>
                </div>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded flex-shrink-0 whitespace-nowrap"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    color: '#94a3b8',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {repo.stars}
                </span>
              </div>
              <p className="break-words" style={{ color: '#64748b', fontSize: 12, lineHeight: 1.6, fontFamily: 'var(--font-body)', marginBottom: 14 }}>
                {repo.desc}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono flex-shrink-0">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: repo.langColor }} />
              <span className="truncate">{repo.lang}</span>
            </div>
          </a>
        ))}
      </div>
    </FadeSection>
  )
}

// ─── Contact ───────────────────────────────────────────────────────────────

function Contact() {
  return (
    <FadeSection id="contact">
      <SectionLabel>Contact</SectionLabel>
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="mb-4"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2.2rem, 6vw, 3.8rem)',
            letterSpacing: '-0.035em',
            color: '#f1f5f9',
            lineHeight: 1.1,
          }}
        >
          Let's build impactful
          <br />
          <span style={{ color: '#06b6d4' }}>software together.</span>
        </h2>
        <p
          className="mb-8"
          style={{ color: '#94a3b8', fontFamily: 'var(--font-body)', lineHeight: 1.7, fontSize: 15 }}
        >
          Open to software engineering internships, research collaborations, and ambitious technical challenges. If you're building high-impact products, I'd love to connect.
        </p>

        <a
          href="mailto:himeshpopat2006@gmail.com"
          className="w-full sm:w-auto max-w-full min-h-[48px] inline-flex items-center justify-center gap-2.5 px-4 sm:px-8 py-3.5 rounded-full font-semibold text-xs xs:text-sm sm:text-base transition-all duration-200 hover:opacity-90 hover:scale-[1.02] mb-8 truncate"
          style={{ background: '#06b6d4', color: '#0c1020', fontFamily: 'var(--font-body)' }}
        >
          <EmailIcon size={18} />
          <span className="truncate">himeshpopat2006@gmail.com</span>
        </a>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <SocialPill href="https://github.com/Himeshpopat" label="GitHub">
            <GithubIcon />
          </SocialPill>
          <SocialPill href="https://linkedin.com/in/himesh-popat" label="LinkedIn">
            <LinkedinIcon />
          </SocialPill>
          <SocialPill href="https://leetcode.com/u/himesh_popat" label="LeetCode">
            <LeetcodeIcon />
          </SocialPill>
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#64748b', letterSpacing: '0.08em' }}>
          Mumbai, India
        </p>
      </div>
    </FadeSection>
  )
}

// ─── Music Player ──────────────────────────────────────────────────────────

const MUSIC_SRC = '/assets/music.mp3'
const TARGET_VOLUME = 0.75
const FADE_IN_DURATION = 800
const FADE_OUT_DURATION = 500
const STORAGE_KEY = 'himesh_portfolio_music_enabled'

function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeIntervalRef = useRef<number | null>(null)

  const clearFadeTimer = useCallback(() => {
    if (fadeIntervalRef.current !== null) {
      clearInterval(fadeIntervalRef.current)
      fadeIntervalRef.current = null
    }
  }, [])

  const getAudio = useCallback(() => {
    if (!audioRef.current && typeof window !== 'undefined') {
      const audio = new Audio(MUSIC_SRC)
      audio.loop = true
      audio.preload = 'auto'
      audio.volume = 0
      audio.onerror = (e) => {
        console.error('Failed to load background music audio file:', e)
      }
      audioRef.current = audio
    }
    return audioRef.current
  }, [])

  const fadeIn = useCallback(() => {
    const audio = getAudio()
    if (!audio) return
    clearFadeTimer()

    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setPlaying(true)
          try {
            localStorage.setItem(STORAGE_KEY, 'true')
          } catch {
            /* ignore quota/security issues */
          }

          const stepMs = 30
          const totalSteps = FADE_IN_DURATION / stepMs
          const volumeIncrement = TARGET_VOLUME / totalSteps
          let currentVol = audio.volume

          fadeIntervalRef.current = window.setInterval(() => {
            currentVol = Math.min(TARGET_VOLUME, currentVol + volumeIncrement)
            audio.volume = currentVol
            if (currentVol >= TARGET_VOLUME) {
              clearFadeTimer()
            }
          }, stepMs)
        })
        .catch((err) => {
          console.warn('Playback interrupted or blocked by browser policy:', err)
          setPlaying(false)
        })
    }
  }, [getAudio, clearFadeTimer])

  const fadeOut = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    clearFadeTimer()

    try {
      localStorage.setItem(STORAGE_KEY, 'false')
    } catch {
      /* ignore */
    }

    const stepMs = 30
    const totalSteps = FADE_OUT_DURATION / stepMs
    const volumeDecrement = (audio.volume || TARGET_VOLUME) / totalSteps
    let currentVol = audio.volume

    fadeIntervalRef.current = window.setInterval(() => {
      currentVol = Math.max(0, currentVol - volumeDecrement)
      audio.volume = currentVol
      if (currentVol <= 0) {
        clearFadeTimer()
        audio.pause()
        setPlaying(false)
      }
    }, stepMs)
  }, [clearFadeTimer])

  useEffect(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY)
      if (savedState === 'true') {
        fadeIn()
      }
    } catch {
      /* ignore */
    }

    return () => {
      clearFadeTimer()
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [fadeIn, clearFadeTimer])

  const toggle = () => {
    if (playing) {
      fadeOut()
    } else {
      fadeIn()
    }
  }

  return (
    <div
      className="fixed bottom-[72px] right-3 md:bottom-6 md:right-6 z-40 flex items-center gap-3 rounded-full"
      style={{
        background: 'rgba(12,16,32,0.92)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        padding: '8px',
      }}
    >
      <div className="hidden md:flex items-center gap-0.5 pl-2">
        {[0.4, 0.7, 1, 0.6, 0.9, 0.5].map((h, i) => (
          <div
            key={i}
            className="w-0.5 rounded-full"
            style={{
              height: 14,
              background: '#06b6d4',
              transformOrigin: 'center',
              transform: playing ? `scaleY(${h})` : 'scaleY(0.25)',
              animation: playing ? `pulse-bar ${0.5 + i * 0.1}s ease-in-out infinite alternate` : 'none',
              opacity: playing ? 0.85 : 0.3,
              transition: 'transform 0.3s ease, opacity 0.3s ease',
            }}
          />
        ))}
      </div>

      <button
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggle()
          }
        }}
        className="w-9 h-9 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 flex-shrink-0 cursor-pointer"
        style={{ background: playing ? '#06b6d4' : 'rgba(6,182,212,0.15)' }}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
      >
        {playing ? (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="#0c1020">
            <rect x="0" y="0" width="3" height="12" rx="1" />
            <rect x="6" y="0" width="3" height="12" rx="1" />
          </svg>
        ) : (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="#06b6d4">
            <path d="M0 0 L10 6 L0 12 Z" />
          </svg>
        )}
      </button>

      <span
        className="hidden md:inline pr-2"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: '#475569',
          letterSpacing: '0.1em',
          whiteSpace: 'nowrap',
        }}
      >
        {playing ? 'MUSIC' : 'MUTED'}
      </span>
    </div>
  )
}

// ─── Footer ────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      className="px-6 py-8 pb-24 md:pb-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-3 md:gap-4 max-w-6xl mx-auto"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#475569', letterSpacing: '0.08em' }}>
        © Himesh Popat
      </p>
      <p className="text-center md:text-right w-full md:w-auto" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#475569', letterSpacing: '0.06em' }}>
        React · Tailwind CSS · Outfit · JetBrains Mono
      </p>
    </footer>
  )
}

// ─── App ───────────────────────────────────────────────────────────────────

function FloatingBubbles() {
  const bubbles = [
    { left: '4%', size: 18, color: '#06b6d4', delay: '0s', dur: '16s' },
    { left: '14%', size: 10, color: '#8b5cf6', delay: '3s', dur: '13s' },
    { left: '24%', size: 24, color: '#06b6d4', delay: '7s', dur: '20s' },
    { left: '38%', size: 8, color: '#f59e0b', delay: '1.5s', dur: '11s' },
    { left: '52%', size: 14, color: '#8b5cf6', delay: '5s', dur: '17s' },
    { left: '64%', size: 20, color: '#06b6d4', delay: '9s', dur: '19s' },
    { left: '76%', size: 10, color: '#f59e0b', delay: '2.5s', dur: '14s' },
    { left: '86%', size: 16, color: '#8b5cf6', delay: '6s', dur: '15s' },
    { left: '94%', size: 12, color: '#06b6d4', delay: '4s', dur: '18s' },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="absolute rounded-full bubble-rise"
          style={{
            left: b.left,
            bottom: -40,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle at 35% 30%, ${b.color}55, ${b.color}00 70%)`,
            border: `1px solid ${b.color}33`,
            animationDelay: b.delay,
            animationDuration: b.dur,
          }}
        />
      ))}
    </div>
  )
}

const SECTION_IDS = ['projects', 'experience', 'achievements', 'skills', 'learning', 'about', 'github', 'contact']

export default function App() {
  const active = useActiveSection(SECTION_IDS)

  return (
    <div style={{ background: '#0c1020', minHeight: '100vh', position: 'relative', zIndex: 2, overflowX: 'hidden', maxWidth: '100vw' }}>
      <CustomCursor />
      <FloatingBubbles />
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Nav active={active} />
        <Hero />
        <Projects />
        <Experience />
        <Achievements />
        <Skills />
        <CurrentlyLearning />
        <About />
        <GithubShowcase />
        <Contact />
        <Footer />
        <MusicPlayer />
        <MobileTabBar active={active} />
      </div>
    </div>
  )
}
