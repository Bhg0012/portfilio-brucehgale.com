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

The site currently runs in **placeholder mode**: dashed "Coming soon" boxes show where each missing piece of content will go. See [docs/site-architecture.md](docs/site-architecture.md#placeholder-mode).

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
intake/                    raw uploaded files (not tracked by Git)
catalog/                   private record of every upload, by source, project, and job/experience
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
2. Every upload is logged in [`catalog/index.md`](catalog/index.md) and summarized (with extracted text) in `catalog/sources/`, then organized into `catalog/projects/` and `catalog/experience/` (jobs, internships, courses). This record is tracked in Git, so it survives after raw files are gone. Processing follows [docs/intake-workflow.md](docs/intake-workflow.md): evidence check, confidentiality review, gaps and needed screenshots.
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
| Portrait                              | `src/assets/profile/`                 | Optimized at build; EXIF stripped      |
| Link-preview card                     | `public/social-card.jpg`              | Regenerate with `python3 scripts/make-social-card.py` |

Everything in `public/` is reachable by URL, linked or not. Only place files there that are approved for anyone to see.

## Deployment

Static output, no server or environment variables. Cloudflare Workers Builds deploys `main`: build command `npm run build`, deploy command `npx wrangler deploy` (configured by `wrangler.jsonc`), Node 22. See [docs/site-architecture.md](docs/site-architecture.md#hosting).

## Next steps

- [ ] Make the GitHub repository private (required before catalog summaries are committed)
- [ ] Upload project dossiers and screenshots to `intake/inbox/`
- [ ] Process materials into draft project pages
- [ ] Choose featured projects and their order
- [ ] Turn off placeholder mode (`placeholders: false` in `src/site.config.ts`) before launch
- [ ] Write homepage introduction and About copy from approved material
- [ ] Add verified contact links and an approved resume PDF
- [ ] Refine typography and layout against real project imagery
- [ ] Connect the repository to Cloudflare and deploy
