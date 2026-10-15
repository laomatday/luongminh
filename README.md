# LƯƠNG MINH CONSTRUCTION — Next.js Production Starter / V4 Art Direction

**Scope:** engineering handoff starter reflecting the new **Architectural Precision V4**. It is *not a deployed website*.

## Budget, explicitly separated

- **$10,000 DEV ONLY** — original approved engineering allocation, unchanged; see `docs/DEV_ONLY_BUDGET.md`.
- **$5,000 UI/UX ONLY** — new design stream, not included in Dev payroll; scope and design acceptance in `docs/UIUX_BUDGET_5000.md`.
- **Total planned combined labor budget: $15,000**, excluding new original photography, text translation, hosting, service subscriptions and licensing.

## V4 bridge from approved React concept

Changes incorporated into this Next.js source:

1. V4 design tokens and responsive enhancements appended to `src/app/globals.css`.
2. `src/components/HeroSlider.tsx`: architectural grid, project dossier and dual CTA.
3. `src/components/ProofStrip.tsx`: establishment date, three sectors and dynamic **visible** public/CMS project count (not fabricated total completed projects).
4. `src/components/ProjectShowcase.tsx`: project index with state-driven picture preview; mobile/keyboard selection button and separate detail link. CMS-approved photos replace concept illustrations automatically.
5. `src/components/ServiceExplorer.tsx`: sticky technical-service storytelling panel with hover/focus changes.
6. `src/app/[locale]/page.tsx`: composes the shared design into the clean VI/EN SSR homepage. Remaining SEO/project, ContactForm and CMS boundaries are preserved.

The source is **Next.js 16 App Router, React 19, TypeScript, Sanity content model and inquiry API** with Resend and Cloudflare Turnstile contracts. Assets remain in `public/visuals` as *concept* placeholders until officially authorized photography is approved.

## Development setup (network-enabled machine)

```sh
cp .env.example .env.local
npm install
npm run test:validation
npm run typecheck
npm run build
npm run dev
```

Open `/vi` or `/en`. The production CMS, DNS, Resend and Turnstile credentials are not configured; no public deployment or secret mutation has taken place. A production build and E2E tests on the actual React 19/Next runtime remain to be performed.

## Safe content behavior

CMS fetches only `approvedForPublication == true` projects with confirmed media rights. If a configured CMS has zero approved projects, the source returns zero; it **does not substitute** unapproved sample entries. In preview mode without a connected CMS, public project names appear with explicitly labelled concept visuals. Contact API fails closed when security/delivery integrations are unavailable — it never falsely reports successful submission.

## Primary gate before developer execution

A signed Figma design system and key route artboards, verified image rights, project role and media records, approved bilingual copy, staging CMS/API credentials, and agreed acceptance tests. References, concept budget and decision trace are in `/docs`.


## V5: Interactive structural 3D integration

The approved prototype has a new **procedural, orbitable 3D conceptual industrial hall** integrated into the Next.js App Router. The homepage uses `src/components/Hero3D.tsx`, and `/vi/3d` and `/en/3d` provide a larger building-systems explorer. The 3D implementation is split into `src/components/Construction3D.tsx` (React client view) and `src/components/engine3d.ts` (WebGL2 instanced rendering with Canvas2D perspective fallback).

Controls: three visualization modes (Finished / Structure / Exploded), 5 layer filters, a phased assembly slider, pointer drag orbit, zoom, reset and keyboard rotation. It is intentionally a **conceptual model**, not a real Luong Minh project or BIM file. Native scroll is untouched. Static site/SEO content is server-rendered, the 3D client component initializes only on mount. No third-party 3D loader or subscription is necessary.

**Production caveat:** The Next.js build has not been run in this isolated environment (npm dependencies unavailable). Check SSR/client boundaries, browser GPU rendering, mobile thermals and owner-approved assets in connected CI before go-live.

## V6 Cinematic addendum — 15 October 2026

This handoff was updated with the live-coded **V6 cinematic five-scene autoplay**:
`src/components/cinematic-scenes.ts`, `src/components/engine3d.ts`,
`src/components/Construction3D.tsx` and appended styles in `src/app/globals.css`.
The homepage `Hero3D` and `/[locale]/3d` explorer now provide approved-language
links to the published project archive through `projectsHref`.

Motion is controlled by a scene scheduler (4.8 seconds × 5 scenes), with slow auto-orbit,
camera easing, structural/exploded/assembly transitions, Pause/Replay/Manual control,
visibility throttling and reduced-motion handling. See the React demo's
`docs/V6_CINEMATIC_SPEC.md` for the complete reference spec. **The source has not
been built with Next.js dependencies in this offline environment**. Continue the
production release gates and image-rights review as specified above.
