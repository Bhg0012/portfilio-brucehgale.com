# catalog/ (private record of everything Bruce uploads)

A permanent, Git-tracked written record of every source material, so nothing depends on the raw files surviving. Raw files stay in the ignored `intake/` folder; their summaries and extracted text live here.

**This folder requires a private GitHub repository.** It can contain unpublished details, organization names, and notes that are not approved for the public site. Before committing anything here, confirm the repository is private. If it is public, stop and tell Bruce.

The website never reads this folder. Nothing here is public content until it has been reviewed and rewritten into `content/projects/`.

## Structure

```
catalog/
  index.md                    master list of every upload, with where it's summarized
  sources/S###-<name>.md      one file per uploaded document, image set, or link batch
  projects/<slug>.md          everything known about one project, synthesized across sources
  experience/<slug>.md        one job, internship, role, organization, or course
  _templates/                 blank versions of the three file types
```

## How the pieces connect

- Every upload gets a **source ID** (`S001`, `S002`, ...) and a row in `index.md`.
- Each **source file** summarizes the document in enough detail to work without the original, and keeps the full extracted text when the document is text-based.
- **Project files** and **experience files** cite source IDs for every fact, so any claim can be traced back.
- A project can belong to an experience (a project done during an internship), and both files link to each other.
- Project slugs here match `content/projects/<slug>/` when the project becomes a page.

## Rules

- Record what the sources say; never fill gaps with guesses. Mark open questions as questions.
- Note conflicts between sources instead of blending them.
- Never store passwords, API keys, tokens, or other credentials, even if they appear in an upload. Write `[credential removed]` instead.
- Mark anything confidential so it stays off the public site unless Bruce approves it.
