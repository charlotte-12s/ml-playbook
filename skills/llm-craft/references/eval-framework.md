# LLM Evaluation Framework

## Evaluation Pipeline

```
Golden Dataset → Run Pipeline → Collect Outputs → Compute Metrics → Compare to Baseline
```

## Golden Dataset Structure

```json
[
  {
    "id": "001",
    "input": "What is the refund policy?",
    "expected_output": "Our refund policy allows returns within 30 days...",
    "expected_sources": ["policy_doc.pdf"],
    "category": "policy",
    "difficulty": "easy"
  }
]
```

Aim for 50-100 examples covering:
- Common queries (40%)
- Edge cases (30%)
- Adversarial inputs (20%)
- Out-of-scope queries (10%)

## Automated Metrics

### Retrieval Metrics
| Metric | What it measures | Good score |
|--------|-----------------|------------|
| Recall@K | Fraction of relevant docs in top-K | > 0.8 |
| MRR | Rank of first relevant doc | > 0.7 |
| Precision@K | Fraction of top-K that are relevant | > 0.6 |

### Generation Metrics
| Metric | What it measures | How to compute | Good score |
|--------|-----------------|----------------|------------|
| Exact Match | String match | `output == expected` | Varies |
| F1 Score | Token overlap | sklearn `f1_score` | > 0.7 |
| Semantic Similarity | Meaning match | Embedding cosine similarity | > 0.85 |
| Faithfulness | Grounded in context | LLM-as-judge or NLI | > 0.9 |
| Relevance | Answers the question | LLM-as-judge | > 0.8 |
| No-hallucination | No made-up facts | NLI model or LLM judge | > 0.95 |

### LLM-as-Judge Template

```
Rate the following AI response on a scale of 1-5.

Criteria: {criteria}
Question: {question}
Context provided: {context}
AI Response: {response}

Rating (1=poor, 5=excellent):
Justification:
```

Recommended judge models: Claude Haiku (cost-effective), GPT-4o (higher quality)

## Regression Testing

Run on every change to prompt, model, or retrieval:

```python
# eval_runner.py
def run_eval(pipeline, golden_dataset):
    results = []
    for example in golden_dataset:
        output = pipeline.run(example["input"])
        metrics = compute_all_metrics(output, example)
        results.append(metrics)
    return aggregate_metrics(results)

# In CI/CD
if __name__ == "__main__":
    results = run_eval(pipeline, load_golden_dataset())
    baseline = load_baseline_metrics()
    for metric, value in results.items():
        if value < baseline[metric] * 0.95:  # 5% degradation threshold
            print(f"REGRESSION: {metric} dropped from {baseline[metric]:.3f} to {value:.3f}")
            sys.exit(1)
    print("All metrics within acceptable range")
```

## Cost Tracking

Track token usage per evaluation run:

| Component | Avg tokens/call | Calls per eval | Cost per eval |
|-----------|----------------|----------------|---------------|
| Embedding | 200 | 100 | $0.0004 |
| Retrieval | 0 | 100 | $0 (compute) |
| Generation | 1000 | 100 | $0.30 |
| Judge | 500 | 100 | $0.15 |
| **Total** | | | **~$0.45** |
