# TECHNICAL DELIVERY PLAN — 8 DEVELOPMENT WEEKS

**Start condition (W0):** approved Figma for all breakpoint templates and states, licensed project artwork, copy approval flow, confirmed contact info and named Product Owner. This is a dependency gate, NOT billable development execution until inputs are present.

| Sprint | Lead | Dev deliverables | Dependencies | Acceptance |
|---|---|---|---|---|
| W1 Architecture | Tech Lead + FE | Next.js/React 19, TS, route architecture, CI/CD, dev/staging env, security baseline | repository, staging account | reproducible build, six clean route templates |
| W2 UI foundations | FE | tokens, header/footer, semantic navigation, responsive Home & Works | signed Figma + original logo | mobile 320–430 + desktop >1280; keyboard nav |
| W3 UI completeness | FE | six page templates; case-story layouts, motion, VI/EN switches | annotated UI states | demo sign-off, no desktop/mobile overflow |
| W4 CMS | CMS Engineer | Sanity schemas, project CRUD, permissions, publication gate, image pipeline | approved 6 content packs | editor can create/update/approve project without code |
| W5 Backend | Backend + FE | real inquiry endpoint, mail provider, CAPTCHA, anti-abuse measures, error states | verified send domain/DNS | delivery to actual inbox with tests; no false success |
| W6 SEO & observability | FE + DevOps | canonical/hreflang, sitemap, redirects, analytics with privacy approach, asset optimization | old URL inventory, ownership of analytics | smoke crawl, no missing metadata / broken links |
| W7 QA & UAT | QA + Tech Lead | iOS/Android/desktop, keyboard, screen reader sampling, security review, CWV lab | complete signed-off content | no open P0/P1; defects triaged |
| W8 Launch & handover | DevOps + Tech Lead | staged release, DNS, rollback, backups, owner training, code transfer | production approval | production go-live, support plan, admin can publish |

**Time model:** 357 engineering hours distributed across a small part-time/specialist squad over 8 weeks. It is not a commitment that one engineer works 357 consecutive hours. Design/content teams operate on separate budgets in parallel before and during development.

### Release-gate checklist

- G0: company confirms legal name, address, telephone, logo use and project permissions.
- G1: the approved Figma source, responsive measurements, microinteraction spec and accessibility states are delivered.
- G2: project images are sourced, optimized and include real rights approval; no concept illustration is mistaken for construction photography.
- G3: CMS published entry must have approval reference + permitted image; VI/EN copy is proofread.
- G4: domain verified, CAPTCHA WAF throttling and email provider configured, sample inbox delivery verified.
- G5: old URL redirects signed off; staging robots blocked; production indexing enabled only after approvals.
- G6: clean build, regression tests, backup/rollback, team handoff and a designated content owner.

## KPI / acceptance

- Functional: six templates, six approved project entries, three sector filters, bilingual navigation, no broken forms, all required routes reachable.
- Performance targets: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at p75 real-user data after adequate traffic; lab benchmarks during UAT, not a fake day-one field guarantee.
- Accessibility target: WCAG 2.2 AA on agreed templates and primary flows with manual checks.
- SEO: robots, sitemap, OG, locale alternate/canonical, 301 migration and clean indexability after launch approval.
- Security: no API credentials client-side, no PII in server logs, validation/anti-bot, errors never claim success before provider confirms.
- Quality: zero blocking/severe defects before deployment, 30-day defect warranty, code repository and service credentials held by client.

### Change control

For any out-of-scope request, Tech Lead writes: user value, owner, effort hours, cost impact, schedule/dependency, regression/QA impact. Product Owner approves either replacement of existing scope or extra budget BEFORE the team develops it.
