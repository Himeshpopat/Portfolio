export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export const experiences: ExperienceEntry[] = [
  {
    role: "AI/ML Intern",
    company: "India Meteorological Department (IMD)",
    location: "Mumbai, India",
    startDate: "May 2026",
    endDate: "Present",
    bullets: [
      "Engineered automated time-series weather forecasting pipelines utilizing **LightGBM** and **XGBoost** regression architectures.",
      "Processed and structured **297K+** historical meteorological data telemetry records including temperature, pressure, and humidity.",
      "Achieved an R² coefficient of **0.99+** on localized temperature and relative humidity forecasting metrics.",
      "Optimized model inference time and feature engineering pipelines, achieving a **30%** reduction in runtime."
    ]
  }
];
