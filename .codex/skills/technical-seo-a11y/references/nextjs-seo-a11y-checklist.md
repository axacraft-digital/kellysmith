# Next.js SEO + A11y Checklist

Use this checklist while interpreting audit output.

## Crawlability and indexability

- `metadataBase` should be set at the root layout.
- Indexable routes should expose a canonical URL through Metadata API `alternates.canonical` or an equivalent shared helper.
- `robots.txt` and XML sitemap generation should be configured and aligned with the canonical URL form.
- Routes listed in the sitemap should correspond to actual indexable routes and should not include known non-200 pages.

## Metadata quality

- Every indexable page should have a unique title and meta description.
- Layout-level metadata is a baseline, not a substitute for route-specific metadata.
- Open Graph metadata should exist at least for the root layout and important page templates.
- Add Twitter metadata when social sharing is in scope and the repo already treats social metadata as a concern.

## Structured data

- Prefer schema in shared helpers or the root layout when it applies site-wide.
- Validate the selected schema against confirmed business facts only.
- `Person`, `WebSite`, `BreadcrumbList` are usually safe for a personal site. Avoid speculative schema.

## Images

- Prefer `next/image` for site images.
- All content images need descriptive alt text.
- Decorative images should use `alt=""`.
- Large hero images should have sensible `sizes` values and explicit intent around preload or priority.
- Flag oversized source files in `public/` for optimization work, even if `next/image` is used.
- Image filenames should stay lowercase and kebab-case where practical.

## Accessibility checks that influence SEO and usability

- One meaningful `h1` per page template.
- Heading levels should progress without avoidable skips.
- Link text should be descriptive enough out of context.
- Form controls need visible labels.
- Decorative media should not create noise for assistive tech.

## kellysmith.com notes

- Routes are defined in `src/app/` directory structure.
- Data is centralized in `src/lib/data.ts`.
- Do not add schema properties for phone, address, geo, or business hours — this is a personal site.
