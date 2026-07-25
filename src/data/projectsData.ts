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

import diabetesP1 from '../assets/projects/diabetes/p1.webp'
import diabetesP2 from '../assets/projects/diabetes/p2.webp'
import diabetesP3 from '../assets/projects/diabetes/p3.webp'

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
