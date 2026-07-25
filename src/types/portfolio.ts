export interface Screenshot {
  url: string
  caption: string
}

export interface PullMetric {
  value: string
  label: string
}

export interface Project {
  id: string
  name: string
  tagline: string
  problem: string
  solution: string
  outcomes: string[]
  pullMetrics: PullMetric[]
  stack: string[]
  demo: string
  source: string
  screenshots: Screenshot[]
  color: string
}

export interface SkillGroup {
  label: string
  items: string[]
}

export interface Achievement {
  stat: string
  unit: string
  label: string
  sub: string
  isNumeric: boolean
}

export interface LearningItem {
  name: string
  desc: string
  color: string
  tag: string
}

export interface GithubRepo {
  name: string
  desc: string
  lang: string
  langColor: string
  stars: string
  link: string
}

export interface Particle {
  dx: number
  dy: number
}

export interface ClickBurst {
  id: number
  x: number
  y: number
  particles: Particle[]
}

export type NavSection = 'projects' | 'experience' | 'achievements' | 'skills' | 'about' | 'contact'
