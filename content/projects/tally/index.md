---
title: 'Tally: A Local AI Data Analyst for Spreadsheets'
slug: tally
shortTitle: Tally
summary: A desktop app I designed and directed that turns any spreadsheet into a short, statistically checked story in plain English, using a private local AI model that is never allowed to invent numbers.
overview: Many people have a spreadsheet and no idea where to start. Power BI and Excel take training, and AI chatbots can miscalculate or call random noise a trend. I set out to build a tool for complete beginners that is accurate first and simple second, then directed an AI coding assistant through the build and tested every version on my own Mac.

publication: published
featured: true
order: 1

categories: [ai-tool, data-analysis, application]
capabilities:
  [
    problem-framing,
    analysis-and-recommendations,
    building-solutions,
    applied-ai,
    tools-and-infrastructure,
    troubleshooting-and-iteration,
    business-communication,
  ]
tags: [Local LLMs, AI guardrails, Statistics, Data storytelling, Product management, AI-assisted development]

context:
  type: personal

dates:
  start: '2026-10'
  end: '2026-10'
status: prototype

role: Product owner and designer; directed an AI-assisted build

contributions:
  - 'Wrote the product brief and the non-negotiables: analyze the whole file, show only statistically backed patterns, explain them so anyone understands at a glance, keep data private with a local AI model, and install with a double-click'
  - Directed an AI coding assistant (Claude Code) through 10 reviewed pull requests in one week, making every product, design, and model decision
  - Chose the default AI model (qwen3.5:9b) after comparing it with gpt-oss:20b for a 24 GB Mac
  - Installed and used the app on my own Mac, and turned problems I found (vague explanations, a glitchy loading screen, stale versions after updates) into specific fixes
  - Required an AI self-review that rereads every chart and explanation for clarity, and commissioned research on how people read charts that the AI follows on every call
  - Set up a shared vision log so Claude Code and OpenAI Codex follow the same product direction

problem:
  statement: Business intelligence tools require you to learn the software, clean data by hand, and already know which columns are worth analyzing. AI chatbots can make arithmetic mistakes, describe random noise as a pattern, and send private data to a hosted service.
  audience: People with a spreadsheet and no analytics training, such as small-business owners, managers, and students
  objectives:
    - Accuracy above everything; never show a pattern that is not statistically backed
    - Simple enough that no user ever feels overwhelmed
    - Plain-English explanations with gentle ideas to try
    - Private, free AI that runs on the user's own computer
  constraints:
    - No budget for hosted AI, so the model has to run on a personal laptop
    - Small local models are weaker at math, so the design cannot depend on the model being right about numbers

results:
  - text: Random data produces zero findings, checked on 5 random datasets of 600 rows each
    kind: measured
    evidence: Automated pure-noise test, run October 30, 2026
  - text: On a 5,285-row test dataset with patterns planted on purpose, Tally found the planted patterns and ignored the two pure-noise columns (58 checks run, 18 passed, 7 shown)
    kind: measured
    evidence: Sample analysis and engine tests on synthetic data, October 30, 2026
  - text: All 40 automated tests pass
    kind: measured
    evidence: Test suite run, October 30, 2026
  - text: A working prototype (version 0.1.0) installed and used on my own Mac, with PDF, PNG, and interactive HTML exports
    kind: delivered

tools:
  - name: Claude Code
    area: ai-assist
    purpose: Wrote the code, tests, installers, and documentation from my requirements and feedback, through 10 reviewed pull requests.
  - name: Ollama
    area: ai-runtime
    purpose: Runs Tally's AI model on the user's own computer, with no per-use cost and no data leaving the machine.
  - name: Qwen 3.5 (qwen3.5:9b)
    area: ai-runtime
    purpose: The default model I chose; it rewrites proven findings in plain English and answers chat questions through calculator tools.
  - name: Python
    area: language
    purpose: Language for the statistics engine and the local server.
  - name: pandas
    area: analysis
    purpose: Reads, cleans, and reshapes uploaded spreadsheets.
  - name: SciPy
    area: analysis
    purpose: Runs the hypothesis tests behind every finding.
  - name: Apache ECharts
    area: visualization
    purpose: Draws the interactive chart in each report chapter.
  - name: FastAPI
    area: integration
    purpose: Local server that connects the app window to the analysis engine and the AI model.
  - name: GitHub
    area: source-control
    purpose: Pull request reviews, and the source installed copies pull updates from on every launch.

