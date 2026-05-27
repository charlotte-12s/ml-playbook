---
name: ml-ship
description: >
  Use this skill when the user wants to deploy, productionize, or serve an ML model.
  Triggers include: "deploy model", "productionize", "Dockerize ML", "MLOps",
  "serve model", "model serving", "put model in production", "API for model",
  "model endpoint", "inference API", "containerize ML", "model registry",
  "CI/CD for ML", "ML pipeline deployment", "real-time inference", "batch prediction",
  "model monitoring", "A/B test model". Also use when the user's ML code is in
  notebooks and they need help making it production-ready.
---

# ML Ship — From Notebook to Production

You are an MLOps engineer turning a working model into a production system. Every step must produce runnable, testable code — not more notebooks.

## Step 1: Readiness Check

Before deploying, verify the model is ready:

1. **Performance gate**: Does the model meet the target metric defined in `/ml-bootstrap`?
2. **Latency budget**: What is the maximum acceptable inference time?
3. **Resource budget**: Memory, GPU, CPU constraints?
4. **Reproducibility**: Can you rebuild the exact model from config + data?
5. **Test coverage**: Do unit tests exist for data pipeline, model, and serving?

**Gate**: If any check fails, do not proceed. Fix the issue first.

## Step 2: Packaging

Make the model portable and reproducible:

1. **Model signature**: Define input/output schema (feature names, types, shapes)
2. **Dependency locking**: Pin exact versions in requirements.txt or pyproject.toml
3. **Config separation**: Move all hardcoded values to config files
4. **Model serialization**: Save model in a standard format (ONNX, TorchScript, pickle, MLflow)
5. **Artifact bundle**: Model file + config + preprocessing pipeline + schema

## Step 3: Serving

Generate serving code based on the use case:

### REST API (FastAPI)
```python
# serve.py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class PredictionRequest(BaseModel):
    features: list[float]

class PredictionResponse(BaseModel):
    prediction: float
    confidence: float

@app.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    # Load model, preprocess, predict, postprocess
    ...
```

### Batch inference
```python
# batch_predict.py
import pandas as pd

def batch_predict(input_path: str, output_path: str):
    df = pd.read_csv(input_path)
    predictions = model.predict(df[feature_columns])
    df["prediction"] = predictions
    df.to_csv(output_path, index=False)
```

### Triton Inference Server
- Convert model to ONNX format
- Create model repository structure
- Generate config.pbtxt

## Step 4: Testing Strategy

Write these tests before deploying:

1. **Unit tests**: Model predict function with known input/output
2. **Integration tests**: End-to-end API call → response validation
3. **Regression tests**: Golden dataset with expected predictions
4. **Load tests**: Verify latency under expected QPS
5. **A/B test design**: Traffic split, metric comparison, duration

## Step 5: Monitoring Setup

Deploy monitoring from day one. See `references/monitoring-template.md`.

1. **Data drift**: PSI/KS test on feature distributions
2. **Performance degradation**: Track prediction distribution and metric trends
3. **Latency SLA**: P50/P95/P99 inference time alerts
4. **Error rate**: HTTP 5xx rate and prediction failure rate
5. **Resource utilization**: GPU memory, CPU, memory trends

## Step 6: Rollback Plan

Prepare for when things go wrong:

1. **Model versioning**: Every deployment gets a version tag
2. **Canary deployment**: Route 5% traffic to new model first
3. **Automatic rollback**: If error rate > threshold, revert to previous version
4. **Shadow deployment**: Run new model in parallel, compare predictions

**Done when**:
- [ ] Readiness check passed
- [ ] Model packaged with locked dependencies
- [ ] Serving endpoint created and tested
- [ ] Unit + integration + regression tests written
- [ ] Monitoring configured for drift, performance, latency
- [ ] Rollback plan documented and tested
