# brucehgale.com

Professional portfolio for Bruce Gale: business analytics, marketing, operations, and applied AI projects presented as evidence-backed case studies.

Built with [Astro](https://astro.build) as a static site for Cloudflare. Project content is Markdown with validated frontmatter; images are optimized at build time.

## Getting started

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev        # http://localhost:4321
```

The dev server also shows draft projects, marked with a "Preview only" banner.

## Validate and build

```sh
npm run validate   # type/schema check, production build, and output checks
```

Or run the steps individually:

| Command           | What it does                                                         |
| ----------------- | -------------------------------------------------------------------- |
| `npm run check`   | Type-checks the code and validates every project file against the schema |
| `npm run build`   | Builds the production site to `dist/` (published projects only)      |
| `npm run verify`  | Checks `dist/` for broken internal links, built drafts, and intake leaks |
| `npm run preview` | Serves the production build locally                                  |

## Repository layout

```
content/projects/<slug>/   publication-ready project content and its approved images
public/downloads/          intentionally public files (resume, approved reports)
intake/                    raw source materials and private notes (not tracked by Git)
src/
  content.config.ts        project content schema (single source of truth)
  site.config.ts           name, verified profile facts, contact links, resume path
  pages/                   routes: /, /work/, /work/<slug>/, /about/, 404
  components/              reusable UI
  layouts/                 page shell with SEO metadata
  lib/projects.ts          project queries, sorting, labels
  styles/                  design tokens and global styles
scripts/verify-build.mjs   post-build checks
docs/                      content model, intake workflow, architecture, template
```

## Adding project materials

1. **Drop raw materials in `intake/inbox/`**: Word documents, PDFs, Markdown, screenshots, slide decks, notes, and a list of relevant links. Keep originals elsewhere too; `intake/` isn't tracked or backed up.
2. Materials are sorted into `intake/<slug>/` and processed following [docs/intake-workflow.md](docs/intake-workflow.md): inventory, extraction, evidence check, confidentiality review, gaps and needed screenshots.
3. A draft page is written to `content/projects/<slug>/index.md` (from [docs/project-template.md](docs/project-template.md)) with approved images in `content/projects/<slug>/images/`.
4. The draft is reviewed in `npm run dev` and checked against the sources. Status moves `draft` → `review`.
5. After Bruce approves, `publication: published` makes it part of the live site at `/work/<slug>/`.

Field-by-field guidance: [docs/content-model.md](docs/content-model.md).

## Public assets

| Asset                                 | Location                              | Notes                                  |
| ------------------------------------- | ------------------------------------- | -------------------------------------- |
| Project images                        | `content/projects/<slug>/images/`     | Optimized and validated at build       |
| Downloadable project files            | `public/downloads/<slug>/`            | Served exactly as-is                   |
| Resume                                | `public/downloads/`                   | Then set `resume` in `src/site.config.ts` |
| Favicon                               | `public/favicon.svg`                  |                                        |

Everything in `public/` is reachable by URL, linked or not. Only place files there that are approved for anyone to see.

## Deployment

Static output, no server or environment variables. On Cloudflare: build command `npm run build`, output directory `dist`, Node 22. See [docs/site-architecture.md](docs/site-architecture.md#hosting).

## Next steps

- [ ] Upload project dossiers and screenshots to `intake/inbox/`
- [ ] Process materials into draft project pages
- [ ] Choose featured projects and their order
- [ ] Write homepage introduction and About copy from approved material
- [ ] Add verified contact links and an approved resume PDF
- [ ] Refine typography and layout against real project imagery
- [ ] Add a default social share image
- [ ] Connect the repository to Cloudflare and deploy
