# ML Project Scaffold

## Directory Structure

```
project/
├── data/
│   ├── raw/              # Immutable original data
│   ├── processed/        # Cleaned, feature-engineered data
│   └── interim/          # Intermediate transformations
├── models/               # Saved model artifacts
├── notebooks/            # Exploration notebooks (not for production code)
│   └── 01_exploration.ipynb
├── src/
│   ├── __init__.py
│   ├── data/
│   │   ├── __init__.py
│   │   ├── dataset.py    # Data loading and validation
│   │   └── preprocess.py # Feature engineering pipeline
│   ├── features/
│   │   ├── __init__.py
│   │   └── build_features.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── train.py      # Training entry point
│   │   └── predict.py    # Inference entry point
│   └── evaluation/
│       ├── __init__.py
│       └── metrics.py    # Evaluation metrics and reporting
├── experiments/
│   └── baseline/         # First baseline experiment
│       ├── config.yaml   # Hyperparameters and settings
│       └── metrics.json  # Recorded results
├── tests/
│   ├── test_data.py
│   ├── test_model.py
│   └── test_pipeline.py
├── configs/
│   └── config.yaml       # Default configuration
├── pyproject.toml        # Dependencies and project metadata
├── .gitignore
├── Dockerfile            # Reproducible environment
└── README.md
```

## Key Files

### pyproject.toml
```toml
[project]
name = "project-name"
version = "0.1.0"
requires-python = ">=3.10"
dependencies = []

[project.optional-dependencies]
dev = ["pytest", "ruff"]
```

### configs/config.yaml
```yaml
data:
  raw_path: "data/raw/"
  processed_path: "data/processed/"
  test_size: 0.2
  random_seed: 42

model:
  type: "baseline"
  params: {}

training:
  epochs: 10
  batch_size: 32
  learning_rate: 0.001

evaluation:
  primary_metric: "accuracy"
  secondary_metrics: ["precision", "recall", "f1"]
```

### Dockerfile
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY pyproject.toml .
RUN pip install -e ".[dev]"
COPY . .
CMD ["python", "-m", "src.models.train"]
```
