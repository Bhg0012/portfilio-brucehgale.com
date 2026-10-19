# S003 NBA Predictive Modeling deck

- Original link: https://docs.google.com/presentation/d/1CwDSz2KzgPmYG47JZApX1mRpewato4KZ57DbeW3N0vg/edit?usp=sharing (linked from S002)
- Received: 2026-10-19 (exported as text and PDF; PDF saved in `intake/carrd-site/decks/`)
- Type: Google Slides, 12 slides
- Date of the document itself: April 2025
- Author(s): Bruce Gale, Tyler Kokoszynski, Braden Sinn
- Kind of material: final class presentation, BUAL 5610
- Related projects: [nba-predictive-modeling](../projects/nba-predictive-modeling.md)
- Related experience: none (academic)
- Confidentiality: none noted. Teammates are named on the title slide; name them on the site only if Bruce agrees.

## Summary

A three-person class project that asks how well NBA team statistics predict three outcomes: making the playoffs, total regular-season wins, and winning the championship. The team used a Kaggle dataset of team stats for 2005 to 2023, framed the business problem for NBA teams and sports betting companies, chose precision as the metric for the two classification models and MAPE for the regression model, and built three scikit-learn models in Python (one Colab notebook each, see S005).

Results: the random forest playoff model was best (80% precision, 0.84 F1). The decision tree wins model had a 24.57% MAPE and did best on very good or very bad teams. The linear SVC championship model reached 29% precision, which the team compares with a 6.25% chance of picking one champion from 16 playoff teams at random. The team concludes that only the playoff model is reliable enough for real use.

## Key facts

- Problem and audience: NBA teams want to focus on the stats that drive success; betting companies could use the models to set lines.
- Bruce's role and contributions (as stated): not broken out by person. Bruce's Carrd says he "built predictive models".
- Approach and implementation: Kaggle dataset 2005 to 2023; every major offensive and defensive per-game stat as predictors; dropped Season, TEAM, GP, and outcome columns that would not be known at prediction time ("not timely"); hold-out validation for the playoff and championship models, 5-fold for the wins model.
- Decisions: precision for classification "to ensure our positive predictions are accurate"; MAPE for regression; COVID-shortened 2019 to 2021 seasons kept but flagged; injuries, trades, and firings out of scope.
- Tools: Python, scikit-learn (RandomForestClassifier, DecisionTreeRegressor, SVC, tree plot), Google Colab.
- AI involvement: "Chat GPT used to enhance SupportVectorClassification Model" (Sources slide). Development assistance only; no AI in the finished models.
- Results: see summary.
- Dates: April 2025.

## Images and attachments

| Slide | What it shows | Usable publicly? |
| ----- | ------------- | ---------------- |
| 1 | Title over an NBA logo image | Avoid (NBA trademark imagery) |
| 6 | Playoff model classification report and actual vs predicted table | Yes (used as cover) |
| 7 | Decision tree plot from scikit-learn | Yes |
| 8 | Wins model: MAPE and "Team wins" actual vs predicted table | Yes |
| 11 | Results with model podium | Yes |
| 9, 10 | Championship model; slide 9 uses a Larry O'Brien trophy photo | Use slide 10 only if needed |

## Plans, ideas, and unfinished items

None. The deck is a finished presentation.

## Confidential or sensitive items

None. Third-party photos (NBA logo, trophy, playoff logo) should not be reused on the site.

## Screenshots or follow-ups the document asks for

None.

## Extracted text

Full text export of the deck:

