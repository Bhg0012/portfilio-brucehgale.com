# Intake workflow: from source materials to a published project

Raw materials (dossiers, PDFs, Word files, screenshots, notes) go into `intake/`, which Git ignores and the site never reads. A written record of every upload goes into `catalog/`, which Git tracks so it survives between sessions. Uploading a document is permission to analyze it, not to publish it. Only reviewed, approved content moves into `content/projects/` and `public/downloads/`.

## Folder conventions

```
intake/                       raw files, not tracked, not backed up
  inbox/                      drop anything here first, in any shape
  <slug>/sources/             original files for one project
  <slug>/assets/              candidate images before approval

catalog/                      tracked, private (requires a private repository)
  index.md                    every upload, with its source ID and where it's summarized
  sources/S###-<name>.md      summary and extracted text of one upload
  projects/<slug>.md          everything known about one project, citing source IDs
  experience/<slug>.md        one job, internship, role, organization, or course
```

Blank versions of the catalog files are in `catalog/_templates/`. See [catalog/README.md](../catalog/README.md).

**Before committing anything in `catalog/`, confirm the GitHub repository is private.** If it is public, don't commit catalog content; tell Bruce.

## Steps

### 1. Inventory and summarize every upload

Give each upload the next source ID (`S001`, `S002`, ...) and add a row to `catalog/index.md`. Then create `catalog/sources/S###-<name>.md` from the template: a summary detailed enough to work without the original, key facts, a list of its images, plans kept separate from finished work, sensitive items, and the full extracted text for text-based documents. Extract embedded images from Word and PDF files into `intake/<slug>/assets/` so they can be reviewed individually.

Do this for everything received, including material that won't become a project page. The catalog is the permanent record.

### 2. Group by project and experience

Decide which materials describe the same project and assign each project a slug (lowercase, hyphenated, descriptive: `regional-sales-dashboard`, not `project-1`). Create `catalog/projects/<slug>.md` for each project. When material describes a job, internship, course, or organization rather than one project, create `catalog/experience/<slug>.md`, and link projects to the experience they came from. Move raw files into `intake/<slug>/sources/`. List anything unassigned at the bottom of `catalog/index.md`.

### 3. Extract the facts

In `catalog/projects/<slug>.md`, record with source IDs:
- The problem, audience, objectives, and constraints
- Bruce's role and specific contributions (separate from the team's or employer's)
- Approach, decisions, and implementation details
- Tools used and what each was actually used for
- AI involvement, split into development assistance vs. runtime functionality
- Results and deliverables

### 4. Separate finished work from plans

Mark each item as completed, in progress, planned, or experimental. Plans and ideas from a dossier don't become claims about finished work. The project's `status` field reflects the work's real state.

### 5. Match claims to evidence

Every important claim, especially numbers, needs a source: a report, screenshot, repository, or Bruce's direct confirmation. Record the source in the catalog project file. Claims without support are either removed or marked as open questions for Bruce.

**When sources disagree:** record both versions and their sources in the "Conflicts" section of the catalog project file. Use the most authoritative source (final deliverable over draft, data over recollection, later over earlier when it's a correction), and flag the conflict for Bruce. Never silently blend incompatible descriptions.

### 6. Gaps and screenshots

List missing information as specific questions. List needed screenshots with exactly what each should show and why (for example, "Dashboard filtered to one region, showing the comparison chart; demonstrates the filter design").

### 7. Confidentiality review

Flag anything that may not be public: client or employer names, internal data, personal information about others, proprietary code, credentials, unreleased work, or anything covered by an NDA or course policy. Default to excluding flagged material until Bruce approves it. Redact or crop screenshots as needed; never publish a screenshot that shows private data, API keys, or other people's information.

### 8. Write the content file

Copy `docs/project-template.md` to `content/projects/<slug>/index.md` and fill in only supported fields (field guide: [content-model.md](content-model.md)). Keep `publication: draft`.

Writing standards:
- Plain, confident language a business reader understands. Explain technical terms when they first matter.
- Specific over general: name the decision, the tool, the result.
- First person for Bruce's own work; accurate attribution for team work.
- Keep meaningful technical depth in the body for hiring managers; keep frontmatter scannable.
- No inflated adjectives, no invented metrics, no implied outcomes.

### 9. Select and prepare visuals

Choose images that prove something: the finished product, a key view, a before/after, a process artifact. Copy approved images into `content/projects/<slug>/images/` with descriptive names (`dashboard-region-filter.png`). Write alt text (what the image shows) and a caption (why it matters).

### 10. Verify against sources

Re-read the draft beside the sources. Check every claim, name, number, date, and tool. Confirm nothing confidential slipped through. Run `npm run validate` and view the page in `npm run dev` at phone and desktop widths. Then set `publication: review`.

### 11. Bruce approves

Bruce reads the page and confirms accuracy and that everything is fine to publish. Only then is `publication` set to `published`.

## Copying assets into public locations

| What                                  | Where                                    |
| ------------------------------------- | ---------------------------------------- |
| Project images shown on the page      | `content/projects/<slug>/images/`        |
| Downloadable project files            | `public/downloads/<slug>/`               |
| Resume (once approved)                | `public/downloads/`, then set `resume` in `src/site.config.ts` |

Anything in `public/` is published exactly as-is to anyone who has the URL, even if no page links to it. Strip document metadata (author fields, comments, tracked changes) from PDFs and Office files before placing them there.
