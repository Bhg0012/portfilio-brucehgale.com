# Print-on-Demand Apparel Store

- Slug: print-on-demand-apparel-store
- Related experience: personal business
- Sources: S002 (store link https://brucesprintsus.etsy.com could not be read automatically)
- Work status: unknown (draft says completed; the Etsy shop URL still resolves). **Ask.**
- Website page: draft (`content/projects/print-on-demand-apparel-store/`)

## Summary

Bruce founded and ran a print-on-demand T-shirt shop on Etsy, marketed it around the Auburn campus, tracked sales with charts and maps, and built a model to predict whether delivery would take more or less than a week.

## Facts (with source IDs)

- Founded and managed an end-to-end e-commerce operation selling T-shirts (S002).
- Targeted Auburn campus advertising and data-driven marketing; Bruce says this increased daily order volume (S002, no numbers).
- Dashboards, pivot tables, charts, heat maps (S002).
- Shop stats Dec 2023 to Feb 2024: 1,827 visits, 46 orders, 2.5% conversion (S002 image).
- Customer state mix: Alabama 59% (2023) to 88% (2024); within Alabama, Auburn 38% to 95% (S002 image).
- Customer map concentrated in Alabama and the Southeast (S002 image).
- Delivery model: predicts over or under one week from distance, weekend, and holiday flags (S002 image). Bruce states 80% accuracy (S002).
- Platform: Etsy (S002 link). Print provider, design tools, ad channels: unknown.
- Dates: 2023 to 2024 at least (S002 images).

## Claims and evidence

| Claim | Evidence | Verified? |
| ----- | -------- | --------- |
| 1,827 visits, 46 orders, 2.5% conversion (Dec 2023 to Feb 2024) | S002 gallery01 stats screenshot | Yes |
| Alabama share 59% to 88%; Auburn share 38% to 95% | S002 gallery01 pie charts | Yes |
| Increased daily order volume | none | **Needs numbers** |
| Delivery model 80% accuracy | S002 text; sample image shows 11 of 15 correct (73%) | **Needs full test result** |

## Conflicts between sources

| Topic | Version A | Version B | Used | Why |
| ----- | --------- | --------- | ---- | --- |
| Delivery model accuracy | 80% (S002 text) | 11 of 15 sample orders correct (S002 image) | Neither yet | The sample is not the full test set; need the actual figure |

## Confidentiality

- The "I LOVE EDGING AT AUBURN CENTRAL DINING" mockup is an innuendo design. Not used in the draft; recommend leaving it off the professional site.
- Customer locations are aggregated (state and city shares), so no personal data is exposed.

## Visuals

| Candidate | Source | Shows | Use? | Alt text | Caption |
| --------- | ------ | ----- | ---- | -------- | ------- |
| `images/customer-locations-2023-vs-2024.jpg` | gallery01-7634f267 | Four pies | Cover | Four pie charts comparing 2023 and 2024 customers: Alabama grew from 59% to 88% of customers by state, and Auburn from 38% to 95% of Alabama customers | n/a |
| `images/customer-map.jpg` | gallery01-f98260f3 | 3D map | Figure | Map of the eastern United States with columns marking customer locations, clustered in Alabama and the Southeast | Mapping orders showed where customers actually were. |
| `images/shop-stats.jpg` | gallery01-7c76a8ed | Shop stats | Figure | Shop analytics for December 2023 to February 2024: 1,827 visits, 46 orders, and a 2.5% conversion rate | Three months of shop traffic and sales. |
| `images/delivery-time-predictions.jpg` | gallery03-a4093c86 | Model sample | Figure | Table of 15 orders with distance, weekend, and holiday flags, comparing actual and predicted delivery (over or under one week), with correct predictions in green and incorrect in red | A sample of the delivery model's predictions: 11 of these 15 orders were classified correctly. |

## Screenshots still needed

- [ ] Orders over time (to support "increased daily order volume")
- [ ] The delivery model's full evaluation (accuracy on the whole test set)
- [ ] The dashboard or pivot table view
- [ ] A product photo or mockup that is appropriate for employers (optional)

## Open questions for Bruce

- Is the store still running? When did it start?
- Which print-on-demand provider and design tools did you use?
- What did "targeted Auburn campus advertising" involve (channels, spend, posts)?
- Can you share order counts before and after the campus push?
- What tool did you use for the delivery model (Python and scikit-learn, like the NBA project?) and what was its full test accuracy?
- What tools made the dashboards, pivot tables, and heat maps (Excel?)
