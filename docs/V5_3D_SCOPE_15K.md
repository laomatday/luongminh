# LMC — V5 Engineering 3D, integrated $15,000 scope

**Allocation remains fixed**: $5,000 UI/UX + $10,000 Dev. One reusable, schematic industrial model is included. No photorealistic digital twin, actual client BIM model or new architectural visualization vendor is implied by this budget.

## UI/UX budget: $5,000

| Scope | USD | Acceptance |
|---|---:|---|
| Research, UX and information architecture | 750 | User flows + hierarchy + responsive wireframes |
| Art direction / visual system | 1,200 | Style frame, material palette, type scale and art direction |
| 3D interaction design and motion specification | 1,400 | Full modes, layers, stage rail, reduced-motion storyboard |
| High-fidelity templates & responsive | 1,200 | Home, 3D Lab, projects, detailed project, services, about, contact |
| Design QA, handoff & component states | 450 | Complete Figma, credits and interaction specification |
| **TOTAL** | **5,000** | |

## Development budget: $10,000

| Scope | USD | Acceptance |
|---|---:|---|
| Next.js / React page architecture & shared components | 2,500 | VI/EN routes, reusable layouts, accessible navigation |
| WebGL 3D engine, modes, progressive fallback | 2,600 | GPU 3D + Canvas fallback, frame control, orbit/mode/phase UX |
| Sanity CMS, 6 project migration and media pipeline | 1,600 | Draft/published workflow, approved assets, structured metadata |
| Inquiry API and security | 800 | Validated, anti-spam, real status and email delivery |
| QA, accessibility & performance optimization | 1,200 | Hardware tests, fallback, Lighthouse, keyboard, smoke E2E |
| SEO, CI/CD, hosting handoff | 700 | Canonicals, 301 redirects, sitemap, release workflow |
| Technical contingency | 600 | Issue resolution within approved scope |
| **TOTAL** | **10,000** | |

## Delivery sequence

- W1–2 Design discovery, Figma style frames, content rights/audit; Next foundation.
- W3–4 High fidelity pages / 3D motion prototypes; dev page components.
- W5–7 3D integration, mobile fallback, CMS, asset ingestion; technical design reviews.
- W8 Inquiry/SEO/analytics and test-ready content.
- W9 Real device / GPU / accessibility / production QA and performance tuning.
- W10 UAT, launch checklist, training, rollback plan and release decision.

All schedules assume the client supplies approved project images, bilingual text, credits, domains and provider accounts on time. Without those inputs, treat 10 weeks as a planning baseline rather than a commitment.

## Quality gates

1. Viewer rotates with drag AND keyboard arrows/buttons; no scroll jacking.
2. Finished, Structure and Exploded generate distinct rendered geometry.
3. Four construction systems are separately focusable; controls expose `aria-pressed` state.
4. Stage slider changes assembly geometry, and reset restores default camera and modes.
5. On unsupported GPU, fallback remains interactive using Canvas2D perspective; if neither available, a legible SVG appears.
6. `prefers-reduced-motion` disables automatic introduction and long transitions.
7. Single model, GPU DPR capped at 1.5; no continuous idle animation.
8. Hardware performance targets for QA, **not yet measured**: ≥30fps during interaction on agreed mid-tier mobile, and ≥50fps on target desktop; measure against actual devices.
9. No commercial outcomes, dimensions or real construction claims derived from concept model.
10. CMS and contact backend must operate independently of 3D, so GPU failure cannot break conversion.

## Explicit exclusions

Project-specific BIM/IFC ingestion, architecture-quality GLB modelling of all six projects, 4K render production, drone filming, actual engineering quantities/BOQ, engineering design certification, new font/image licences, hosting/OPEX and new assets are out of scope. Adding them requires documented scope, timeline and commercial approval.
