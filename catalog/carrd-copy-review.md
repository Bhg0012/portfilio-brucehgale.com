# Carrd portfolio: original vs. revised copy

Everything on https://brucegale.carrd.co (captured 2026-10-19, see [S002](sources/S002-carrd-portfolio.md)), with a revised version and the reason for each change. The full revised project write-ups live in `content/projects/*/index.md` as drafts.

Revisions only use facts from Bruce's Carrd page, the linked decks (S003, S004), and the notebooks (S005). Anything still unverified is listed at the end.

## Site-wide

| Item | Original | Revised | Why |
| ---- | -------- | ------- | --- |
| Page title | Bruce Gale's Portfolio | Bruce Gale \| Portfolio | Leads with the name, which is what browser tabs, bookmarks, and search results show. (Bruce's choice, 2026-10-20.) |
| Tagline | Business Analytics and Marketing student at Auburn University | Business Analytics student at Auburn University with a minor in Marketing. | Accurate: Marketing is the minor. The original reads like a double major. |
| Meta description | Bruce's Experience in Data Analytics and Marketing | Bruce Gale is a Business Analytics student at Auburn University (minor in Marketing). Case studies in predictive modeling, social media analytics, and e-commerce. | Specific and keyword-rich instead of generic. Third person reads naturally in search results. |
| Section heading | Projects | Selected work: "Projects that show how I work" | Tells a recruiter what to expect from each case study. |
| Buttons | Full Project / Store Link / LinkedIn | Read case study / Full audit report (Google Slides) / The shop on Etsy | Says where the link goes before you click. |
| Contact heading | Contact Me: | Let's talk: "I'm looking for opportunities in business analytics, data, marketing, business operations, and applied AI." | States what you're looking for, so the right people reach out. |
| Footer | © Untitled. All right reserved. | © 2026 Bruce Gale | "Untitled" is a leftover Carrd default, and "All right reserved" has a typo. |
| Email | bhg0012@auburn.edu | A personal professional address (your choice) | Student addresses usually stop working after graduation, which is exactly when recruiters are reaching out. |
| Duplicate block | NBA project appears twice (bottom of page) | Removed | Leftover Carrd section. |

## Positioning statement (homepage hero): three options

The new site has a slot for one or two sentences under your name. Pick one, mix them, or rewrite:

1. **Range:** "I build predictive models, audit marketing performance, and run my own online store, starting every time from the business question."
2. **Specific proof:** "From predicting NBA playoff teams with 80% precision to auditing Auburn University's social media, I turn data into recommendations people can act on."
3. **Short and direct:** "Analytics with a marketer's eye. I like work where the numbers lead to a decision."

All three are backed by the three projects. Option 2 uses a number that is verified (S003, S005).

## Project 1: Auburn University Social Media Audit

**Original**

> - Analyzed Auburn University's social media performance to identify KPIs, audience insights, and platform-specific growth strategies
> - Worked directly with Auburn University's social media team to translate analytics into actionable recommendations

**Revised summary (card)**

> A year of Auburn's Instagram, Facebook, X, LinkedIn, and TikTok performance, benchmarked against four peer universities and turned into platform-by-platform recommendations.

**What changed and why**

- The original says what you did but not what you found. The revision adds the scope (five platforms, one year, four peer schools) and, on the project page, three headline findings: Instagram leads reach, LinkedIn and TikTok lead engagement rate (11.43% and 11.3%), and TikTok was posting only 3 to 5 times a month.
- Findings are written as headings ("TikTok was under-posting"), so a skimmer gets the story from the headings alone.
- Your two original bullets are kept as your contributions, word for word in substance.
- Team credit: the page says "on a team of four." Teammates are not named until you confirm.

## Project 2: NBA Predictive Modeling

**Original**

> NBA Predictive Modeling (Python)
> Built predictive models to forecast NBA team performance using historical performance stats
> GOALS: Forecast playoff teams / Predict total season wins / Predict the NBA champion

**Revised title:** Predicting NBA Playoff Teams, Wins, and Champions

**Revised summary (card)**

> A class project that turned 18 seasons of NBA team stats into three Python models. The best one picked playoff teams with 80% precision.

**What changed and why**

- The original lists goals but never says how it went. The revision leads with the result: 80% precision (0.84 F1) for the playoff model, about 25% average error for season wins, and 29% precision for the champion against a 6% random baseline. All three are verified in the deck and notebooks.
- It explains two smart decisions that hiring managers look for: removing data that would not be known at prediction time (no "cheating"), and choosing metrics that match the decision (precision, MAPE).
- It is honest about limits (the wins and champion models are not reliable enough to use), which reads as maturity, not weakness.
- "GOALS:" in caps and mixed bullet styles are replaced with a consistent format.
- Links to all three Colab notebooks and the Kaggle dataset are added as evidence.
- AI use is disclosed: ChatGPT helped enhance the championship model (from your Sources slide).

## Project 3: E-Commerce Print-on-Demand Store

**Original**

> - Founded and managed an end-to-end E-commerce operation selling T-shirts
> - Increased daily order volume through targeted Auburn Campus advertising and data-driven marketing strategies
> -Dashboards, Pivot Tables, Charts, Heat maps
> - Built Classification Model to predict customer delivery time threshold (80% Accuracy):

**Revised title:** Print-on-Demand Apparel Store

**Revised summary (card)**

> I started and ran an online print-on-demand T-shirt shop, marketed it around the Auburn campus, and used my own sales data to track customers and predict delivery times.

**What changed and why**

- Adds the real numbers your screenshots already show: 1,827 visits and 46 orders (2.5% conversion) over Dec 2023 to Feb 2024, and Alabama customers rising from 59% to 88% (Auburn from 38% to 95% of Alabama customers).
- "Delivery time threshold" becomes plain English: predicting whether an order arrives in more or less than one week, from distance, weekends, and holidays.
- Fixes formatting (missing space in "-Dashboards", random capitals, trailing colon).
- Two claims are held back until you confirm them (see below).
- **The "I LOVE EDGING" shirt mockup is left out.** It reads as an innuendo, and on a site meant for recruiters it is a risk with no upside. The data visuals tell a stronger story anyway.

## Needs your input before publishing

1. **Your role on each team project.** Which models (NBA) and which sections or platforms (audit) did you personally do?
2. **"Increased daily order volume."** Do you have before and after order counts? Without numbers, the draft says you aimed advertising at campus but does not claim the increase.
3. **"80% accuracy" for the delivery model.** The only visible evidence is a 15-order sample with 11 correct (73%). If you have the full test result, it goes back in.
4. **Auburn's numbers.** OK to show Auburn's internal social metrics (they are already public on Carrd through the report link)?
5. **The audit's context.** Class, club, or work with Auburn? Which course, if a class?
6. **Store status and tools.** Is the shop still open? Which print provider, design tools, and analysis tools (Excel? Python?) did you use?
7. **Teammates.** OK to name your teammates on the site?
8. **Contact.** Which email and LinkedIn should the new site show?
