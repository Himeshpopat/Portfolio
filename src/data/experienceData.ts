export interface Metric {
  prefix: string | null
  value: string
  label: string
}

export interface ExperienceBadge {
  label: string
  variant?: 'primary' | 'neutral'
}

export interface ExperienceItem {
  id: string
  role: string
  organization: string
  location: string
  duration: string
  badges: ExperienceBadge[]
  metrics?: Metric[]
  bullets: string[]
  stack: string[]
  accentColor?: string
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'tata-power',
    role: 'Machine Learning Intern',
    organization: 'Tata Power — Weather Prediction Project',
    location: 'Mumbai, India',
    duration: 'Jun 2026 – Present',
    badges: [
      { label: 'Active Internship', variant: 'primary' },
      { label: 'Weather Prediction', variant: 'neutral' },
    ],
    metrics: [
      { prefix: null, value: '3M+', label: 'Historical Weather Records' },
      { prefix: null, value: '96/day', label: '15-Minute Forecast Intervals' },
      { prefix: null, value: '3.57%', label: 'Evaluation MAPE' },
      { prefix: null, value: '30-day', label: 'Historical Climatology' },
    ],
    bullets: [
      'Built a day-ahead temperature forecasting pipeline across 3M+ historical weather records, predicting all 96 daily 15-minute intervals for power-scheduling use cases.',
      'Engineered time-series features including lag variables, rolling statistics, 30-day historical climatology, and diurnal anomalies, with causal data cleaning and availability lags to prevent future-data leakage.',
      'Benchmarked multiple forecasting models and developed a final Random Forest–Analogue ensemble, achieving a 3.57% MAPE in model evaluation.',
    ],
    stack: [
      'Python',
      'Pandas',
      'Scikit-learn',
      'Random Forest',
      'Analogue Ensemble',
      'Time-Series Forecasting',
      'Feature Engineering',
    ],
    accentColor: '#8b5cf6',
  },
  {
    id: 'imd',
    role: 'Full-Stack Development Intern',
    organization: 'India Meteorological Department (IMD)',
    location: 'Mumbai, India',
    duration: 'Jun 2026 – Present',
    badges: [
      { label: 'Active Internship', variant: 'primary' },
      { label: 'Government of India', variant: 'neutral' },
    ],
    bullets: [
      'Built an atmospheric research platform using React, TypeScript, Flask, and MongoDB, implementing JWT authentication, protected REST APIs, and role-based access control.',
      'Developed seven Recharts-based atmospheric visualizations, including wind-rose, mixing-ratio, and correlation heatmap charts, with profile comparisons across configurable date ranges.',
      'Engineered a pandas-based CSV/XLSX ingestion pipeline with column normalization, meteorological bounds validation, and data-quality reports for missing, duplicate, and invalid records.',
      'Integrated the SondeHub v2 API with thread-safe TTL caching and error handling, and developed a canvas-based balloon-tracking map with periodic polling and historical sounding import.',
    ],
    stack: [
      'React',
      'TypeScript',
      'Flask',
      'MongoDB',
      'Recharts',
      'Pandas',
      'REST APIs',
      'JWT',
      'SondeHub v2',
    ],
    accentColor: '#06b6d4',
  },
]
