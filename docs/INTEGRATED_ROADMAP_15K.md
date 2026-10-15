# Integrated Design–Development Roadmap / Budget $15,000

## Contract boundaries

| Track | Budget | Owner | Notes |
|---|---:|---|---|
| UI/UX & Art Direction | **$5,000** | Design Lead | 139 h estimated; includes Figma/UX/motion QA |
| Development & QA | **$10,000** | Technical Lead | 357 h baseline from the approved DEV_ONLY_BUDGET |
| **Total staff/project budget** | **$15,000** | PM | No double booking of tasks |
| Photography, content, hosting, licenses | **Not included** | Client / separate vendor | Confirm additional allocation before production |

**Not counted as already spent.** The current React V4 is a working concept and Next V4 is an engineering starter pending dependency installation/credentials.

## Proposed timeline (10 weeks calendar)

| Week | UI/UX owner | Dev owner | Exit gate |
|---|---|---|---|
| 1 | Research/IA, owner interviews, visual source inventory | Technical discovery/hosting plan | IA + scope signed |
| 2 | Two art concepts, choose Architectural Precision | Data model/schema/CI | Art direction approved |
| 3 | Home, Works, Case Figma templates; design tokens | Setup Next, CMS models, design tokens | Preview & data contract |
| 4 | Services, About, Contact; mobile variations, prototypes and spec freeze | Header/Hero/Home/Works skeleton | Design QA & handoff |
| 5–6 | QA against build, small bounded refinements | Project detail, CMS integration, image pipeline | Functional integration |
| 7–8 | Design parity acceptance | Contact API, anti-spam, SEO, accessibility and optimization | UAT candidate |
| 9 | Image crop/visual QA, review with stakeholders | Cross-browser tests, production staging | Release candidate |
| 10 | Final visual sign-off | Redirect checks, security, DNS go-live, 30-day defect support begins | Production acceptance |

## Dependencies and blockers

- **Client (W1):** supply high-res original images, verified role and summary for 6 projects, site/logo brand files, corporate legal/contact information and VI/EN content approval.
- **Design lead (W4):** deliver Figma source, artboards, components, interaction annotation and final media crops to the Tech Lead.
- **Tech Lead (W4 onwards):** CMS integration and asset optimization. Connect env vars in staging; never commit API tokens.
- **Client (W9):** accept UAT and authorize public use of projects and testimonials.

## Engineering QA targets (not current results)

Goal: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at p75 on real user traffic; modern browsers; WCAG 2.2 AA audit target; full redirects from legacy URLs; form reliability and spam suppression; no unapproved CMS project accidentally appears as completed real-world work.

## Explicit exclusions

No invented KPI, revenue, staff size, contract amount, floor area or certification. No assumption that original concept illustrations are actual construction photos. No external source code transplanted from Dribbble or 21st.dev without reviewing its actual license.
