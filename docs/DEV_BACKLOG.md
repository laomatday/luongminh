# Development backlog — costed engineering execution

**All hours are planning estimates within a 357-hour DEV labor allowance.** Status "foundation authored" is NOT "production complete"; no live CMS, hosting account, domain, email delivery or real project media is connected.

| ID | Priority | Story | Owner | Est. h | Input / dependency | Done when |
|---|---|---|---|---:|---|---|
| DEV-001 | P0 | Initialize Next.js 16/React 19 repository and environment | Tech Lead | 12 | Hosting scope | `npm ci`, typecheck/build in CI |
| DEV-002 | P0 | Architecture/security review and technical scope freeze | Tech Lead | 13 | Figma & source handoff | Signed ADR, access control and release gates |
| DEV-003 | P0 | Shared shell, tokens, site navigation, responsive foundations | FE | 35 | Approved Figma | All breakpoints and keyboard navigation |
| DEV-004 | P0 | Home, Services, About templates | FE | 35 | Approved hero art | Pixel-level sign-off at primary viewports |
| DEV-005 | P0 | Project archive and detail template | FE | 30 | Content schema | Search/filter, gallery, no fabricated claims |
| DEV-006 | P0 | Contact VI/EN UI, validation states | FE | 25 | Copy/UX states | Error, success, loading, mobile and accessibility |
| DEV-007 | P1 | Motion tuning and transition performance | FE | 15 | Art direction spec | No scroll hijack, reduced-motion, smooth FPS |
| DEV-008 | P0 | Sanity documents and permissions | CMS | 25 | CMS ownership | Project editor and approval gate work |
| DEV-009 | P0 | Source migration and bilingual content | CMS | 25 | Six signed-off project packs | Six approved records imported accurately |
| DEV-010 | P0 | Approved image pipeline | CMS | 22 | Licensed originals | AVIF/WebP, responsive sizes and proper alt text |
| DEV-011 | P0 | Inquiry API, validation, transport integration | Backend | 20 | Sender DNS account | Real delivery acceptance and failure handling |
| DEV-012 | P0 | Turnstile, WAF throttling, abuse logging | Backend | 16 | Anti-bot infrastructure | Bot/abuse scenarios are rate limited |
| DEV-013 | P0 | E2E critical path automation | QA | 20 | Staging build | Routes, language, form, project CRUD regression |
| DEV-014 | P0 | Performance, accessibility and multi-device audit | QA | 20 | Real optimized images | Benchmark and a11y evidence attached |
| DEV-015 | P0 | Release regression and bug triage | QA | 10 | UAT candidate | No open severity P0/P1 |
| DEV-016 | P0 | CI/CD, secrets, staging and observability | DevOps | 14 | Devops accounts | Green pipeline and rollback ready |
| DEV-017 | P0 | SEO migration, redirects, sitemap and indexability | DevOps | 12 | Old URL crawl | Redirect map, hreflang and structured metadata checked |
| DEV-018 | P0 | Production cutover, monitoring and handover | DevOps | 8 | DNS/owner go-live authorization | Signed launch checklist and admin handoff |
| | | **ENGINEERING LABOR** | | **357h** | | |

At the blended workstream rates, 357 hours total **$9,100**. The remaining **$900 contingency** is managed by Tech Lead + Product Owner and is **not** an unallocated invitation to add features.
