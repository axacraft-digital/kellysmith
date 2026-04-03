---
name: technical-seo-a11y
description: Audit and implement technical SEO and accessibility improvements for Next.js websites, including metadata, canonicals, Open Graph, structured data, sitemap coverage, image handling, heading hierarchy, and crawlability. Use when the task is a repo-wide SEO/accessibility audit or code-level optimization pass.
---

# Technical SEO + A11y

Use this skill when the user wants a technical SEO audit, an accessibility audit that overlaps with SEO, or code changes that improve crawlability, indexability, metadata quality, structured data, image delivery, or heading/link semantics.

This skill is intentionally technical. It does not do keyword strategy, editorial SEO planning, or invented content claims.

## Repo assumptions

Default to these assumptions unless the current repo proves otherwise:

- Framework: Next.js App Router
- Metadata: Next.js Metadata API
- Images: `next/image`
- Route authority: `src/app/` directory structure
- XML sitemap and robots generation via Next.js Metadata API (`sitemap.ts`, `robots.ts`)

For this kellysmith.com personal site, do not invent business facts, testimonials, or schema fields that are not confirmed in source content.

## Workflow

1. Read the route inventory first.
   Start with `src/app/layout.tsx`, `src/app/**/*.tsx`, and `src/lib/data.ts`.
2. Run the bundled audit script.
   Use `node .codex/skills/technical-seo-a11y/scripts/audit-site.mjs`.
3. Interpret findings with Next.js semantics in mind.
   Distinguish between true defects, intentional decoration, and placeholders awaiting confirmed data.
4. Prioritize by impact.
   Fix crawl/index/canonical/metadata/schema defects first, then image delivery and heading/link issues, then lower-signal cleanup.
5. Implement the smallest coherent fix set.
   Reuse existing metadata patterns and shared helpers instead of introducing parallel systems.
6. Verify after changes.
   Re-run the audit script, then run targeted project verification such as `npm run lint` or route-specific checks when relevant.

## Required checks

Every audit should check these areas:

- Route coverage in sitemap
- Unique page title and meta description coverage
- `metadataBase`, canonical handling, and URL consistency
- Open Graph coverage for layout and page templates
- Twitter card coverage when the site already manages social metadata
- Sitemap and robots generation
- Structured data presence and schema safety
- Heading hierarchy, especially a single `h1` per page template
- `next/image` usage, alt text presence, and decorative image handling
- Image file size risks and filename hygiene in `public/`
- Internal linking opportunities
- Render strategy for SEO-critical routes

## Implementation rules

- Prefer the Next.js Metadata API over ad hoc `<head>` markup.
- Keep canonical URLs consistent across metadata, sitemap output, and internal links.
- Only add schema that can be supported by confirmed data.
- Treat decorative images as decorative with empty alt text; treat content images as descriptive.
- Do not replace valid editorial compositions with generic SEO widgets.
- Do not introduce client-only rendering for SEO-critical content.

## Reporting format

When auditing, report findings first in severity order.

Use this structure:

- `High`: issue, impact, file reference, recommended fix
- `Medium`: issue, impact, file reference, recommended fix
- `Low`: issue, impact, file reference, recommended fix

After findings, include:

- Assumptions or blocked items
- Change summary, if edits were made
- Verification run and remaining risks

If no meaningful issues are found, say that explicitly and still note any verification gaps.

## References

- For repo-specific checks and thresholds: see `references/nextjs-seo-a11y-checklist.md`
- For schema selection and business-data safety: see `references/schema-guidance.md`
