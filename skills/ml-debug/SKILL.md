---
name: ml-debug
description: >
  Use this skill when the user's ML model is not working as expected. Triggers include:
  "model doesn't work", "low accuracy", "overfitting", "underfitting", "loss not decreasing",
  "loss is NaN", "training unstable", "model performance dropped", "predictions are bad",
  "validation loss increasing", "gradient explosion", "model not converging", "ML debugging",
  "why is my model overfitting", "help me debug my model", "model accuracy too low",
  "training loss stuck", "inference gives wrong results", "model drift".
  Also activate when the user shares training logs showing problematic patterns.
---

# ML Debug — Systematic Model Debugging

You are a senior ML engineer performing systematic diagnosis. Do not jump to fixes — diagnose first, then prescribe.

## Step 1: Symptom Classification

Identify which symptom category the problem falls into:

| Symptom | Category | Next Step |
|---------|----------|-----------|
| Training loss high, not decreasing | Non-convergence | Check Step 2a |
| Training loss low, validation loss high | Overfitting | Check Step 2b |
| Training loss low, validation loss low, metrics bad | Evaluation bug | Check Step 2c |
| Training loss oscillating / NaN | Instability | Check Step 2d |
| Model works in dev, fails in production | Serving bug | Check Step 2e |
| Performance degraded over time | Drift | Check Step 2f |

## Step 2: Root Cause Investigation

Follow the decision tree in `references/diagnosis-decision-tree.md`.

### 2a: Non-convergence
- Learning rate too high? → Reduce by 10x
- Data not normalized? → Check feature scales
- Gradient vanishing? → Check activation functions, try residual connections
- Bug in loss function? → Verify loss computation on 1 batch

### 2b: Overfitting
- Dataset too small? → Get more data or augment
- Model too complex? → Reduce capacity (fewer layers, smaller hidden dim)
- No regularization? → Add dropout, weight decay, early stopping
- Data leakage? → Run leakage audit (Rule 5)

### 2c: Evaluation Bug
- Wrong metric for the problem? → Verify metric matches business goal
- Class imbalance not handled? → Use class-weighted or balanced metrics
- Test set contaminated? → Verify train/test split integrity
- Metric computed incorrectly? → Compare against sklearn/standard implementation

### 2d: Instability
- NaN in gradients? → Add gradient clipping, reduce learning rate
- Batch size too small? → Increase batch size or use gradient accumulation
- Data has extreme outliers? → Clip or remove outliers
- Mixed precision issues? → Disable AMP, check for float16 overflow

### 2e: Serving Bug
- Preprocessing mismatch? → Compare training vs serving feature pipeline
- Feature drift in production? → Compare training vs serving feature distributions
- Model version mismatch? → Verify model artifact hash
- Batch vs single prediction difference? → Check batch norm, dropout in eval mode

### 2f: Drift
- Data distribution changed? → Compare recent vs training distributions
- Concept drift? → Retrain with recent data, add drift detection
- Feature pipeline changed? → Audit feature computation in production
- Label quality degraded? → Sample and manually verify recent labels

## Step 3: Data Investigation

If root cause might be data-related:

1. **Leakage scan**: Are any features derived from the target?
2. **Distribution check**: Has the data distribution shifted from training?
3. **Label quality**: Sample 100 examples, manually verify labels
4. **Feature consistency**: Are features computed identically in train and inference?

## Step 4: Fix Recommendations

Present fixes in priority order:

1. **High impact, low effort** (do first)
2. **High impact, high effort** (plan for)
3. **Low impact, low effort** (quick wins)
4. **Low impact, high effort** (skip unless desperate)

For each fix, state:
- What to change
- Expected impact
- How to verify the fix worked
- Risk of the change

**Done when**:
- [ ] Symptom classified
- [ ] Root cause identified (not just symptoms)
- [ ] Data investigation completed if relevant
- [ ] Fix recommendations provided in priority order
- [ ] User has agreed on next action
