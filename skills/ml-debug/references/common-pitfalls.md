# Common ML Pitfalls

A catalog of frequently encountered ML mistakes, organized by project phase.

## Data Phase

| Pitfall | Symptom | Fix |
|---------|---------|-----|
| Using future data as features | Unrealistically good training performance | Audit: "Can I get this feature at inference time?" |
| Target leakage | Test accuracy >> expected | Remove target-derived features before split |
| Not stratifying the split | High variance in metrics | Use stratified split for classification |
| Ignoring time ordering | Train/test from same time period | Use temporal split for time-series |
| Duplicates in dataset | Inflated metrics | Deduplicate before splitting |
| Imbalanced classes not handled | High accuracy on majority class only | Use F1/balanced accuracy, resample, or reweight |

## Feature Engineering Phase

| Pitfall | Symptom | Fix |
|---------|---------|-----|
| Fitting encoders on full dataset | Slightly inflated metrics | Fit only on train, transform test |
| Target encoding without regularization | Leakage from target | Use cross-fold encoding or add noise |
| High-cardinality one-hot encoding | Sparse, high-dim features | Use hashing trick or embedding |
| Not handling missing values | Model crashes on production | Add explicit missing handling |
| Feature scale mismatch | Slow convergence or NaN | Normalize/standardize features |

## Training Phase

| Pitfall | Symptom | Fix |
|---------|---------|-----|
| Learning rate too high | Loss diverges or oscillates | Reduce LR by 10x |
| Not setting random seeds | Non-reproducible results | Set seed in numpy, torch, python random |
| Training on CPU when GPU available | Slow training | Check device, move model and data to GPU |
| Not using eval mode in validation | Inflated validation metrics | Call model.eval() before validation |
| Gradient explosion | Loss becomes NaN | Add gradient clipping |

## Evaluation Phase

| Pitfall | Symptom | Fix |
|---------|---------|-----|
| Using accuracy on imbalanced data | 99% accuracy but model is useless | Use F1, AUC, or balanced accuracy |
| Optimizing on test set | Overfit to test set | Use separate validation set for tuning |
| Not reporting confidence intervals | Overconfident in small improvements | Use bootstrap or cross-validation CI |
| Ignoring subgroup performance | Model biased against minorities | Evaluate per-subgroup metrics |

## Deployment Phase

| Pitfall | Symptom | Fix |
|---------|---------|-----|
| No monitoring | Drift detected too late | Add data drift and performance monitoring |
| Hardcoded paths | Fails in different environments | Use config files and environment variables |
| Not versioning models | Can't rollback | Use model registry (MLflow, DVC) |
| No input validation | Crashes on malformed input | Add schema validation at serving endpoint |
| Notebook-only code | Can't deploy | Refactor to modular Python packages |
