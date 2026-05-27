# Deployment Checklist

Complete every item before deploying to production.

## Pre-Deployment

- [ ] Model meets performance target on held-out test set
- [ ] Model reproduces from config + data (verified by clean rebuild)
- [ ] All hardcoded values extracted to config
- [ ] Dependencies pinned to exact versions
- [ ] Input/output schema documented
- [ ] Model serialized in standard format (ONNX/TorchScript/pickle)
- [ ] Preprocessing pipeline saved alongside model

## Code Quality

- [ ] No notebook-only code — everything is in .py modules
- [ ] Unit tests for data pipeline (≥ 80% coverage on transform logic)
- [ ] Unit tests for model predict function (known input → expected output)
- [ ] Integration test: API call → valid response
- [ ] No secrets or credentials in code
- [ ] Linting passes (ruff/pylint)
- [ ] Type checking passes (mypy/pyright)

## Serving

- [ ] API endpoint returns correct predictions
- [ ] Input validation with clear error messages
- [ ] Request/response logging (without PII)
- [ ] Health check endpoint (/health)
- [ ] Graceful shutdown handling
- [ ] Docker image builds and runs locally

## Performance

- [ ] Latency within budget (P95: ___ms)
- [ ] Throughput meets requirement (___ QPS)
- [ ] Memory usage within limit (___GB)
- [ ] Load test completed at 2x expected traffic

## Monitoring

- [ ] Data drift detection enabled
- [ ] Prediction distribution tracking enabled
- [ ] Latency alerts configured (P95 > ___ms)
- [ ] Error rate alerts configured (> ___%)
- [ ] Resource utilization dashboards created

## Rollback

- [ ] Previous model version available for instant rollback
- [ ] Rollback procedure documented (1-command or 1-click)
- [ ] Canary/shadow deployment strategy defined
- [ ] Automatic rollback trigger configured
