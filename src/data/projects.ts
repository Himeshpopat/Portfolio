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
    problem: "Wholesale transactions lack digital tracking pipelines, leading to manual paper invoice overheads and slow order settlement.",
    solution: "Designed a B2B platform with 3-stage order workflows, passwordless OTP authentication, and transactional email automation.",
    stack: ["Python", "Flask", "SQLAlchemy", "Bootstrap", "REST APIs", "Render"],
    metrics: [
      { label: "Registered Users", value: "50+" },
      { label: "Order Pipeline", value: "3-Stage" }
    ],
    liveUrl: "",
    repoUrl: "",
    bullets: [
      "Engineered a robust B2B transaction system with a structured **3-stage order workflow**.",
      "Secured accounts using role-based access control (RBAC) and passwordless **OTP authentication**.",
      "Integrated **Cloudinary** for image storage and **Brevo** for transactional email pipelines."
    ],
    initials: "VX"
  },
  {
    title: "Color Vision Deficiency Detection & Simulation",
    tagline: "High-performance browser-based color blindness simulator and assessment dashboard",
    problem: "Simulating color blindness filters on high-resolution images suffers from latency overheads in standard browser threads.",
    solution: "Developed an interactive canvas dashboard executing visual transforms in Python via Flask and optimized NumPy matrix operations.",
    stack: ["HTML", "CSS", "JavaScript", "Flask", "SQLite", "NumPy"],
    metrics: [
      { label: "Matrix Latency", value: "< 200ms" },
      { label: "Core Simulations", value: "3 Types" }
    ],
    liveUrl: "",
    repoUrl: "",
    bullets: [
      "Simulates **Protanopia, Deuteranopia, and Tritanopia** in real time with minimal layout shift.",
      "Achieved sub-**200ms** latency by offloading processing to optimized **NumPy** matrix transforms.",
      "Designed a responsive drag-and-drop interface for seamless file uploads and diagnostics."
    ],
    initials: "CVD"
  },
  {
    title: "Diabetes Risk Prediction System",
    tagline: "Clinical-grade machine learning model for early diabetes risk screening",
    problem: "Imbalanced medical test datasets yield high false negative screening rates, overlooking at-risk patients.",
    solution: "Built a classifier using Logistic Regression on the Pima Indians dataset with SMOTE resampling techniques.",
    stack: ["Python", "Scikit-learn", "Pandas", "Streamlit"],
    metrics: [
      { label: "Model Accuracy", value: "71.4%" },
      { label: "Recall Rate", value: "67.0%" }
    ],
    liveUrl: "",
    repoUrl: "",
    bullets: [
      "Trained a **Logistic Regression** classifier on the **768-record Pima Indians** Diabetes dataset.",
      "Achieved a predictive accuracy score of **71.4%** under unseen data partitions.",
      "Boosted minority-class diagnostic recall from **58%** to **67%** using **SMOTE** resampling."
    ],
    initials: "DRP"
  }
];
