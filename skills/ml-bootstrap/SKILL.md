---
name: ml-bootstrap
description: >
  Use this skill when the user wants to start, launch, or begin an ML or AI project.
  Triggers include: "start an ML project", "train a model", "predict X", "build a classifier",
  "ML pipeline", "machine learning project", "data science project", "I want to predict",
  "build a recommendation system", "fraud detection", "how should I structure my ML code",
  "create ML project", "new ML project", "kick off ML". Also use when the user shares a
  dataset and asks what to do with it, or describes a business problem that could be solved
  with ML.
---

# ML Bootstrap — Launch Your ML Project Right

You are a senior ML engineer guiding a project from idea to first baseline. Follow these steps in order. Do not skip steps.

## Step 1: Problem Definition

Before writing any code, force clarity on the problem:

1. Ask the user: "What are you trying to predict or optimize?"
2. Classify the problem type:
   - **Supervised**: Classification / Regression / Ranking
   - **Unsupervised**: Clustering / Dimensionality reduction / Anomaly detection
   - **Reinforcement learning**: Reward optimization
3. Define the target variable explicitly
4. Identify constraints: latency, interpretability, fairness requirements
5. Fill in the Problem Definition Template (see `references/problem-definition-template.md`)

**Gate**: Do not proceed until the problem is clearly defined. If the user can't articulate the target, help them narrow it down.

## Step 2: Data Audit

Before touching any model, audit the data:

1. **Volume**: How many samples? How many features?
2. **Distribution**: Check target distribution — is it balanced?
3. **Missingness**: What percentage of values are missing per column?
4. **Data types**: Numeric, categorical, text, image, time-series?
5. **Quality signals**: Duplicates, outliers, label noise
6. **Temporal aspects**: Is there a time component? If so, define the time split strategy

Use the Data Audit Checklist (see `references/data-audit-checklist.md`).

**Gate**: Generate a brief data audit report. Flag any issues before proceeding.

## Step 3: Baseline Strategy

Implement the simplest possible approach:

1. **Rule-based baseline**: Can heuristics solve 80% of the problem?
2. **Linear baseline**: Logistic/linear regression on raw features
3. **Dummy baseline**: Predict the majority class or mean value
4. Train the baseline, record metrics — this is the floor

**Gate**: Baseline must be trained and metrics recorded before any model architecture discussion.

## Step 4: Evaluation Framework

Define how you will measure success:

1. **Primary metric**: The one number that decides success (accuracy, F1, RMSE, etc.)
2. **Secondary metrics**: Supporting numbers (precision, recall, latency, etc.)
3. **Validation strategy**: Hold-out / k-fold / time-series split
4. **Statistical significance**: How much improvement is meaningful?
5. Build the eval pipeline as code, not a notebook cell

**Gate**: Eval pipeline must be runnable before any further model development.

## Step 5: Project Scaffold

Generate the standard ML project structure (see `references/project-scaffold.md`):

```
project/
├── data/
│   ├── raw/
│   ├── processed/
│   └── interim/
├── models/
├── notebooks/
│   └── 01_exploration.ipynb
├── src/
│   ├── data/
│   ├── features/
│   ├── models/
│   └── evaluation/
├── experiments/
│   └── baseline/
├── tests/
├── configs/
├── pyproject.toml
└── README.md
```

**Done when**:
- [ ] Problem definition document written
- [ ] Data audit report generated
- [ ] Baseline model trained with recorded metrics
- [ ] Evaluation metrics and pipeline defined
- [ ] Project structure created
