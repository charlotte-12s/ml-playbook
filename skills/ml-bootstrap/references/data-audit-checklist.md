# Data Audit Checklist

Run these checks before training any model. Record findings.

## Volume & Shape
- [ ] Row count: ___
- [ ] Column count: ___
- [ ] Memory footprint: ___MB / GB
- [ ] Is the dataset too small for ML? (< 100 samples per class → flag)

## Target Distribution
- [ ] Class balance checked (binary: target ratio ___:___)
- [ ] Distribution plot generated (histogram / bar chart)
- [ ] Imbalance strategy decided (none / oversample / undersample / class weights)

## Missing Values
- [ ] Missing percentage per column calculated
- [ ] Columns with > 50% missing flagged
- [ ] Imputation strategy decided (drop / mean / median / mode / ML-based)

## Data Quality
- [ ] Duplicate rows checked (count: ___)
- [ ] Outliers identified (method: IQR / Z-score / domain knowledge)
- [ ] Constant columns identified (variance = 0)
- [ ] High-cardinality categorical columns flagged

## Temporal Checks
- [ ] Time column exists? (yes / no / N/A)
- [ ] Data sorted chronologically? (critical for time-series)
- [ ] Time gaps or missing periods identified
- [ ] Train/test split strategy: random / temporal (pick one, justify)

## Leakage Scan
- [ ] No target-adjacent features (e.g., target-encoded columns)
- [ ] No future information in features
- [ ] Test set not used in any preprocessing fit

## Feature Types
- [ ] Numeric features listed (count: ___)
- [ ] Categorical features listed (count: ___)
- [ ] Text features listed (count: ___)
- [ ] Image/audio features listed (count: ___)
- [ ] ID/identifier columns to drop listed

## Findings Summary
| Issue | Severity | Action |
|-------|----------|--------|
| ___ | High/Med/Low | ___ |
