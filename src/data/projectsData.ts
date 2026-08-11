import type { Project } from '../types/portfolio'

import veloxaHome from '../assets/projects/veloxa/HomePage.webp'
import veloxaDash from '../assets/projects/veloxa/Dashboard.webp'
import veloxaProd from '../assets/projects/veloxa/Products.webp'
import veloxaCart from '../assets/projects/veloxa/Cart.webp'
import veloxaOrder from '../assets/projects/veloxa/OrderDetails.webp'

import cvdHome from '../assets/projects/cvd/HomePage.webp'
import cvdReport from '../assets/projects/cvd/Report.webp'
import cvdIshihara from '../assets/projects/cvd/Ishihara.webp'
import cvdD15 from '../assets/projects/cvd/D15.webp'
import cvdMosaic from '../assets/projects/cvd/Mosaic.webp'

import diabetesP1 from '../assets/projects/diabetes/p1.png'
import diabetesP2 from '../assets/projects/diabetes/p2.png'
import diabetesP3 from '../assets/projects/diabetes/p3.png'
import diabetesP4 from '../assets/projects/diabetes/p4.png'
import diabetesP5 from '../assets/projects/diabetes/p5.png'

export const PROJECTS: Project[] = [
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
    name: 'Diabetes Risk Prediction & Clinical Decision Support',
    tagline: 'Clinical ML classifier with 0.81 ROC-AUC, enhanced recall & automated risk reports',
    problem:
      'Standard ML classifiers trained on imbalanced clinical datasets suffer from high false-negative rates, missing critical early-stage diabetic cases.',
    solution:
      'Engineered an end-to-end clinical decision-support pipeline combining SMOTE oversampling, calibrated risk scoring (AUC 0.81), exportable diagnostic PDF reports, and patient intake logging.',
    outcomes: [
      '0.81 Test Set AUC-ROC with calibrated 28.0% decision threshold for medical screening',
      'Boosted minority-class diagnostic recall from 58% to 67% using SMOTE oversampling',
      'Automated PDF Diagnostic Report generation with risk factor & protective factor breakdowns',
      'Interactive Streamlit app featuring real-time risk gauges, biomarker history log, and diagnostic curves',
    ],
    pullMetrics: [
      { value: '0.81', label: 'Test Set AUC-ROC' },
      { value: '58 → 67%', label: 'Recall via SMOTE' },
    ],
    stack: ['Python', 'Scikit-learn', 'Streamlit', 'SMOTE', 'Pandas', 'NumPy', 'Matplotlib', 'Machine Learning'],
    demo: 'https://diabetes-detection-system-26.streamlit.app/',
    source: 'https://github.com/Himeshpopat/Diabetes-Detection-System',
    screenshots: [
      { url: diabetesP1, caption: 'Diabetes Risk System — Interactive Patient Intake & Calibrated Risk Gauge' },
      { url: diabetesP2, caption: 'Diabetes Risk System — Historical Prediction Log & Biomarker Tracking' },
      { url: diabetesP3, caption: 'Diabetes Risk System — Exportable Clinical Diagnostic & Risk Breakdown Report' },
      { url: diabetesP4, caption: 'Diabetes Risk System — Model Diagnostics: ROC (AUC = 0.81) & Precision-Recall Curves' },
      { url: diabetesP5, caption: 'Diabetes Risk System — Exploratory Data Analysis: Correlation Matrix & Class Balance' },
    ],
    color: '#f59e0b',
  },
]
