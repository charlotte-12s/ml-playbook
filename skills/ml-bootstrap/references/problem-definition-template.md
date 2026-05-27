# Problem Definition Template

## Problem Statement
**What are you trying to predict or optimize?**

[One sentence description]

## Problem Type
- [ ] Classification (binary / multiclass / multilabel)
- [ ] Regression
- [ ] Ranking
- [ ] Clustering
- [ ] Anomaly detection
- [ ] Reinforcement learning
- [ ] Other: ___

## Target Variable
**Name**: ___
**Type**: ___
**Distribution**: Balanced / Imbalanced (ratio: ___)

## Success Criteria
**Primary metric**: ___
**Target value**: ___
**Baseline value**: ___

## Constraints
- **Latency requirement**: ___ms max inference time
- **Interpretability**: Required / Not required
- **Fairness**: Protected attributes to consider: ___
- **Data freshness**: Real-time / Batch / Periodic retraining
- **Budget**: Compute budget, API call limits

## Business Impact
**What happens if the model is wrong?**
- False positive cost: ___
- False negative cost: ___

## Stakeholders
**Who will use the output?** ___
**Who will monitor the model?** ___
