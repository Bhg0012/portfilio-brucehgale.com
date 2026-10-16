# CLAUDE.md

Portfolio website for Bruce Gale (brucehgale.com, hosted on Cloudflare). Astro static site.

## Purpose and audience

Help Bruce earn interviews in business analytics, data, marketing, business operations, and practical AI roles. Bruce is a Business Analytics student at Auburn University with a minor in Marketing.

The site must show, through specific projects and credible evidence, that Bruce can frame business problems, analyze and recommend, build practical solutions, use AI thoughtfully, understand the tools and infrastructure behind the work, troubleshoot and iterate, and explain technical work to a business audience.

Two reading levels:
1. **Recruiter scan:** who Bruce is, what Bruce offers, which projects matter. Homepage and the top of each project page.
2. **Hiring manager depth:** contributions, reasoning, implementation, results. Project page body.

Public writing: straightforward, confident, plain English, with technical depth where it helps evaluation.

## Current phase

**Foundation complete; waiting for source materials.** (Temporary: once Bruce supplies materials and asks for building, proceed with intake, content writing, homepage messaging, and design refinement. Do not treat this section as a reason to hold back.)

Next: process uploaded dossiers per `docs/intake-workflow.md`, draft project content, then write homepage and About copy from approved material.

## Accuracy and authorship (permanent)

- Never invent projects, metrics, employers, clients, testimonials, contact details, dates, or biographical claims. Missing information stays missing; the templates skip empty sections.
- Every important claim traces to a source or Bruce's confirmation. Measured results require `evidence` (enforced by schema).
- Separate Bruce's contributions from team, employer, or client work.
- Distinguish completed work from plans, prototypes, and experiments (`status`).
- When sources conflict, record it in intake notes, use the most authoritative source, and flag it for Bruce.
- Name organizations and use client/internship material only when Bruce approves.
- Only Bruce sets `publication: published`. Claude drafts to `draft` or `review`.

## AI distinctions (permanent)

- **AI development assistance** (AI that helped Bruce plan, code, analyze, or write) goes in `ai.assistance` and tools with `area: ai-assist`.
- **Runtime AI** (models operating inside the finished project, local such as Ollama or hosted APIs) goes in `ai.runtime` and tools with `area: ai-runtime`.
- Likewise keep `source-control` (GitHub), `app-hosting` (where it runs), and `data-storage` (where runtime data lives) separate.
- Every tool entry states what Bruce actually did with it (`purpose`).

## Where things live

| Path                               | Contents                                                       | Git     |
| ---------------------------------- | -------------------------------------------------------------- | ------- |
| `intake/`                          | Raw dossiers, screenshots, private notes, inventories          | Ignored (except README and `_templates/`) |
| `content/projects/<slug>/index.md` | Publication-ready project content                              | Tracked |
| `content/projects/<slug>/images/`  | Approved project images (optimized at build)                   | Tracked |
| `public/downloads/`                | Intentionally public files (resume, approved reports)          | Tracked |
| `src/content.config.ts`            | Project schema: the single source of truth for fields          | Tracked |
| `src/site.config.ts`               | Name, verified profile facts, contact, resume path             | Tracked |
| `src/pages/`, `src/components/`, `src/layouts/`, `src/lib/` | Routes, UI components, helpers         | Tracked |
| `src/styles/tokens.css`            | Design tokens                                                  | Tracked |
| `docs/`                            | Content model, intake workflow, architecture, project template | Tracked |

Raw intake material never goes into `content/` or `public/` without review. Private source references, conflicts, and editorial notes stay in `intake/<slug>/notes.md`, never in content files.

## Conventions

- Project slug = folder name = URL (`/work/<slug>/`); permanent once published. The build fails on a mismatch.
- Only `published` projects build in production. `npm run dev` shows drafts with a banner.
- Navigation and buttons render only when their destination exists (Work needs a published project; Contact and Resume need values in `site.config.ts`).
- Use design tokens, not raw colors or sizes. Add components only when real content needs them.
- Keep dependencies minimal. Current runtime deps: `astro`, `@astrojs/sitemap`.
- Do not use em dashes in site copy or docs (Bruce's preference); use a single hyphen, a colon, or rephrase.
- Use they/them or "Bruce" in docs; do not assume pronouns.

## Commands

```sh
npm install          # install dependencies (Node 22.12+)
npm run dev          # local dev server at http://localhost:4321 (shows drafts)
npm run check        # type and schema check (astro check)
npm run build        # production build to dist/ (published projects only)
npm run verify       # post-build checks: internal links, no drafts, no intake leaks
npm run validate     # check + build + verify; run before every commit
npm run preview      # serve the production build locally
```

## Reference docs

- `docs/content-model.md`: how to use each project field
- `docs/project-template.md`: blank project file to copy
- `docs/intake-workflow.md`: turning uploaded materials into approved pages
- `docs/site-architecture.md`: pages, project page layout, design foundation, hosting
