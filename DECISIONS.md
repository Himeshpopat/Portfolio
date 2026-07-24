# Design & Engineering Decisions — "Signal" Portfolio

This document records the design and engineering choices made for Himesh Popat's personal portfolio v1.0.

---

## 1. Visual Language: "Signal" Telemetry
- **Rejection of Cosplays:** Avoided creating a terminal simulator or code editor mockup. Instead, modeled the site as a **live telemetry panel** displaying mathematical, meteorological, and algorithmic stats (R², CGPA, LeetCode data).
- **ACCENT CONTROLS (Exactly 3 Hues):**
  - `--signal-cyan` (`#5fd4d6`): Exclusively used for **interactive/live states** (Navbar highlights, hover outlines, success banners).
  - `--signal-amber` (`#e8a94c`): Exclusively used for **numerical metrics** (CGPA, LeetCode counts, R² ratings).
  - `--signal-violet` (`#9d8cf0`): Exclusively used for **tag/category chip boundaries**.
- **No Avatar/Illustrations:** The page uses typographic grids, monospaced details, and the custom reactive signal trace to carry visual interest, avoiding illustrated or cartoon avatars.

---

## 2. Signature Wave Canvas
- **Canvas over SVG:** SVG re-rendering on high-frequency scroll events is notorious for causing Cumulative Layout Shift (CLS) and CPU spikes. Instead, we implemented the `SignalLine` via a high-performance **HTML5 Canvas drawing loop** synced to browser frame repaints (`requestAnimationFrame`).
- **Scroll Reactivity:** We mapped the window's vertical scroll percentage directly to wave speed, amplitude, and density. As the user scrolls, the wave increases in complexity and speed, then settles when scroll stops.
- **Accessibility Fallback:** If `prefers-reduced-motion` is detected, the canvas animation loop immediately turns off and renders a static, quiet wave.

---

## 3. Motion & Micro-interactions
- **Synchronized Entrance:** The `SignalLine` draws first (0.6s), then the navigation fades in, and finally the Hero text slides up in a single, grouped entrance fade rather than multiple competing staggered movements.
- **Strict Click Pressures:** Interactive elements (buttons, cards) scale down to `0.97` on tap/click over `0.1s` to simulate a physical mechanical console press.
- **Underline Anchors:** Inline links draw an underline from left-to-right over `0.15s` on mouseover.
- **Mobile Comfort:** On mobile devices, reveal offsets are reduced by 40% (from 16px to 10px) and durations are shortened to avoid lag on touch scroll. Hover effects are converted into explicit `:active` feedback.

---

## 4. Performance & Technical Standards
- **Data-Driven:** Decoupled all projects, experience items, skills, and achievements into modular TypeScript files (`src/data/`). Future expansions require editing these files alone, requiring zero layout edits.
- **SEO & Search Engines:** Embedded explicit metadata, Open Graph headers, and a structured `Person` JSON-LD block inside `index.html` to optimize Himesh's indexing rank.
- **Accessibility:** Applied keyboard-navigable focus rings (`focus-visible:outline-signal-cyan`) with a 2px offset on all inputs, ensuring the interface remains fully screen-reader accessible.
