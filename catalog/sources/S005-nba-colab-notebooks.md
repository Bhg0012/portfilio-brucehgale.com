# S005 NBA project Colab notebooks (3)

- Original links (from S003, Sources slide):
  - Playoff predictor (RandomForestClassifier): https://colab.research.google.com/drive/1xdHCXcwJQ7HGZlpK_V-RNARCcP3iWpc5?usp=sharing
  - Games won (DecisionTreeRegressor): https://colab.research.google.com/drive/1NFqS_ks75kcDFWU9OKRsoQkStnBnUHEi?usp=sharing
  - Championship predictor (SVC): https://colab.research.google.com/drive/1oBTAv06KM_OzIL2I5F3Okgxxh5jieCTZ?usp=sharing
- Received: 2026-10-19 (downloaded as .ipynb into `intake/carrd-site/decks/`)
- Type: Jupyter notebooks with saved outputs
- Date: around April 2025
- Author(s): not recorded per notebook
- Kind of material: working code behind the S003 presentation
- Related projects: [nba-predictive-modeling](../projects/nba-predictive-modeling.md)
- Confidentiality: none noted. All three links are publicly viewable.

## Summary

All three notebooks load the same file, `FORMODEL_NBAStats2005-2023.csv` (540 team-seasons x 24 columns, i.e. 30 teams x 18 seasons), from Google Drive with pandas, then train one scikit-learn model each.

## Key facts (from saved outputs)

**Playoff predictor (random forest)**
- Target `PLAYOFF`; predictors are per-game team stats; drops Season, TEAM, GP, GamesWon, PLAYOFF, Champion.
- 70/30 hold-out split (`random_state=2`), `RandomForestClassifier(n_estimators=200, random_state=2)`.
- Test set: 162 team-seasons. Class 1 (made playoffs): precision 0.80, recall 0.89, F1 0.84. Overall accuracy 0.81.
- Comments in this notebook mention "Over/Under_Week" and "Predicted_model1", the same column names as the store's delivery-time model (S002, gallery03). This suggests the same author built both (likely Bruce). **Confirm with Bruce.**

**Games won (decision tree)**
- Target `GamesWon`; drops Season, TEAM, GP, GamesWon, PLAYOFF, Champion.
- 70/30 hold-out (`random_state=7`): MAE 8.97 wins, RMSE 11.38, MAPE 24.40%. Ten random splits gave MAPE between about 25.7% and 28.1% (splits 1 to 5 shown).
- The 5-fold cross-validation cells have no saved output, and one refers to `model1`, which is not defined in this notebook.
- A markdown cell lists an IMDb data source (copy-paste leftover; the data is the Kaggle NBA set).
- Includes a scikit-learn tree plot and an export of predictions to a Google Sheet.

**Championship predictor (linear SVC)**
- Target `Champion`; predictors include PLAYOFF and GamesWon.
- Split by row order: first 210 rows train, remaining 330 test (rows are ordered newest season first).
- Test set: 11 champions among 330 team-seasons. Class 1: precision 0.29, recall 0.18, F1 0.22. Confusion matrix [[314, 5], [9, 2]]: 7 predicted champions, 2 correct.

## Conflicts with S003

- Wins model MAPE: S003 says 24.57% with 5-fold cross-validation; the notebook's saved hold-out run shows 24.40%. Use 24.57% (the presented figure) and describe it as "about 25%" in short copy.

## Notes for the case study

- Good decision to highlight: dropping columns that would not be known at prediction time, to avoid leaking the answer into the model.
- Honest limitation: the random splits mix seasons, so the models are not tested on truly future seasons. A time-based split would be the natural next step.
