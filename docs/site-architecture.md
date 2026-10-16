# Site architecture and design foundation

## Pages

| URL             | Source                          | Purpose                                                        |
| --------------- | ------------------------------- | -------------------------------------------------------------- |
| `/`             | `src/pages/index.astro`         | Who Bruce is, selected work, capabilities shown by that work   |
| `/work/`        | `src/pages/work/index.astro`    | All published projects                                         |
| `/work/<slug>/` | `src/pages/work/[slug].astro`   | One case study: quick overview first, depth below              |
| `/about/`       | `src/pages/about.astro`         | Background, resume, and contact once verified                  |
| `/404`          | `src/pages/404.astro`           | Not-found page                                                 |
| `/robots.txt`, `/sitemap-index.xml` | generated   | Search-engine metadata                                         |

### Navigation follows content

- **Work** appears in the header only when at least one project is published.
- **Contact** appears only after a contact method is set in `src/site.config.ts`.
- **Resume** appears only after `resume` is set and the file exists in `public/downloads/`.
- `npm run verify` fails the build check if any internal link points to a missing page or file.

### Homepage (planned)

The homepage currently shows only verified facts. Once projects exist it should connect:

1. Introduction: who Bruce is and the problems Bruce can help solve
2. Selected work: `featured: true` projects, ordered by `order`
3. Capabilities: generated from project `capabilities`, each linked to its supporting projects
4. Relevant background
5. A clear next action (view work, contact, resume)

Sections 2 and 3 already render automatically when content exists. Sections 1, 4, and 5 need Bruce's approved messaging.

### Project page structure

1. Header: categories, title, overview, context, role, timeframe, status
2. Cover image
3. At a glance: problem, what Bruce did, results
4. Narrative body (Markdown)
5. Visuals with captions
6. Tools, grouped by area, each with its purpose
7. How AI fits in: development assistance and runtime AI as separate panels
8. Reflection: lessons, limitations, improvements
9. Resources: repository, demo, report, presentation links

Every section after the header is skipped when its data is missing.

### Filters

Not built. Add category filtering on `/work/` only if the collection grows past roughly 9 to 12 projects.

## Design foundation

Tokens live in [`src/styles/tokens.css`](../src/styles/tokens.css); base and long-form text styles in [`src/styles/global.css`](../src/styles/global.css). Components use tokens instead of raw values.

- **Palette:** warm off-white background, white surfaces, charcoal text, one deep blue accent, soft borders. Text and accent colors meet WCAG AA contrast on both background colors.
- **Typography:** system font stack for now (fast, no external requests). Revisit once real assets set the tone; a single self-hosted variable font is the likely upgrade.
- **Layout:** 72rem page width, 42rem reading width, fluid gutters. Grids use `auto-fill` so they adapt without breakpoints.
- **Accessibility:** skip link, visible focus outlines, semantic landmarks and headings, alt text required by schema, `prefers-reduced-motion` respected.
- **Images:** optimized to WebP with responsive sizes; cover images also produce a 1200px JPEG for link previews.

### Components

| Component            | Use                                                      |
| -------------------- | -------------------------------------------------------- |
| `BaseLayout`         | HTML shell, SEO and social metadata, header, footer      |
| `SiteHeader` / `SiteFooter` | Navigation and footer links that adapt to content |
| `Container`          | Page or reading-width wrapper                            |
| `Button`             | Link styled as primary or secondary action               |
| `ProjectCard` / `ProjectGrid` | Project summaries on home and work pages        |
| `ProjectMeta`        | Context, course, role, team, timeframe, status           |
| `Section`            | Titled case-study section                                |
| `Figure`             | Optimized image with optional caption                    |
| `ToolList`           | Tools grouped by area with each tool's purpose           |

Add components when real content needs them, not in advance. Likely candidates after materials arrive: inline captioned figures in the narrative (would require MDX), a metric highlight, a process timeline, a before/after comparison.

## Hosting

The site builds to static files in `dist/`. Cloudflare settings when deployment is set up:

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 22 (from `.node-version`)
- `public/_headers` sets long-term caching for fingerprinted assets and basic security headers.

No server code, database, or environment variables are needed.
