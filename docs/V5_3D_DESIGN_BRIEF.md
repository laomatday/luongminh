# LƯƠNG MINH V5 — 3D ART DIRECTION & EXPERIENCE BRIEF

Date: 15 October 2026 | Status: UI prototype | Budget envelope: $15,000 for design + development

## Creative premise: "Engineering You Can Explore"

A construction site is inherently three-dimensional; presenting capability as static cards only misses an opportunity to explain the thinking behind an industrial structure. The V5 landing experience now contains a real perspective-rendered model of an **illustrative industrial hall**, not a photograph, animation video, or actual Luong Minh BIM file.

The 3D experience explains how components work together:

1. **Finished:** inspect the whole warehouse and external envelope.
2. **Structure:** strip away panels and roof to reveal columns, portal frames, purlins and braces.
3. **Exploded:** move major layers apart so they can be studied in spatial context.
4. **System focus:** foundation, steel, envelope and roofing, with highlighted parts and explanatory text.
5. **Construction sequence:** drag 0–100% to show conceptual assembly phases.

Controls: drag to orbit; on-device rotate left/right; zoom +/-; reset; keyboard arrows; VI/EN. Neither page nor wheel scroll is hijacked. `Ctrl+wheel` is permitted as an optional zoom gesture, and body scroll remains native otherwise.

### Placement

- **Home hero:** one full interactive 3D viewport with compact controls, engineering labels, and a prominent CTA into the dedicated Explorer.
- **3D Explorer:** larger model canvas and project-phase controls; explanatory section and a link to the real project archive.
- **Project case studies:** keep photography and facts. 3D project-specific assets are not implied or fabricated.

### Design language

- Deep green-black `#101c1a`, warm copper `#c78662`, paper `#eef1e9`.
- Real orthographic-like industrial camera and subtle composition grid.
- Labels like `WEBGL2 / CANVAS`, `CONCEPT MODEL` and `NOT A REAL PROJECT` remain visible.
- Motion budgets: short introductory 1.7s camera orbit on devices without reduced-motion; interpolation only while moving; no ongoing idle rendering.

### Design deliverables remaining for the dedicated $5,000 team

Approved desktop/tablet/mobile Figma (not yet created), motion storyboard, control states, image specifications, UX acceptance flow, measured contrast, reduced-motion variants, Dev handoff and formal sign-off. React preview is a coded demonstration, not an already delivered Figma system.

### Future real BIM option — conditional

Only with owner-provided, approved BIM/IFC/GLB drawings can a later phase show actual LMC projects, click real MEP and beam objects, expose technical quantities or present construction sequence by schedule. The current geometry and its on-screen scale are **illustrative and unsuitable for engineering decisions**.
