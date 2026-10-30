# S017 Tally project dossier

- Original files, uploaded 2026-10-30: `Tally_Project_Dossier.md`, `.docx`, `.pdf` (same content in three formats) and `Tally_Dossier_Images.zip` (12 PNG screenshots and diagrams, all readable)
- Prepared October 30, 2026 from the Tally repository (`main` at commit `454575a`, October 19, 2026) for portfolio use
- Related projects: [tally](../projects/tally.md)
- Related experience: none (personal project)
- Raw files kept in `intake/tally/` (not tracked, lost when the session ends). The Markdown version is the text of record; the docx and PDF were not separately reviewed because they carry the same dossier.

## Summary

Tally is a personal, solo project: a local desktop app (Python, FastAPI, browser window) that turns a CSV or Excel file into a short, statistically checked, plain-English data story. Built October 14 to 20, 2026, through 10 pull requests. Status: working prototype, version 0.1.0; used on Bruce's own Mac; Windows path written but untested; not distributed to other users.

Ownership: Bruce conceived the product, wrote the brief and non-negotiables, made product, design, and model decisions, tested on their own Mac, and reported problems that led to fixes. Claude Code wrote essentially all of the code, tests, installers, documentation, icons, and the research guide under Bruce's direction. The dossier recommends describing the work as "designed and directed an AI-assisted build."

## Key facts used on the site

- Statistics engine: rank-based tests (Mann-Kendall, Kruskal-Wallis, Mann-Whitney, Spearman, chi-square), Benjamini-Hochberg FDR at 5%, effect-size floors, up to seven chapters.
- Local AI: Ollama; default qwen3.5:9b (Bruce's choice after comparing with gpt-oss:20b for a 24 GB Mac); structured outputs, number guard, self-review, tool-calling chat with four calculator tools; template fallback when AI is unavailable.
- Bruce-originated ideas: Play the story (Wrapped-style), required AI self-review (Bruce's questions built into the prompt), chart-reading research guide, version stamp, mascot jokes and seasonal costumes, shared vision log for Claude Code and Codex.
- Bruce-reported issues and fixes: vague explanations (color keys, column descriptions, bad/good example), glitchy progress screen (in-place updates, 0 to 100% counter), stale running copy after updates (fingerprint and auto-restart), misleading version stamp.
- Measured (October 30, 2026): 40 tests pass; pure-noise test (5 random datasets, 600 rows each) gives zero findings; synthetic coffee-shop sample of 5,285 rows: 58 checks, 18 passed, 7 shown, planted patterns found, noise columns not reported.
- Performance note: 40 to 115 seconds per AI call on a CPU-only cloud workspace with qwen3.5:4b; speed on Bruce's Mac not measured.
- Screenshots: captured from the synthetic sample with the AI turned off (template wording), except the chat (qwen3.5:4b, October 14, 2026).

## Left off the site

- The title of Bruce's own analysis seen in History (personal dataset; the dossier says not to publish it without permission).
- Bruce's email address (in the repository's commit metadata).
- The repository link, until Bruce confirms the repository is public.
- Mascot, settings, history, and PDF export screenshots (not needed to make the case).

## Needs Bruce

- Confirm the repository https://github.com/Bhg0012/ai-data-analysis-agent is public before it is linked.
- Whether Codex was used on this project during the documented period (git history shows no Codex commits).
- Whether anyone else has tried Tally, and AI speed and quality on Bruce's Mac.
- Optional screenshots: an AI-written chapter from the default model on the Mac, the Desktop/Dock icon, the update message in Terminal.
