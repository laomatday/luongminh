# LMC Design System V4 / Architectural Precision

## Core visual tokens

The reference browser prototype owns the full CSS in `src/styles.css`. The tokens below form the acceptance baseline and should map 1:1 to Figma Variables and Next CSS custom properties.

| Token | Value | Role |
|---|---|---|
| `--ink` | `#1E2A27` | Headings, text, proof lines |
| `--night` | `#101F1B` | Hero, service narrative, footer |
| `--paper` | `#F1F1EB` | Main editorial surface |
| `--paper2` | `#E6E8E0` | Alternate editorial surface |
| `--accent` | `#C47853` | CTA, section focus and hover accents |
| `--lime` | `#D0D7BD` | Secondary muted natural accent |
| `--line` | `rgba(25,36,31,.20)` | Dividers and project index |
| `--ease` | `cubic-bezier(.22,1,.36,1)` | Motion signature |

## Typography & spatial grammar

Manrope is the base for bilingual editorial/technical material (subject to real font QA). Visible UX typography should be **at least 12–14px** for functional content on mobile (excluding small supplementary codes); labels below 11px require contrast/zoom review. Avoid using a dense all-cap sans-serif for long Vietnamese paragraphs.

Desktop width: 12-column conceptual grid, max ~1600px; tablet: 8; mobile: 4. Responsive gutter `clamp(24px, 5vw, 88px)` with 18px low-width fallback. Page sections should not rely on absolute fixed viewport heights except media. Recommended case-study aspect ratios: hero 16:9-ish, editorial paired 5:4, archive 4:3 / 3:4. Crop per project; source media must be explicitly approved.

## Reusable component groups

- Shell: `Header`, `FloatingHeader`, `MobileDrawer`, `LanguageSwitch`, `Footer`, `SectionKicker`
- Portfolio: `ProjectCard`, `ArchiveGrid`, `ArchiveRow`, `ProjectShowcase`, `ProjectDossier`, `ImageWithCredit`, `ProjectNext`
- Capabilities: `ServiceExplorer`, `ServiceIndex`, `ProofStrip`, `FactRow`
- Conversion: `InquiryForm`, `Field`, `ErrorState`, `SuccessState`, `DisabledForm`, `ContactDetails`
- Motion: `Reveal`, `CrossfadeMedia`, `HeroProgressTabs`, `ReducedMotionFallback`

## Motion & animation budgets

| Transition | Timing | Rule |
|---|---:|---|
| Hover links/icons | 180–300 ms | Transform/opacity; no shifting of line layout |
| Floating header on scroll | 300–400 ms | Maintain readability and no obstruction of anchor targets |
| Route exit → entry | 145 ms exit / 560 ms entry (MVP) | React/Next design parity; no blank flash |
| Hero featured fade | 650–1000 ms | Auto advance 7 s; pause on hover, hidden tabs and reduced motion |
| Showcase preview fade | 650 ms | No layout shift; mobile tap-selection instead of hover-only behavior |
| Scroll reveal | ≤ 800 ms | Never delay project content; disabled under reduced motion |

## UX acceptance checklist

- VI/EN switch retains route and loads equivalent translated project information.
- Home visitor can open a relevant project in ≤ 2 intentional interactions; mobile project preview has a separate open-project action.
- No overlapping nav on 320px and 390px devices; no horizontal overflow at tested breakpoints.
- Project image/photo origin is unmistakable. Concept illustration must never look like verified on-site photographic evidence.
- All interactive controls support keyboard focus with accessible labels, correct active/pressed state and visible focus rings.
- Mobile gallery/list controls remain reachable with thumb-size touch targets (aim ≥44 CSS px).
- Contact must never claim delivery success unless backend provider accepts request.
- Real media must be tested against performance targets on a hosted environment before go-live.
