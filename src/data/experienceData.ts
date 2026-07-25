export interface Metric {
  prefix: string | null
  value: string
  label: string
}

export const EXPERIENCE_METRICS: Metric[] = [
  { prefix: null, value: '297K+', label: 'Meteorological Records' },
  { prefix: 'R²', value: '0.9955', label: 'Temperature Model' },
  { prefix: 'R²', value: '0.9817', label: 'Rel. Humidity Model' },
  { prefix: null, value: '6 Models', label: 'Tested & Evaluated' },
]

export const EXPERIENCE_BULLETS: string[] = [
  'Engineered automated data preprocessing and feature-engineering pipeline for 297K+ historical meteorological records incorporating time-lag and rolling statistical features.',
  'Benchmarked six machine learning regression architectures (including LightGBM and XGBoost) using chronological split validation to prevent temporal data leakage.',
  'Achieved R² of 0.9955 for temperature forecasting and R² of 0.9817 for relative humidity on unseen operational holdout data.',
  'Optimized model inference latency and feature extraction workflows to support operational forecasting needs.',
  'Integrated trained regression models into an interactive forecasting dashboard for real-time meteorological visualization.',
]

export const EXPERIENCE_STACK: string[] = [
  'LightGBM',
  'XGBoost',
  'Scikit-learn',
  'Pandas',
  'Python',
  'Feature Engineering',
  'Time-Series CV',
]