```
NBA Predictive Modeling (Python)
Bruce Gale, Tyler Kokoszynski, Braden Sinn 
BUAL 5610 | April 2025

Introduction
Context:NBA teams and sports betting companies rely on historical data to forecast outcomes. Using stats from 2005–2023, we aim to test how well team metrics predict wins, playoff success, and championships.
Business Problem:NBA teams want to focus on key stats that drive success. Teams can use our model to determine how many games they will win, and how they will perform in the postseason. Also, betting companies can use our models to predict betting lines based on team performance.
Evaluation Metrics:                                                                       For classification (e.g., playoff/championship success), we will primarily use precision to ensure our positive predictions are accurate.
For regression (e.g., # of games won), the main metric we will evaluate is Mean Absolute Percentage Error.

Project Goals:
Forecast playoff teams
Predict total season wins per team
Predict the NBA champion

Data Exploration and Processing
We used NBA team data from 2005-2023
Every major offensive and defensive metric (PTS, AST, 3PT%, etc.) were recorded
Each metric is used as a predictor that determines the target variables: Wins, Playoffs, and Champion


Preprocessing Assumptions & Caveats
Data from 2019-2021 may affect outcomes, as all teams played unequal amount of games during this time (Mid-Season cancellation/less games due to Covid-19)
It is safe to assume this won’t happen again in foreseeable future

Unpredictable events like injuries, firings, and trades can affect team success and are not accounted for. It is difficult to quantify and predict these confounding variables, so we will only use team perfomance stats to build the our predictive models

1: Who Will Make the Playoffs? (RandomForestClassifier)
Preprocessing

Target Variable: PLAYOFF
Predictors: All major team stats
We dropped columns:
Season (irrelevant)
TEAM (irrelevant)
GP (irrelevant)
GamesWon (not timely)
PLAYOFF (Target Variable)
Champion (not timely)
Cross-Validation method: Hold-out
Model Parameters: 200 estimators, random state = 2


1: Who Will Make the Playoffs? (RandomForestClassifier)
The model correctly predicted positive playoff predictions 80% of the time                         (80% precision, 84% f1-score)


Predicted vs actual playoff result of 10 random seasons (1 or Green = made playoffs)


Actual    Predicted

2: How Many Games Will They Win? (DecisionTreeRegressor)
Preprocessing

Target Variable: GamesWon
Predictors: All major team stats
We dropped columns:
Season (irrelevant)
TEAM (irrelevant)
GP (irrelevant)
GamesWon (Target Variable)
PLAYOFF (not timely)
Champion (not timely)
Cross-Validation method: 5-Fold
Model Parameters: Max Depth = 15, random state = 7 (lowest variation)

Tree Plot using sklearn
 

2: How Many Games Will They Win? (DecisionTreeRegressor)
MAPE of 24.57%
(on average, the model’s predictions are off by about 24.57%)
This model is great at predicting the best and worst teams (e.g., >55 wins or <25 wins), but less accurate at predicting the more average teams
Likely because the top and bottom percentile teams have stats that stand out, being either really good or really bad. Meanwhile, the average teams have a mix of good and bad stats, creating lots of variance/uncertainty in the model when predicting the number of games won


2015 Warriors
2020 Clippers
Actual
Predicted
2019 Knicks
2017 Celtics
2021 Cavs
Team wins

3. Who Will Win the Championship? (SupportVectorClassification)
Preprocessing

Target Variable: Champion
Predictors: All major team stats, PLAYOFF, GamesWon
We dropped columns:
Season (irrelevant)
TEAM (irrelevant)
GP (irrelevant)
Champion (Target Variable)
Cross-Validation method: Hold-out
Model Parameters: Kernel = Linear


3. Who Will Win the Championship? (SupportVectorClassification)
Our SVC model had a precision of 29%
While this sounds low, it is relatively high considering how difficult it is to predict one championship winner amongst 16 playoff teams (1/16 = 6.25%)




Results
Best Model: Playoffs (RandomForestClassifier) with 80% precision. This is a precise tool that can be used to predict if a team is on track to make the playoffs based on their performance stats.

The GamesWon (DecisionTreeRegressor) and Championship (SVC) models perform well given the data they were fed, but aren’t consistent enough to be reliably used by NBA teams or sports betting companies
1st
2nd
3rd
SVC
Decision Tree
Random Forest

Sources
Data: https://www.kaggle.com/datasets/supremeleaf/nba-regular-season-team-stats-2001-2023
Chat GPT used to enhance SupportVectorClassification Model

Our Models: 
Playoff Predictor (RandomForestClassification)-  https://colab.research.google.com/drive/1xdHCXcwJQ7HGZlpK_V-RNARCcP3iWpc5?usp=sharing

Games Won (DecisionTreeRegressor)- https://colab.research.google.com/drive/1NFqS_ks75kcDFWU9OKRsoQkStnBnUHEi?usp=sharing

Championship Predictor (SupportVectorClassification)- https://colab.research.google.com/drive/1oBTAv06KM_OzIL2I5F3Okgxxh5jieCTZ?usp=sharing



```
