# ML Monitoring Template

## Metrics to Track

### Model Performance Metrics
| Metric | Alert Threshold | Check Frequency |
|--------|----------------|-----------------|
| Primary metric (accuracy/F1/RMSE) | > 5% degradation from baseline | Daily |
| Prediction distribution | KL divergence > 0.1 from training | Hourly |
| Confidence distribution | Mean shift > 2 std from baseline | Hourly |

### Data Quality Metrics
| Metric | Alert Threshold | Check Frequency |
|--------|----------------|-----------------|
| Feature drift (PSI) | PSI > 0.2 | Hourly |
| Missing value rate | > 2x training missing rate | Per request |
| Feature value range | Outside training min/max | Per request |
| Input schema validation | Any schema violation | Per request |

### Infrastructure Metrics
| Metric | Alert Threshold | Check Frequency |
|--------|----------------|-----------------|
| P50 latency | > baseline × 1.5 | Real-time |
| P95 latency | > SLA limit | Real-time |
| P99 latency | > SLA limit × 2 | Real-time |
| Error rate (5xx) | > 0.1% | Real-time |
| GPU memory utilization | > 90% | Every 30s |
| CPU utilization | > 80% | Every 30s |

## Prometheus Metrics Example

```python
from prometheus_client import Histogram, Counter, Gauge

PREDICTION_LATENCY = Histogram(
    "model_prediction_seconds",
    "Prediction latency",
    buckets=[0.01, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0]
)

PREDICTION_COUNT = Counter(
    "model_predictions_total",
    "Total predictions",
    ["model_version", "status"]
)

FEATURE_DRIFT = Gauge(
    "model_feature_psi",
    "PSI score per feature",
    ["feature_name"]
)

@PREDICTION_LATENCY.time()
def predict(features):
    try:
        result = model.predict(features)
        PREDICTION_COUNT.labels(model_version=VERSION, status="success").inc()
        return result
    except Exception as e:
        PREDICTION_COUNT.labels(model_version=VERSION, status="error").inc()
        raise
```

## Grafana Dashboard Layout

Row 1: **Health Overview**
- Request rate (req/s)
- Error rate (%)
- P95 latency (ms)
- Model version (stat panel)

Row 2: **Model Performance**
- Primary metric trend (time series)
- Prediction distribution (histogram)
- Confidence score distribution (histogram)

Row 3: **Data Quality**
- Feature PSI scores (bar chart, alert line at 0.2)
- Missing value rates (time series)
- Feature value ranges (time series with training min/max bands)

Row 4: **Infrastructure**
- GPU/CPU utilization (gauge)
- Memory usage (time series)
- Request throughput vs latency (scatter)
