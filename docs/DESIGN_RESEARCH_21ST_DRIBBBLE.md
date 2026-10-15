# LƯƠNG MINH — Research to Implementation (15 October 2026)

**Sources inspected:** the linked product catalogs 21st.dev and Dribbble. References are inspirations, not licensed assets/templates; no reference author's code or screenshots were copied into the Lương Minh implementation. Architecture studies in the demo are original concept SVGs and must not be presented as genuine site photos.

| Reference | Verified pattern | LMC V4 application | Rejected / not copied |
|---|---|---|---|
| [GravixPoint Industrial Construction — LAIN UI/UX / Dribbble](https://dribbble.com/shots/27488949-GP-Industrial-Construction-Corporate-Company-Website-Design) | Industrial contrast, structural grids, strong technical image composition and prominent proof information | Dark photographic-concept hero, reduced color vocabulary, visible verified-project dossier; 3-point fact strip | The reference's numerical claims (project counts, satisfaction, staff) and brand styling are **not** facts about LMC |
| [Structura — Syed Ali Abbas / Dribbble](https://dribbble.com/shots/26948698-Structura-Architecture-Construction-Website-UI-UX-Design) | Clear hero → services → featured projects → expertise/proof hierarchy | Home's project-to-capability journey; mobile typography and clear B2B contact CTAs | No generic promises about deadlines, contract size or certifications |
| [Construction & Engineering Systems — Jacob Machado / Dribbble](https://dribbble.com/shots/25993986-Construction-Engineering-Systems-Web-UI-Design) | Technical construction imagery, high-impact title, warm industrial accent | Architectural grid lines, matte industrial scene treatment, copper accent used sparingly | No copy-pasted image or exact visual reproduction |
| [Floating Header — Efferd / 21st.dev](https://mcp.21st.dev/%40efferd/components/floating-header) | Compact floating sticky navigation, blur, responsive menu | `.site-header.scrolled` floats with softened backdrop after 24px and remains usable on mobile | No dependency added, no copy of component source |
| [Project Showcase — Jatin Yadav / 21st.dev](https://mcp.21st.dev/%40jatin-yadav05/components/project-showcase) | List-based portfolio with image preview on interaction | `showcase()` in the React MVP and `ProjectShowcase.tsx` in Next: list hover/focus, controlled preview, separate mobile tap-to-preview and open-project link | No cursor-following preview on touch: unreliable and visually busy |
| [Sticky Scroll Reveal collection — 21st.dev](https://21st.dev/community/components/explore/sticky-scroll-reveal) | Image and narrative remain aligned during reading | Sticky service-panel + changing visual in `ServiceExplorer`, no scroll hijacking | No forced smooth scroll / WebGL / heavy parallax |

## Adopted design rationale

**Architectural Precision**, not a template purchased from a gallery: paper-white editorial pages, forest/ink hero, copper/orange call to action, restrained type scale, honest project information, and high-resolution visual placeholders pending real approved photos.

The project page is not treated as a photograph gallery only: its reading hierarchy answers *what project, which category, what LMC actually did, and what evidence is available*. Where the latter is missing, V4 explicitly states it is awaiting verification.

## Decision trace

- **Hero:** final direction = architectural matte split with refined headline, secondary inquiry CTA, project dossier, accessible 3-way featured switch.
- **Navigation:** desktop floating menu on scroll; mobile standard full-size touch drawer and VI/EN controls.
- **Proof:** only 2014 (company history), 3 sectors, 6 listed entries; never fabricate delivery metrics.
- **Projects:** existing filter/search/gallery/list + additional inline preview on the homepage. Mobile separates “preview” from “open project.”
- **Services:** title/description on left, capability index and image preview on right; focus parity for keyboard users.
- **Motion:** transform/opacity, 150–700ms; native scroll and reduced-motion override.

**Before public release:** get owner approval for all photography/role statements, verify the actual brand palette and permission to present the work, then test all CMS-backed routes using real media.
