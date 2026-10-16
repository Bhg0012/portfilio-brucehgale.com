# Project content model

The schema in [`src/content.config.ts`](../src/content.config.ts) is the authoritative definition. The build fails if a project file doesn't match it. This document explains how to use the fields well; it does not repeat every allowed value.

Start new projects from [`project-template.md`](project-template.md).

## File layout

```
content/projects/<slug>/
  index.md          frontmatter (structured facts) + Markdown body (narrative)
  images/           approved, publication-ready images for this project only
```

- The folder name and `slug` must match. The build stops if they differ.
- The slug becomes the URL: `/work/<slug>/`. Treat it as permanent once published.
- Images referenced in frontmatter (`./images/...`) are checked at build time and automatically resized, compressed, and given responsive sizes. A missing image fails the build instead of shipping a broken page.
- Public files that should download as-is (a report PDF, slide deck) go in `public/downloads/<slug>/` and are linked with `links[].href: /downloads/<slug>/file.pdf`.

## Two kinds of status

| Field         | Describes                   | Values                                                    |
| ------------- | --------------------------- | --------------------------------------------------------- |
| `status`      | The work itself             | completed, in-progress, ongoing, prototype, concept       |
| `publication` | The write-up's readiness    | draft, review, published                                  |

A completed project can still be a `draft` because screenshots or Bruce's accuracy review are pending. Only `published` projects appear in production builds. Drafts and review copies are visible in `npm run dev` with a yellow "Preview only" banner so they can be checked in context.

Concepts and prototypes may be published, but the page labels their status so plans are never presented as finished work.

## Frontmatter vs. body

**Frontmatter** holds facts a recruiter scans: summary, context, role, contributions, problem, results, tools, AI usage, visuals, links, reflection. The project page renders each block only when it has data.

**Body** holds the deeper explanation: reasoning, process, decisions, implementation detail. Do not repeat the frontmatter lists in prose; expand on them.

### Body sections by project type

Use H2 (`##`) headings. Pick what the sources support; there is no required set.

| Project type                   | Useful sections                                                                 |
| ------------------------------ | ------------------------------------------------------------------------------- |
| Data analysis / dashboard      | Context, Data, Approach, Key findings, Recommendations, How it was built         |
| Marketing campaign / research  | Context, Audience, Research, Strategy, Execution, Results                        |
| Website / application          | Context, Requirements, Architecture, Key decisions, Implementation, Results      |
| AI tool / automation           | Context, Workflow, Design, Implementation, Evaluation, Results                   |
| Academic / team project        | Assignment, My role on the team, Approach, Deliverables, Outcome                 |
| Client / internship deliverable| Business need, My role, Approach, Deliverables, Impact (only what's approved)    |

## Field guidance

**summary** (required): one or two plain sentences: what it is and why it mattered. Used on cards, in search results, and in link previews.

**categories** (required) describe the kind of work. **capabilities** connect the project to what employers should see (problem framing, analysis, building, applied AI, infrastructure, troubleshooting, communication). Claim a capability only if the page shows it. The homepage lists each claimed capability with the projects that demonstrate it, so every claim links to evidence.

**context.organization**: name a client, employer, or internship organization only when Bruce confirms it is fine to name publicly.

**dates**: `YYYY` or `YYYY-MM`. Use the precision the sources support.

**contributions** (required to publish): concrete actions Bruce personally took. On team work, separate Bruce's work from the team's.

**results**: each has a `kind`:
- `measured`: a number or verifiable metric. The schema requires `evidence`, a short public description of what supports it (for example "Final client report, approved for sharing").
- `qualitative`: feedback, adoption, recognition.
- `delivered`: a concrete output that was produced.

**tools**: every tool needs a `purpose` stating what Bruce did with it in this project ("Joined three sales exports and built the pivot model", not "Data analysis"). The `area` groups tools on the page and keeps important distinctions explicit:

| Area             | Use for                                                      |
| ---------------- | ------------------------------------------------------------ |
| `source-control` | Where code lives and is versioned (Git, GitHub)              |
| `app-hosting`    | Where the finished app runs (Cloudflare, Vercel, a VPS)      |
| `data-storage`   | Where runtime data persists (Postgres, SQLite, Sheets)       |
| `integration`    | APIs and connections between systems                         |
| `ai-assist`      | AI that helped Bruce build, analyze, or write                |
| `ai-runtime`     | Models running inside the finished project (Ollama, an API)  |

**ai.assistance** vs. **ai.runtime**: these render as two separate panels, "AI that helped me build it" and "AI inside the finished project". Never merge them. `runtime.tradeoffs` is the place for cost, privacy, reliability, performance, and quality reasoning (for example, why a local model was chosen over a hosted API).

**cover** and **figures**: every image needs `alt` text describing what it shows. Captions explain why the image matters ("Filters let managers compare regions without editing formulas"). Prefer PNG for screenshots; export at the real display size or larger (at least 1600px wide for full-width images).

**links**: only working, public destinations. No placeholder links.

**seo**: optional overrides when the title or summary doesn't work as a search snippet.

## What never goes in content files

Content files are public. Keep these in `catalog/projects/<slug>.md` instead:

- Source-document references and page numbers used to verify claims
- Open questions, uncertainties, and conflicts between sources
- Editorial notes and to-do lists (missing screenshots, pending approvals)
- Confidential details, internal names, credentials, private data
