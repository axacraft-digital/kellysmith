# Schema Guidance

Choose the smallest safe schema set that matches confirmed data.

## Safe-first order

1. `WebSite`
2. `Person`
3. `BreadcrumbList`

## Safe defaults

### `WebSite`

Usually safe when the site name and canonical domain are known.

Suggested fields:

- `@context`
- `@type`
- `name`
- `url`

### `Person`

Safe when the person's name, site URL, job title, and social profiles are confirmed.

Suggested fields:

- `@context`
- `@type`
- `name`
- `url`
- `jobTitle`
- `sameAs`

## Breadcrumbs

Use `BreadcrumbList` when the route hierarchy is stable and user-visible navigation already supports it.

For this repo, likely candidates are:

- Home > Porsche

## Validation posture

- Favor omission over speculation.
- If a useful schema type requires missing facts, note it as a blocked opportunity instead of filling placeholders.
