# Engineering audit and implementation

Date: 2026-11-02. Baseline: `8509574`, clean `main`, remote
`https://github.com/Himeshpopat/Portfolio.git`. The supplied workspace contained
the complete project; the attachment was the mission brief, not a source ZIP.
A baseline Git archive was saved to the operating system temporary directory.

## Findings and changes

| Area | Observed issue | Implementation |
| --- | --- | --- |
| Intro | Phase cleanup cancelled the unmount timer; focus could escape during exit | Each phase owns its timer; underlying content is inert until dismissal; focus restores to main |
| Projects | Separate mobile/desktop trees mounted every carousel twice | One responsive project tree, preserving order and mobile swipe behavior |
| Screenshots | Continuous timers in hidden/offscreen carousels; mouse leave restarted manual selections | Visibility-aware rotation, persistent manual pause, pause control and keyboard arrows |
| Screenshot accessibility | Hidden slides remained in the accessibility tree; dot hit areas overlapped | Inactive slides are hidden from assistive technology; separated targets; selection state |
| Assets | First image in every project was eager; all slide elements carried image sources | Load current/next screenshot after approaching the viewport; retain original image assets |
| Motion | Pointer bursts and tilt ignored reduced motion | Motion/pointer guards, timer cleanup and reduced-motion CSS |
| Navigation | Buttons replaced browser link behavior; fixed bars could obscure destinations | Native fragment links, URL history and scroll offsets |
| Semantics | Experience section referenced a nonexistent label; details lacked disclosure state | Real label target and disclosure relationships |
| Presentation | Dense desktop projects, inconsistent vertical spacing and dim secondary text | Shared surfaces, split desktop case studies, responsive spacing, brighter secondary text, small-screen adjustments |
| Typography | CSS import delayed font discovery; `xs` and `font-display` utilities lacked theme definitions | Head stylesheet discovery, explicit theme mapping and small-screen breakpoint |
| Audio | Eager preload policy, custom keyboard activation, asynchronous playback races | On-demand media loading, native button semantics and playback request invalidation |
| Dependencies | npm reported three high-severity vulnerable packages | Compatible patches; subsequent audit reports zero vulnerabilities |
| Deployment | No explicit response headers; environment ignore patterns incomplete | Vercel response headers and broader environment exclusions |
| Verification | Build omitted type checking; no regression suite | Combined check command, interaction tests and content baseline guard |

## Architectural decisions

Retained the existing React/Vite stack, original imagery, section order, music,
opening animation, project swipes, detail disclosures and social actions. No
new runtime dependencies were added. Existing unused components remain archived
in source rather than deleting their written content without permission.

Content files and factual data remain unchanged. The automated guard compares
data/config files exactly and verifies original JSX text, links and image labels.
It supplements diff review; it does not prove every possible runtime state.

## Verification boundaries

Baseline TypeScript and production builds passed. Automated regressions cover
intro completion under Strict Mode, Escape, reduced motion, carousel rotation,
manual selection persistence, keyboard focus/arrows and one card per project.
The final check command passed with patched dependencies: strict TypeScript,
10 interaction tests, content checks across 46 source files, and production build.
The development server returned HTTP 200 for the page and app entry. Production
JavaScript is 79.94 KB gzip versus 79.25 KB at baseline; the improvements reduce
duplicate mounts, image requests and timer activity rather than bundle size.

Browser access reported that its host was unavailable. A native browser launch
did not expose a separate targetable browser window. Therefore visual rendering,
real touch gestures, audio output, browser console, external destination uptime,
cross-browser compatibility and measured Core Web Vitals remain unverified.
jsdom tests do not substitute for these checks. Hosting headers require the
GitHub-connected deployment to complete; a Git push alone does not verify it.

The original music asset is about 4.87 MB and loads only when playback is
requested. Original PNG screenshots remain unchanged to avoid unverified image
quality loss. Google Fonts remains an external availability dependency with
system-font fallbacks. The application remains client-rendered; metadata is
available in the initial HTML, while main content requires JavaScript.

No content replacements are proposed or pending approval. Existing statistics,
dates, claims and metadata were preserved rather than independently updated.
