# Data Science Projects — Aman Kag

**Portfolio:** https://amankag.github.io/data-science-projects/

**Melbourne, Australia**
[linkedin.com/in/amankag](https://linkedin.com/in/amankag) · [github.com/amankag](https://github.com/amankag) · info.amankag@gmail.com

> Master of Data Science, Deakin University (2022–2024) · Bachelor of Computer Science (2016–2020)

For data analytics projects, visit: [Manufacturing Quality Dashboard](https://amankag.github.io/manufacturing-quality-dashboard/Website/)

---

## About

This repository contains three data science projects completed as part of my postgraduate studies in Data Science at Deakin University. The projects span supervised learning, unsupervised learning, deep learning, and SQL-based data analysis — each built around a different domain and a different set of techniques.

Every notebook is self-contained, reads from a local `Dataset/` folder, and can be run top-to-bottom in Jupyter with no cloud setup required.

---

## Projects at a Glance

| # | Project | Type | Key Technique | Best Result |
|---|---|---|---|---|
| 1 | Diabetes Risk — Elderly Study | Supervised + Unsupervised + Deep Learning | K-Means feature engineering + Ensemble (RF + DNN) | 91.2% accuracy |
| 2 | Sleep & Athletic Injury Prediction | Supervised + Deep Learning | Dual-input Neural Network | 96% accuracy |
| 3 | NYC Flights 2013 — SQL vs Pandas | Data Analysis | Dual-implementation with result validation | 17 queries verified |

---

## Project 1 — Diabetes Risk Analysis: Elderly Population

**Folder:** `Diabetes-Elderlies-Analysis/`

### Overview

This study focuses specifically on elderly patients aged 55 to 80, examining how diabetes risk factors behave in older adults compared to the general population. In this dataset, diabetes prevalence reaches nearly 22% in the 68–75 age group, and patients with heart disease are nearly twice as likely to have diabetes — patterns that a general population model would not capture as clearly.

The study compares multiple machine learning approaches across the same dataset, documents the reasoning behind each technique choice, and identifies which combination of methods produces the strongest result for this specific population.

### Dataset

| Property | Detail |
|---|---|
| File | `ElderlyDiabetesDataset.csv` |
| Rows | 30,822 |
| Age range | 55 to 80 years |
| Target | `diabetes` — binary (0 = No, 1 = Yes) |
| Diabetes prevalence | ~19% overall, rising to 22% in the 68–75 age group |
| Key features | Age, HbA1c level, blood glucose, BMI, hypertension, heart disease, smoking history |

### Techniques and Reasoning

| Algorithm | Type | Why This Was Used |
|---|---|---|
| K-Means Clustering | Unsupervised | HbA1c and blood glucose are strongly correlated. Rather than pass both as raw features, K-Means grouped patients into 3 glycaemic profiles — normal, borderline, and high-risk — creating a single `cluster` feature that captures this relationship more cleanly |
| Random Forest | Supervised | Handles mixed feature types well, is robust to outliers, provides built-in feature importance, and performs well on tabular clinical data without requiring heavy preprocessing |
| Logistic Regression | Supervised | Used as the baseline — simple and interpretable, sets the minimum performance bar for comparison |
| Support Vector Machine | Supervised | Captures non-linear decision boundaries using the RBF kernel, relevant where clinical risk thresholds are not linearly separable |
| Decision Tree | Supervised | Included for interpretability — the prediction path can be traced step by step, which is useful in clinical contexts |
| Naive Bayes | Supervised | A probabilistic baseline — fast and simple, but assumes feature independence which does not hold strongly here |
| Gradient Boosting | Supervised | Builds models sequentially, correcting errors from the previous step — often outperforms single-tree approaches on structured tabular data |
| Deep Neural Network (Keras) | Deep Learning | Captures complex non-linear interactions between features. Hyperparameters tuned using Keras Tuner with Hyperband search strategy |
| Ensemble (RF + DNN) | Ensemble | DNN predictions were stacked as an additional input feature into Random Forest — combining the pattern-recognition depth of the neural network with the stability of the tree-based model |
| TomekLinks + NearMiss-2 | Resampling | The dataset is imbalanced (~81% non-diabetic). TomekLinks removes borderline overlapping samples and NearMiss-2 undersamples the majority class — applied before training to prevent the model defaulting to the majority class |

### Results

| Rank | Model | Accuracy | Precision | Recall | F1 Score |
|---|---|---|---|---|---|
| 1 | Random Forest (tuned) | 91.2% | 95.8% | 86.0% | 90.6% |
| 2 | Gradient Boosting | 90.7% | 97.1% | 83.8% | 89.9% |
| 3 | Decision Tree | 90.1% | 97.7% | 82.1% | 89.2% |
| 4 | SVM | 89.8% | 96.8% | 82.2% | 88.9% |
| 5 | Naive Bayes | 80.5% | 83.9% | 75.3% | 79.4% |
| 6 | Logistic Regression | 78.2% | 79.7% | 75.6% | 77.6% |
| — | DNN (Keras Tuner best) | 88.6% | 89.0% | 88.0% | 88.5% |
| — | Ensemble (RF + DNN) | 91.2% | 92.0% | 91.0% | 91.5% |

All classical models were tuned with GridSearchCV. The Ensemble matched Random Forest on accuracy while improving the overall F1 score.

---

## Project 2 — Sleep and Athletic Injury Prediction

**Folder:** `Sleep-Injury-Prediction-Model/`

### Overview

This project investigates whether athletic injury risk can be predicted from daily health readings — sleep quality, blood pressure, BMI, and stress levels. The framing reflects the growing use of wearable health devices in sports, where this type of data is collected daily but rarely used for injury prevention in a structured way.

Injury risk is treated as a 3-class classification problem — Fit, Non-Fit, and Highly Non-Fit — and a custom neural network architecture is designed to give additional learning capacity to the features identified as most predictive.

### Dataset

| Property | Detail |
|---|---|
| File | `sleep_data_final.csv` |
| Rows | 374 |
| Target | `Injury Risk` — 3 classes (Fit, Non-Fit, Highly Non-Fit) |
| Key features | Sleep duration, quality of sleep, BMI category, blood pressure (systolic + diastolic split), stress level, heart rate, physical activity level |

### Techniques and Reasoning

| Algorithm | Type | Why This Was Used |
|---|---|---|
| Random Forest | Supervised | Used solely for feature importance analysis — to identify which of the 30+ features were the most predictive before building the neural network |
| Dual-input Neural Network (Keras) | Deep Learning | A custom architecture where the top 7 features by importance are routed through a heavier subnetwork (128 → 64 neurons) and remaining features through a lighter subnetwork (32 neurons). Both branches are concatenated before the final classification layer — giving more capacity to features that carry more signal |
| Class weights (`compute_class_weight`) | Resampling | The dataset has more Fit athletes than Non-Fit. Without weighting, the model would bias predictions toward the majority class. Class weights ensure each class contributes proportionally to the training loss |

### Results

| Class | Precision | Recall | F1 Score | Test Samples |
|---|---|---|---|---|
| Fit | 98% | 100% | 99% | 42 |
| Non-Fit | 100% | 91% | 95% | 32 |
| Highly Non-Fit | 33% | 100% | 50% | 1 |
| **Overall** | **98%** | **96%** | **97%** | **75** |

Overall test accuracy: **96%**

Note: The Highly Non-Fit class had only 1 test sample, so its individual metrics are not statistically reliable. Performance on the Fit and Non-Fit classes, which together make up 99% of the test set, is the meaningful result.

---

## Project 3 — NYC Flights 2013: SQL vs Pandas

**Folder:** `Nyc-Flight-Sql-Analysis/`

### Overview

This project analyses the NYC Flights 2013 dataset — covering all flights departing from JFK, LGA, and EWR across five related tables — using both SQL (SQLite) and Pandas. Every analytical query is implemented in both languages and validated using `pd.testing.assert_frame_equal` to confirm both approaches produce identical results.

The project was completed as part of the SIT731 postgraduate unit at Deakin University and focuses on demonstrating fluency in both SQL and Python for structured data querying, as well as understanding how to work with relational data across multiple joined tables.

### Dataset

| File | Description | Rows |
|---|---|---|
| `nycflights13_flights_csv.gz` | All 2013 flight records | 336,776 |
| `nycflights13_airlines_csv.gz` | Carrier names | 16 |
| `nycflights13_airports_csv.gz` | Airport details with coordinates | 1,458 |
| `nycflights13_planes_csv.gz` | Aircraft metadata | 3,322 |
| `nycflights13_weather_csv.gz` | Hourly weather at origin airports | 26,130 |

### Techniques Used

| Technique | Purpose |
|---|---|
| SQL (SQLite via `sqlite3`) | All 5 datasets loaded into a relational database and queried using standard SQL — filtering, aggregation, grouping, joins, subqueries |
| Pandas | Parallel implementation of every SQL query using DataFrame operations including `.groupby()`, `.merge()`, `.sort_values()`, and boolean indexing |
| `pd.testing.assert_frame_equal` | Confirms SQL and Pandas produce identical results for all 17 queries |
| Multi-table JOINs | Queries 15–17 join flights, planes, airlines, and weather tables using LEFT JOIN and INNER JOIN |
| Subqueries | Query 16 uses a subquery to extract distinct carrier-aircraft pairs before joining to planes and airlines |

### Query Coverage

Queries progress from simple filtering through to multi-table relational analysis:

| Range | Focus |
|---|---|
| Q1–Q5 | Filtering — distinct values, conditional selection, NULL handling |
| Q6–Q9 | Aggregation — MIN, AVG, MAX, COUNT with ORDER BY and LIMIT |
| Q10–Q14 | Grouping — GROUP BY, HAVING, manufacturer analysis |
| Q15–Q17 | Multi-table JOINs — flights joined with planes, airlines, and weather data |

### Key Learning

SQL proved more readable for set-based operations like `GROUP BY`, `HAVING`, and multi-table joins. Pandas offered more flexibility for sequential transformations and chained operations. The dual-implementation approach confirmed that both tools arrive at the same answer through different paths — and that understanding both is more valuable than relying on one.

---

## Repository Structure

```
Data_Science_Projects/
│
├── Diabetes-Elderlies-Analysis/
│   ├── Code file/
│   │   └── Diabetes_Elderlies_Model_code.ipynb
│   └── Dataset/
│       └── ElderlyDiabetesDataset.csv
│
├── Nyc-Flight-Sql-Analysis/
│   ├── Code file/
│   │   └── NYC_Flight_Analysis_By_AK.ipynb
│   └── Dataset/
│       ├── nycflights13_flights_csv.gz
│       ├── nycflights13_airlines_csv.gz
│       ├── nycflights13_airports_csv.gz
│       ├── nycflights13_planes_csv.gz
│       └── nycflights13_weather_csv.gz
│
└── Sleep-Injury-Prediction-Model/
    ├── Code file/
    │   └── ModelSleepAnalysis.ipynb
    └── Dataset/
        └── sleep_data_final.csv
```

---

## How to Run

```bash
pip install pandas numpy matplotlib seaborn scikit-learn tensorflow keras-tuner imbalanced-learn
```

1. Clone this repository
2. Navigate into any project folder
3. Open the notebook inside `Code file/` in Jupyter Notebook or JupyterLab
4. Run all cells top to bottom — datasets are already in the `Dataset/` folder

---

## Tech Stack

| Area | Tools |
|---|---|
| Languages | Python 3, SQL |
| Data manipulation | Pandas, NumPy |
| Machine learning | Scikit-learn |
| Deep learning | TensorFlow, Keras |
| Hyperparameter tuning | Keras Tuner (Hyperband) |
| Class imbalance | Imbalanced-learn (TomekLinks, NearMiss) |
| Database | SQLite3 |
| Visualisation | Matplotlib, Seaborn |
