# Black and crimson visual refinement — 6 November 2026

The portfolio now uses architectural obsidian black surfaces, vivid crimson accents, crisp white text, fine metallic edges, and restrained contour lighting. This replaces the earlier directions while preserving all original factual content, data, project images, links, and integrations.

## Requested corrections

- Desktop portrait center is anchored at 50svh on the right, independently of the text column. Browser measurements at 1024, 1440, and 1920 pixels showed a zero-pixel offset from the viewport midpoint.
- Removed the decorative 01/02/03 project numbers.
- Rebuilt the phone hero with a compact portrait beside the name, making identity and the introductory copy visible together.
- Increased mobile supporting text, widened achievement panels, improved badge wrapping, enlarged screenshot controls, and preserved the full contact email.

## Additional refinement

- Orchid typography treatment and fine animated contour ribbons behind the portrait.
- Alternating desktop project compositions with the original screenshot galleries.
- Consistent plum surfaces and controls, timeline styling, education panel detailing, and quieter repository rows.
- Added an accessible enlarged screenshot viewer using the native dialog top layer. Escape closes it, scrolling is restored, and keyboard focus returns to its trigger.
- Existing reduced-motion handling, native scrolling, ambient visibility pausing, audio opt-in, project swiping, and expandable mobile details remain intact. No new dependencies.

## Verification

- TypeScript, the 10 existing interaction tests, original content verification, and production build pass.
- Exact comparison against HEAD preserves original JSX text/link inventory and portfolio data across 57 source files. New screenshot-viewer control text is isolated in its own component.
- Chromium checks at 320, 375, 390, 430, 768, 1024, 1440, and 1920 pixels cover all nine sections, all three project carousels and expanded details, portrait placement, contact email clipping, and page overflow.
- Reduced-motion mode has no running animations or intro overlay.
- Screenshots and audit scripts are retained under the ignored `.visual-qa` directory. These are emulated viewport checks, not physical-device or cross-browser certification.

Changes remain local; existing hosting configuration is unchanged.
