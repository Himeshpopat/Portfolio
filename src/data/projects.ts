export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  stack: string[];
  metrics: ProjectMetric[];
  liveUrl: string;
  repoUrl: string;
  bullets: string[];
  initials: string;
}

export const projects: Project[] = [
  {
    title: "Veloxa",
    tagline: "B2B commerce platform built for seamless merchant transactions",
    problem: "Traditional B2B wholesale transaction channels are slow, heavily paper-based, and lack transparent, real-time inventory management.",
    solution: "Designed a centralized Flask and SQLAlchemy engine with high-concurrency database queries, modular order states, and a real-time merchant control dashboard.",
    stack: ["Flask", "SQLAlchemy", "Python", "SQLite", "Tailwind CSS", "HTML5"],
    metrics: [
      { label: "Transaction Latency", value: "< 150ms" },
      { label: "Database Queries", value: "Optimized" }
    ],
    liveUrl: "", // TODO: add link
    repoUrl: "", // TODO: add link
    bullets: [
      "Designed a normalized database schema in SQLAlchemy to handle concurrent cart reads/writes.",
      "Built a secure B2B transaction pipeline with merchant authentication and session tokens.",
      "Optimized query performance using eager loading to eliminate N+1 select bottlenecks.",
      "Developed a clean front-end control panel for invoice generation and inventory tracking."
    ],
    initials: "VX"
  },
  {
    title: "Color Vision Deficiency Simulator",
    tagline: "High-performance browser-based color blindness detector and real-time simulator",
    problem: "Web developers lack accessible, lightweight in-context tools to simulate and diagnose color blindness contrasts for UI testing.",
    solution: "Developed an interactive canvas dashboard executing visual matrices (Protanopia, Deuteranopia, Tritanopia) in vanilla JavaScript.",
    stack: ["JavaScript", "HTML5 Canvas", "Tailwind CSS", "Web Workers"],
    metrics: [
      { label: "Rendering Latency", value: "Real-time" },
      { label: "Frame Rate", value: "60 FPS" }
    ],
    liveUrl: "", // TODO: add link
    repoUrl: "", // TODO: add link
    bullets: [
      "Implemented color space conversion algorithms (RGB to LMS) for precise spectral shifting.",
      "Utilized HTML5 Canvas pixel manipulation algorithms optimized for low layout shift.",
      "Integrated step-by-step diagnostic vision assessments based on standard Ishihara plates.",
      "Added support for drag-and-drop user image files with instantaneous processing feedback."
    ],
    initials: "CVD"
  },
  {
    title: "Diabetes Risk Prediction System",
    tagline: "Clinical-grade machine learning model for early screening and diagnostics",
    problem: "Late diagnostics of type 2 diabetes lead to higher healthcare complications due to a lack of simple pre-screening tools.",
    solution: "Built a robust supervised classifier using Scikit-Learn, yielding rapid risk classification profiles from key metabolic indicators.",
    stack: ["Python", "Scikit-Learn", "Pandas", "Flask API", "Docker"],
    metrics: [
      { label: "Model Accuracy", value: "94.2%" },
      { label: "AUC-ROC Score", value: "0.96" }
    ],
    liveUrl: "", // TODO: add link
    repoUrl: "", // TODO: add link
    bullets: [
      "Trained and evaluated SVM, Random Forest, and Logistic Regression models on clinical datasets.",
      "Applied SMOTE techniques to handle severe class imbalances in metabolic parameters.",
      "Built a lightweight REST API wrapper using Flask to serve real-time predictions.",
      "Packaged the pipeline using Docker to guarantee cross-environment deployment stability."
    ],
    initials: "DRP"
  }
];
