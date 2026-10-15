# LMC WEB PRODUCTION ARCHITECTURE — developer handoff

## Logical system

```
Browser (VI/EN) → Next.js 16 App Router / React 19
    ├─ Server-rendered marketing pages (clean URLs)
    ├─ Works listing + client filter/search
    ├─ /api/inquiries (JSON POST, validation, Turnstile, Resend)
    ├─ robots/sitemap/metadata/hreflang
    └─ Sanity Content Lake (approved project entries)
          └─ Sanity Studio editor (requires client account + project setup)
Hosting: Vercel or equivalent Next.js-capable host (account/domain not yet configured)
```

## Current implementation in this handoff package

- Six site templates with server routes, `/vi` and `/en` locale paths, Home slider, project archive, case detail.
- Static source-listed six project entries appear only when Sanity is NOT connected, with permanent concept-image disclaimers. **They are not signed off as verified case studies.**
- Sanity query filters `approvedForPublication` records, and schema requires an approval reference and cover image. **CMS credentials/account not connected.**
- Inquiry API requires Turnstile and Resend configuration; if missing, HTTP 503, not a fake success. **No mail has been tested end-to-end.**
- Robots noindex until both `ALLOW_INDEXING=true` and `CONTENT_SIGNED_OFF=true`.
- Original assets in `/public/visuals` are illustrations, not photographs. Do not launch while the six project cards still use concept images.
- Bilingual VI/EN UI and summaries exist; root locale layouts emit correct server-side HTML `lang` tags. Professional translations and factual checks are external editorial inputs.

## Key env vars

See `.env.example`. Do not commit `.env.local` or provider API keys.

| Variable | Purpose |
|---|---|
| NEXT_PUBLIC_SITE_URL | absolute approved production/staging origin |
| NEXT_PUBLIC_SANITY_PROJECT_ID | Sanity project scope |
| NEXT_PUBLIC_SANITY_DATASET | CMS dataset |
| SANITY_API_VERSION | stable date-based API version |
| RESEND_API_KEY | server-only mail provider credential |
| INQUIRY_FROM_EMAIL | sender mailbox on verified domain |
| INQUIRY_TO_EMAIL | inquiry destination, client-confirmed |
| TURNSTILE_SECRET_KEY | server-side bot verification secret |
| NEXT_PUBLIC_TURNSTILE_SITE_KEY | public captcha site key |
| ALLOW_INDEXING, CONTENT_SIGNED_OFF | two-person publication gate |

## Security and privacy backlog

- CDN/WAF rate limiting and abuse dashboard are required at hosting configuration time.
- Tighten CSP with nonce strategy under target infrastructure; don't copy untested CSP headers.
- Approved privacy policy, data retention schedule, and personal-data treatment need client/legal sign-off.
- Domain-based DMARC/SPF/DKIM, bounce handling, monitoring and mail-client reply path need operational testing.
- No production credentials, deployment URL, verified domain ownership, or real client submission was available for this handoff.

## Relevant official documentation

- Next.js App Router: https://nextjs.org/docs/app
- Next generateStaticParams: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
- Sanity + Next: https://www.sanity.io/docs/nextjs
- Resend + Next: https://resend.com/nextjs
