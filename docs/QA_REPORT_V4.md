# LMC V4 — Design / React Prototype QA

**Run:** 15 October 2026. **Target tested:** standalone React preview using embedded legacy React renderer in Chromium with remote Google Fonts disabled (air-gapped). **Not** the React 19/Vite or Next.js production runtime.

## Results

- **132/132** existing functional/responsive assertions (6 viewport sizes: 320, 390, 768, 1024, 1440, 1920).
- **61/61** V4-specific assertions: proof strip and project dossier, six project showcase items and independent preview/detail controls, mobile selection, focus/pressed state, changes in selected preview, scrolled header state, no horizontal overflow and reduced-motion preference detection.
- **193/193 total**, **0 uncaught browser JavaScript errors** in those checks.
- Source syntax/transpilation check for prototype React TSX and new Next V4 TSX files: **no parser diagnostics**.
- Next starter inquiry-validation script: **10/10 passing**.

## Manual visual observations

1. Hero image + new dossier align at 1440px without covering the primary headline.
2. 390px mobile presents the headline/CTA before the image; no horizontal overflow. Dossier is suppressed on mobile to avoid crowding.
3. Project showcase is two-column desktop; mobile switches to image preview above a focusable index.
4. The floating navigation remains usable after scrolling and does not force custom scroll interpolation.
5. All six media are **illustrative SVG studies**, never misidentified as delivered construction photographs.

## Remaining production blockers (not passed and not claimed)

- Actual Next.js 16 / React 19 `npm install`, TypeScript full typecheck and production build require network access.
- Real 2× photography, CMS approval/rights, VI/EN content sign-off and verified contractual-scope descriptions.
- Hosted Lighthouse + Core Web Vitals measured on real network/phones, plus manual WCAG 2.2 AA / screen-reader testing.
- Resend/Turnstile/analytics domain credentials, form end-to-end delivery, 301 redirect inventory and production deployment.
- **Figma source, responsive component library and final signed design system** are still deliverables for the $5,000 UI/UX team and have not been falsely marked complete by a coded prototype.

Test evidence JSON: `QA_RAW.json` and `QA_V4_EXTRA.json`.
