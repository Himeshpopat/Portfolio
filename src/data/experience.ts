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
    startDate: "Jun 2026",
    endDate: "Present",
    bullets: [
      "Engineered automated time-series weather forecasting pipelines, performing advanced feature engineering on **297K+** historical records.",
      "Trained, benchmarked, and evaluated six regression models including **LightGBM** and **XGBoost**.",
      "Achieved R² scores of **0.9955** for temperature and **0.9817** for relative humidity forecasting.",
      "Validated forecasting performance with MAE, RMSE, and R² metrics on unseen data, integrating results into a **real-time forecasting dashboard**."
    ]
  }
];
