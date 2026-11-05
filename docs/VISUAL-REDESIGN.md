# Visual redesign and quality review

Completed 2026-11-05 (Asia/Calcutta). Starting revision: `8f052c9` on `main`.
The attachment contained the mission brief; the existing workspace supplied the
complete project. The working tree was initially clean, and a Git fetch confirmed
that local `main` matched `origin/main`. Existing history and configured authorship
were preserved.

## Direction and implementation

The original site used the same dark rounded panels, cyan/violet glows, small
labels, and dense badges throughout. That repetition weakened the distinction
between project evidence, professional experience, skills, and achievements.
The redesign uses warm paper, green-black ink, restrained terracotta accents,
fine rules, larger Outfit typography, and the existing JetBrains Mono for
technical annotations. No new runtime dependencies or fabricated images were added.

| Area | Transformation |
| --- | --- |
| Opening and hero | Coordinated ink-and-copper opening; oversized name; architectural portrait frame using the original photograph; structured credentials; clearer actions |
| Navigation | Full-width ruled desktop masthead with existing HP mark; compact mobile header and bottom navigation; full mobile labels; audio moved into the mobile header to avoid covering content |
| Projects | Dark case-study gallery; full-width project titles; original screenshots beside problem/solution narratives; distinct metrics, stack, and action rows |
| Experience | Role/date column beside evidence and technical detail; compact metric grid; flat ledger styling |
| Achievements | Typographic statistics wall with a restrained academic accent; smaller single-column panels on narrow phones |
| Skills | Capability index with aligned category labels and readable technology chips |
| Learning | Two-column desktop/tablet ledger, stacked on phones |
| About and education | Sage inset section, large introductory typography, framed academic record |
| GitHub | Ruled statistics and repository rows with preserved destinations |
| Contact and footer | Large ink-panel closing composition, clear email action, coordinated social controls and footer |

Motion is restrained: reduced tilt, small pointer feedback, hero entrances, and
section movement. Content remains visible if reveal observers are delayed.
Screenshot images retain current/next mounting and native lazy loading; rotation
still pauses offscreen, on focus, after manual navigation, and for reduced motion.

## Content and functionality protection

All data files, site configuration, original image/audio assets, SEO metadata,
URLs, factual claims, dates, numbers, and written portfolio content were retained.
No wording changes were proposed or made.

`npm run verify:content` passes against the original content baseline. The guard
now also accepts a selected revision and an exact JSX text/link inventory check:

```sh
node scripts/verify-content.mjs 8f052c9 --exact
```

Both checks pass across 46 files. The exact inventory compares normalized JSX
text and existing href/alt/label attributes; data/config and metadata checks are
separate. These checks supplement source diff review rather than claiming to
prove every possible runtime text state.

## Verification and iterations

- `npm run check`: TypeScript, all 10 interaction tests, content preservation,
  and production build passed after the final code changes.
- Tests cover intro completion under Strict Mode, Escape/focus, reduced motion,
  navigation targets, audio initialization/races, screenshot keyboard navigation,
  focus pause, persistent manual selection, and single project mounting.
- Native Chrome screenshots verified the original desktop presentation and the
  new foundation. Native automation later timed out, so review continued with
  local headless Chrome rendering.
- Complete layouts were captured at exact 320, 390, 768, and 1440 CSS-pixel widths;
  1024 and 1920 widths received fixed-height hero checks. Major sections were
  visually reviewed across desktop, phone, and tablet captures.
- Fixed-height mobile screenshots checked navigation/audio placement and the
  third project's expanded details. Actual DOM checks confirmed all three
  disclosures open, all three carousels advance, and the intro releases content.
- Final measured scenarios report no heading overflow, clipped main paragraph or
  heading boxes, broken mounted images, or overlapping carousel controls.
- Iteration corrected narrow carousel control spacing, oversized single-column
  achievement panels, truncated mobile navigation labels, audio overlay placement,
  and observer-dependent blank section rendering.
- Final production JavaScript: 79.34 kB gzip (previous engineering baseline:
  79.94 kB). CSS: 15.27 kB gzip. Original media files are unchanged.

The initial direct narrow Chrome screenshot cropped a wider layout viewport and
was rejected as mobile evidence. Exact-width local frames were used instead.
Tall captures verify composition; separate 844px-high frames verify fixed controls.

Evidence: [desktop](visual-review/desktop.png), [mobile](visual-review/mobile.png),
[expanded project](visual-review/project-details.png),
[browser measurements](visual-review/browser-checks.json).
Raw captures and temporary browser profiles remain excluded under `.visual-qa/`.

## Commit stages

1. `5caa696` — `feat: establish editorial portfolio identity and portrait composition`
2. `5e9b3ca` — `feat: redesign case studies and supporting portfolio sections`
3. Final responsive and verification stage — `fix: polish mobile controls and resilient visual presentation`

The first two stages were committed and pushed individually after their checks.
The final stage includes the responsive corrections and this report; its hash and
push result are provided in the delivery message. No force push or history rewrite
was used.

## Verification boundaries

The reviewed implementation is production-build ready. Browser rendering was
checked in Chromium, including exact responsive widths, but physical touch devices,
Safari/Firefox, audible speaker output, screen-reader operation, animation frame
rate, and measured Core Web Vitals were not independently verified. Existing
external URLs were preserved; third-party service uptime was not certified.
GitHub pushes do not independently verify completion of Vercel's deployment.
Google Fonts remains an existing external dependency with system fallbacks.

The first-visitor review emphasized identity and clear actions; the recruiter
review checked readable experience and project evidence; the engineering/design
review checked hierarchy, responsive wrapping, interaction continuity, content
protection, and the absence of obvious defects in the inspected captures.
