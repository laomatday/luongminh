# LMC WEBSITE PRODUCTION — DEV-ONLY INVESTMENT

**Decision:** Approved interactive React MVP is the visual reference. **USD 10,000 is exclusively the engineering-team budget** (labor, internal QA, technical deployment and contingency). It is **not** the overall project budget.

**Date:** 15 October 2026. **Status:** developer handoff budget / planned, not contracted or paid.

## Scope of the $10,000 development envelope

| Dev workstream | Owner | Hours assumption | Blended rate | Cost |
|---|---|---:|---:|---:|
| Technical architecture & code review | Tech Lead | 25 | $40/h | $1,000 |
| React/Next.js UI implementation, responsive, motion | Frontend Engineer | 140 | $25/h | $3,500 |
| Sanity CMS, structured project data, media integration | Full-stack/CMS Engineer | 72 | $25/h | $1,800 |
| Inquiry API, validation, anti-spam and mail delivery | Backend Engineer | 36 | $25/h | $900 |
| QA automation, accessibility, performance verification | QA Engineer | 50 | $21/h | $1,050 |
| CI/CD, hosting config, SEO infrastructure, launch | DevOps Engineer | 34 | $25/h | $850 |
| Technical contingency; controlled by Tech Lead and Product Owner | — | — | — | $900 |
| **Total** | **357 estimated engineering hours** | | | **$10,000** |

**Calculation:** Labor $9,100 + technical contingency $900 = **$10,000**. Rates are budgeting assumptions; not external salary/contract market quotations. The total is a hard ceiling unless an approved change request reallocates or adds to it.

### Separately funded; NOT deducted from developer budget

- Product strategy / UX research / IA / screen specification
- Art direction, UI/UX/Figma, logo and brand design
- Photography, film, drone images, color grading, image licensing
- Project descriptions, technical case studies, translated copy and factual verification
- Long-term content editing and growth marketing
- Domain, hosting, email/API, CMS usage subscriptions; monthly maintenance after warranty
- Taxes, contract legal costs or third-party accessibility certification if applicable

Separate-budget items are **not assigned a value until procurement and ownership are agreed**. A $10,000 dev cap cannot be used to imply the entire project costs $10,000.

## Product scope supported by developer budget

1. Approved responsive UI translated into a component system; 6 site templates: Home, Works, Project, Expertise, About, Contact.
2. Bilingual VI/EN rendering with crawlable `/vi/...`, `/en/...` routes and locale-specific metadata.
3. Content model: company settings, project entries, image rights, publication approval. Six projects migrated when real content exists; no invented physical specifications.
4. One working inquiry channel (Resend or equivalent) with server-side validation, bot verification, explicit success/failure and a direct email fallback.
5. Deployment to staging + production upon receiving authorized accounts, DNS permissions and content sign-off.
6. Sitemap, robots, metadata, 301 redirects for verified old paths, SEO hygiene.
7. Responsive checks, keyboard/a11y pass, performance report, 30-day defect warranty, basic CMS training and repo handover.

**Excluded engineering features:** ERP integration, BOQ estimator, BIM/CAD viewer, client portal, construction management workflow, tender workflow, payroll, multi-tenant permission system, complex back-office analytics and custom design beyond signed Figma.

## Payment milestones (proposal)

| Gate | Acceptance | % | Amount |
|---|---|---:|---:|
| Kickoff | Signed dev scope, source/IP ownership, repos, designs and credentials inventory | 20% | $2,000 |
| FE complete | Six responsive UI templates connected to clean routes and reviewed on staging | 25% | $2,500 |
| Data/backend | CMS editor + six approved records + tested inquiry service | 30% | $3,000 |
| UAT | QA report, SEO mapping, security checks and all P0/P1 defects resolved | 15% | $1,500 |
| Go-live / handover | Production release, monitoring, admin training, documentation, rollback checklist | 10% | $1,000 |
| **Total** | | **100%** | **$10,000** |

Payment proposed against deliverable gates, not merely elapsed weeks. Changes to design after sign-off are handled via change control, not quietly consumed from QA/security budget.

## Risk / sensitivity

- If design assets are incomplete at W0, eight development weeks do **not** start; otherwise idle time consumes the $10k developer cap.
- 23 real projects or 6 flagship long-form case studies are **not** included by default. Scope covers **six listed entries** with detailed copy only when owner provides it.
- If a new integration takes an additional 60 hours at a $25/h blended rate, incremental engineering cost is **$1,500**. Decide whether to remove equivalent scope or authorize additional funding.
- A 15% rework of 140 frontend hours is 21 hours, approximately **$525**. Reserve change control and keep art direction approval upstream.
- External vendors, source-photo rights, content sign-off and operating spend are dependencies, not covered by the developer contingency.

---
**V4 DESIGN BUDGET CLARIFICATION (15 Oct 2026):** An additional **$5,000 UI/UX-only** stream is approved as a separate planning envelope. The **$10,000 development budget and 357h dev allocation above remain unchanged**. Combined planned labor budget is **$15,000**, excluding imagery/content and operating costs. Refer to `UIUX_BUDGET_5000.md` for the non-overlapping deliverables and design acceptance gates.
