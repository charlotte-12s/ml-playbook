# ML Debugging Decision Tree

Follow this tree from top to bottom. Stop when you find the root cause.

```
Problem reported
│
├─ Loss not decreasing?
│   ├─ Training loss not decreasing?
│   │   ├─ Loss is NaN
│   │   │   ├─ Check for division by zero in loss
│   │   │   ├─ Check for log(0) or log(negative)
│   │   │   └─ Add gradient clipping (max_norm=1.0)
│   │   ├─ Loss plateaus at high value
│   │   │   ├─ Learning rate too high? → Reduce 10x
│   │   │   ├─ Data not normalized? → Standardize features
│   │   │   ├─ Wrong loss function? → Verify matches problem type
│   │   │   └─ Bug in forward pass? → Test with 1 batch, print outputs
│   │   └─ Loss oscillates
│   │       ├─ Batch size too small? → Increase
│   │       ├─ Learning rate too high? → Reduce
│   │       └─ Data shuffled? → Enable shuffling
│   └─ Training loss decreases but validation loss doesn't?
│       ├─ Gap grows → Overfitting
│       │   ├─ More data (or augment)
│       │   ├─ Reduce model capacity
│       │   ├─ Add regularization (dropout, weight decay)
│       │   ├─ Early stopping
│       │   └─ Check for data leakage
│       └─ Both flat → Underfitting
│           ├─ Increase model capacity
│           ├─ Better features
│           ├─ Reduce regularization
│           └─ Train longer
│
├─ Loss fine but metrics bad?
│   ├─ Wrong metric for problem? → Recheck metric choice
│   ├─ Class imbalance? → Use balanced metrics (F1, balanced accuracy)
│   ├─ Threshold suboptimal? → Tune decision threshold
│   └─ Evaluation code bug? → Compare with sklearn implementation
│
├─ Works in dev, fails in production?
│   ├─ Train-serving skew
│   │   ├─ Preprocessing different? → Unify pipeline
│   │   ├─ Feature encoding mismatch? → Save encoders with model
│   │   └─ Model not in eval mode? → Call model.eval()
│   ├─ Batch vs single inference
│   │   ├─ Batch norm using batch stats? → Use running stats
│   │   └─ Stateful preprocessing? → Reset state between calls
│   └─ Latency too high
│       ├─ Model too large? → Quantize, distill, or reduce
│       ├─ Batch inference possible? → Group requests
│       └─ Framework overhead? → Try ONNX Runtime / TensorRT
│
└─ Performance degraded over time?
    ├─ Data drift
    │   ├─ Feature distribution shifted? → Monitor with PSI/KS test
    │   └─ Concept drift? → Retrain with recent data
    ├─ Pipeline changes
    │   ├─ Upstream feature changed? → Add feature versioning
    │   └─ Schema changed? → Add schema validation
    └─ Label quality
        ├─ New labelers? → Audit label quality
        └─ Labeling guidelines changed? → Realign
```

## Quick Diagnostic Commands

### PyTorch
```python
# Check for NaN in model output
assert not torch.isnan(output).any(), "NaN detected in model output"

# Check gradient norms
for name, param in model.named_parameters():
    if param.grad is not None:
        print(f"{name}: grad_norm={param.grad.norm().item():.4f}")

# Overfit a single batch (sanity check)
# If model can't overfit 1 batch, there's a bug
for epoch in range(100):
    loss = train_step(single_batch)
    if epoch % 10 == 0:
        print(f"Epoch {epoch}: loss={loss:.6f}")
```

### Scikit-learn
```python
# Verify train/test split integrity
assert len(set(train_idx) & set(test_idx)) == 0, "Data leakage in split!"

# Check feature distributions
import pandas as pd
for col in X_train.columns:
    train_mean = X_train[col].mean()
    test_mean = X_test[col].mean()
    diff_pct = abs(train_mean - test_mean) / (abs(train_mean) + 1e-8) * 100
    if diff_pct > 20:
        print(f"WARNING: {col} distribution shift: train={train_mean:.2f}, test={test_mean:.2f} ({diff_pct:.1f}%)")
```
