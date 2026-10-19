# Predicting NBA Playoff Teams, Wins, and Champions

- Slug: nba-predictive-modeling
- Related experience: academic (BUAL 5610, April 2025)
- Sources: S002, S003, S005
- Work status: completed
- Website page: draft (`content/projects/nba-predictive-modeling/`)

## Summary

Three-person class project. Using 18 seasons of NBA team stats, the team built three Python models: playoff qualification (random forest), season wins (decision tree), and champion (linear SVC). The playoff model was the strongest at 80% precision.

## Facts (with source IDs)

- Problem and audience: which team stats drive success; useful to NBA teams and sports betting companies (S003).
- Objectives: forecast playoff teams, predict season wins, predict the champion (S002, S003).
- Constraints: COVID-shortened 2019 to 2021 seasons; injuries, trades, and firings not modeled (S003).
- Bruce's role: not stated per person. Carrd says Bruce "built predictive models" (S002). Notebook comments suggest Bruce wrote the playoff notebook (S005). **Ask.**
- Team: Bruce Gale, Tyler Kokoszynski, Braden Sinn (S003).
- Approach: Kaggle data 2005 to 2023 (540 team-seasons); dropped identifiers and outcomes not known in time; precision for classifiers, MAPE for regression (S003, S005).
- Tools: Python, pandas, scikit-learn, Google Colab, Google Drive, Google Sheets export (S005).
- AI during development: ChatGPT used to enhance the SVC model (S003).
- AI in the finished project: none.
- Results: RF precision 0.80, F1 0.84, accuracy 0.81 on 162 test team-seasons (S003, S005). DT MAPE 24.57% (S003; notebook hold-out 24.40%, S005). SVC precision 0.29, recall 0.18 on 330 test team-seasons with 11 champions (S003, S005).
- Dates: April 2025 (S003).

## Claims and evidence

| Claim | Evidence | Verified? |
| ----- | -------- | --------- |
| Playoff model: 80% precision, 0.84 F1 | S003 slide 6; S005 classification report | Yes |
| Wins model: MAPE 24.57% | S003 slide 8 (notebook shows 24.40% hold-out) | Yes, minor conflict noted |
| Wins model best on teams above 55 or below 25 wins | S003 slide 8 (team-wins table) | Yes (team's interpretation) |
| Champion model: 29% precision vs 6.25% random baseline | S003 slide 10; S005 | Yes |
| Bruce built the models | S002 (Bruce's own claim) | Needs per-person detail |

## Conflicts between sources

| Topic | Version A | Version B | Used | Why |
| ----- | --------- | --------- | ---- | --- |
| Wins MAPE | 24.57%, 5-fold (S003) | 24.40%, hold-out (S005) | 24.57% | Final presented figure; 5-fold output not saved |
| Dataset years | 2005 to 2023 (S003, file name) | Kaggle title says 2001 to 2023 (S003 link) | 2005 to 2023 | The file used covers 2005 to 2023 |

## Confidentiality

None. Ask before naming teammates on the site (draft says "a team of three").

## Visuals

| Candidate | Source | Shows | Use? | Alt text | Caption |
| --------- | ------ | ----- | ---- | -------- | ------- |
| `images/playoff-model-results.png` | S003 slide 6 | Classification report and actual vs predicted | Cover | Slide showing the playoff model's classification report, with 80% precision and 0.84 F1 highlighted, next to a table of predicted and actual playoff results | n/a |
| `images/season-wins-predictions.png` | S003 slide 8 | Wins model error and examples | Figure | Slide reporting a 24.57% mean absolute percentage error, with actual and predicted wins for five team-seasons | Win totals were easiest to predict for the very best and worst teams. |
| `images/decision-tree-plot.png` | S003 slide 7 | Tree plot and setup | Figure | Slide with the decision tree regressor setup and a plot of the fitted tree | The wins model: a decision tree limited to a depth of 15, checked with 5-fold cross-validation. |

## Screenshots still needed

- [ ] Optional: a clean chart of predicted vs actual wins for all test teams (would be stronger than the five-row table).

## Open questions for Bruce

- Which model(s) and sections did you personally build or write? (The page needs your specific contributions before it can be published.)
- OK to name Tyler and Braden on the site?
- What exactly did ChatGPT help with on the SVC model?
- What do you consider the main lesson from this project? (Draft has limitations and proposed improvements only.)
- The draft's "What I would improve" items were proposed by Claude from the notebooks. Keep, edit, or remove?