ai:
  assistance: I directed Claude Code, an AI coding assistant, to build Tally. It wrote essentially all of the code, tests, installers, documentation, and the research guide, based on my requirements and feedback. I decided the product's goals, audience, design, model choice, and which features to build, and I tested each version myself. Claude does not run inside Tally.
  runtime:
    summary: A local open-weight model, run through Ollama on the user's computer, writes the report in plain English and answers questions. It never calculates statistics, decides which findings are real, or supplies numbers. Python does all the math; the model only gets proven facts and returns structured text. A filter rejects any sentence containing a number the model was not given, a self-review pass rewrites anything unclear, and chat answers must come from calculator tools that run on the real rows.
    deployment: local
    techniques: [prompt-design, context-handling, structured-output, tool-use, evaluation]
    tradeoffs:
      - topic: privacy
        note: Uploaded files and reports never leave the user's computer; the internet is only used for app updates and one-time model downloads.
      - topic: cost
        note: No per-use AI cost, because the model runs locally instead of through a paid API.
      - topic: quality
        note: Small local models are weaker than hosted ones and can still overstate in words, so numbers come from Python and a number filter blocks invented figures.
      - topic: performance
        note: Writing is slow without a capable GPU (40 to 115 seconds per AI call on a CPU-only test machine), and the self-review roughly doubles AI time.
      - topic: reliability
        note: If the model is unavailable or returns unusable output, Tally falls back to its own template wording, so charts and statistics always work.

cover:
  src: ./images/home-screen.png
  alt: 'Tally''s home screen: a small blue mascot above the headline "Drop in a spreadsheet. I''ll find the story." and a file drop area'

figures:
  - src: ./images/report-overview.png
    alt: 'The top of a Tally report for a sample coffee-shop dataset: a title, a short introduction, key numbers (5,285 rows, 2 years, $61.7K total revenue, 58 checks run), and three takeaways'
    caption: The top of a report. It opens with the key numbers and "the short version" in three sentences. Built from a synthetic sample dataset.
  - src: ./images/chart-chapter.png
    alt: 'A report chapter titled "Where Revenue comes from" with a written color key, a bar chart where Downtown is highlighted in blue at 40%, a plain-English explanation, and ideas to try'
    caption: Every chart has a written color key, a title that states the takeaway, ideas to try, and a confidence label, following the chart-reading research I commissioned.
  - src: ./images/ask-tally-chat.png
    alt: Ask Tally answering "Which store has the highest total revenue?" with a sentence, a bar chart, and a line showing what was calculated
    caption: Chat answers are calculated from the real rows. The "Calculated" line shows exactly what the tool computed.
  - src: ./images/architecture.png
    alt: 'Diagram of how Tally works: a launcher and app window on the user''s computer talk to a local Python server with a loader, profiler, statistics engine, and AI writer; the server calls Ollama locally; GitHub is used only for code updates'
    caption: Everything runs on the user's own computer. The statistics engine does the math; the local AI model only writes the words.
  - src: ./images/play-the-story.png
    alt: Two full-screen slides from Play the story, a big "36%" revenue growth number and the trend chart that proves it
    caption: '"Play the story" replays the findings as full-screen slides, an idea I took from Spotify Wrapped.'

reflection:
  lessons:
    - Use AI where it is strong, which is language, and code where accuracy is required.
    - A model's output depends heavily on the context it is given. Adding the chart's color key and a description of each column did more for clarity than rewording the prompt.
    - A monitoring signal has to measure the thing you care about. The version stamp first showed when the app started, not which version was installed.
  limitations:
    - Tested on synthetic data with known answers; no other users have tried it yet.
    - Small local models can still overstate in words, which the number filter cannot catch.
    - The Windows installer is written but has not been tested on a real Windows PC.
  improvements:
    - Run a short usability study with non-technical readers to measure whether each chapter is understood within five seconds.
    - Test and sign the Mac and Windows apps so they install without security warnings.
    - Let users compare two files, such as this month and last month.
