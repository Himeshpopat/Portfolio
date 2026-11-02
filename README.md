# Portfolio

React 19, TypeScript, Tailwind CSS 4 and Vite. Content lives in `src/data`,
`src/constants/siteConfig.ts`, and the section components. The production output
is static; no API keys, backend service or environment variables are required.

## Development

Use Node.js 22.22.2+, 24.15+, or 26+ and npm (required by the test tooling):

```sh
npm ci
npm run dev
```

## Verification

```sh
npm run check
```

This runs strict TypeScript checking, interaction regressions, original-content
checks against commit `8509574`, and the production build. `npm audit` checks the
current dependency advisory database. Tests use jsdom, not a real browser.

## Deployment

Run `npm run build` and serve `dist`. Vercel uses `vercel.json` for response
headers. The existing canonical URL, social metadata, sitemap and contact links
are retained. Keep the root base path unless deploying under a subdirectory.
Never commit `dist`, dependencies, credentials or environment files.

Before production sign-off, check 320, 375, 768, 900, 1280 and 1920px viewports;
keyboard navigation; reduced motion; music playback; touch swipes; external
project links; and the actual deployment headers. Measure Core Web Vitals on the
deployed site. See `docs/ENGINEERING-AUDIT.md` for findings and limitations.
