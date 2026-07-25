import type { GithubRepo } from '../types/portfolio'

export const GITHUB_REPOS: GithubRepo[] = [
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

export const GITHUB_QUICK_STATS = [
  { label: 'LeetCode Solved', val: '150+' },
  { label: 'Primary Languages', val: 'C++ · Py' },
  { label: 'Public Repositories', val: '6' },
]