---

## The problem

Tools like Power BI are powerful, but you have to learn the software, clean the data by hand, and already know which columns are worth looking at. I wanted someone who has never analyzed data to drop in a spreadsheet and get back something they can understand and present.

AI chatbots seem like the shortcut, but they are risky for this. They can get arithmetic wrong, describe random noise as a trend, and send private data to a hosted service. So my first rule was accuracy above everything, and my second was that no user should ever feel overwhelmed.

## The key decision: statistics do the math, AI writes the words

Tally never lets the AI decide what is true. A Python statistics engine cleans the file and runs dozens of real hypothesis tests: trends over time, differences between groups, numbers that move together, unusual values, and more. Testing that many combinations will turn up some "significant" results by luck, so every result is adjusted with a false-discovery-rate correction and must also clear a minimum effect size before it can appear.

Only then does the local AI model get involved. It receives the proven facts for each finding and rewrites them in plain English, under four guardrails:

- **A number filter.** Any sentence containing a number the model was not given is thrown out, and Tally keeps its own template wording.
- **Structured output.** Every response must match a fixed format: title, headline, explanation, ideas.
- **A self-review.** After writing, the model rereads each chapter as a first-time reader and fixes anything that is not instantly clear. The questions it asks itself come straight from my request.
- **Calculator tools for chat.** When a user asks a question, the model has to call tools that compute the answer from the real rows. Answers with numbers the tools did not produce are rejected.

## How a spreadsheet becomes a story

1. **Drop in a file.** CSV or Excel, including messy files with title rows, "Total" rows, currency symbols, or mixed date formats. Tally cleans them and lists every change it made in plain English.
2. **Watch it work.** A progress screen walks through six steps, from reading the file to double-checking that the wording is easy to read.
3. **Read the story.** Up to seven short chapters, each with a takeaway title, a color key, an interactive chart, a short explanation, ideas to try, and a confidence label like "Very sure."
4. **Go further.** Ask questions, replay the findings as slides, or export a PDF, PNG, or interactive web file. Every report is saved in History.

## Testing it against a known answer

To check that Tally finds real patterns and ignores fake ones, the project includes a synthetic dataset of 5,285 coffee-shop orders with five patterns planted on purpose and two columns of pure noise.

| Planted in the data | What Tally reported |
| --- | --- |
| Sales grow over two years | Revenue up about 36% from January 2024 to December 2025 |
| Weekends are busier | Sundays bring in about 1.9x the revenue of Wednesdays |
| Members rate higher | Members average 4.31 versus 3.91 for walk-in customers |
| Four huge catering orders in October 2024 | Flagged as an unusual month and as unusual values |
| Payment method and barista are random | Not reported |

Tally also noticed that revenue equals quantity times price and deliberately skipped that obvious link. The most important test runs the other direction: five datasets of pure random numbers must produce zero findings, and they do.

## Directing an AI-assisted build

I did not write Tally's code by hand. I wrote the product brief, set the rules, and directed Claude Code through 10 rounds of building and review in one week. Because I switch between Claude Code and OpenAI Codex, I had the project keep a written vision and decision log that both tools read first, so neither drifts from the product direction.

The most useful changes came from using the app myself:

- **"It just mentions variables without interpreting them."** The first AI explanations named columns without saying what they meant. The fix gave the model each chart's color key and a description of the spreadsheet, required a three-sentence structure, and added a bad-versus-good example.
- **A glitchy loading screen.** The step list was being rebuilt twice a second. It now updates in place, with a smooth 0 to 100% counter that never moves backward.
- **Still showing the old version after an update.** An older copy was still running in the background. New copies now detect and replace it, and the home screen shows the installed version and when it was published.
