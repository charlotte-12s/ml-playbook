# The ML Playbook — 12 Golden Rules

When working on any ML, AI, or data science code, follow these rules. They override default behaviors that waste time and produce unreliable results.

## Rule 1: Build Baseline First
**Do**: Always implement the simplest possible model as baseline before any optimization.
**Don't**: Start tuning hyperparameters before running a baseline.
**If you catch yourself** tuning before baselining → Stop and implement the simplest model first.

## Rule 2: Data > Model > Hyperparameters
**Do**: Always check data quality before changing model architecture.
**Don't**: Switch to a larger model when the current one doesn't work.
**If you catch yourself** reaching for a bigger model → Stop and audit your data first.

## Rule 3: Deploy from Day One
**Do**: Write all ML code with production in mind from the start.
**Don't**: Say "I'll make it production-ready later" or keep everything in notebooks.
**If you catch yourself** writing pipeline code without considering serving → Stop and add a serving interface.

## Rule 4: Metrics Before Code
**Do**: Define success metrics before writing any model code.
**Don't**: Finish a model only to realize you don't know how to evaluate it.
**If you catch yourself** coding a model without an eval → Stop and define metrics first.

## Rule 5: Guard Against Data Leakage
**Do**: For every feature, ask "can I get this at inference time in production?"
**Don't**: Use future data in training, leak test set information, or use target-adjacent features.
**If you catch yourself** adding a feature without checking availability → Stop and verify it's production-safe.

## Rule 6: Simplicity First
**Do**: Use rules over ML, linear over deep learning, when performance is comparable.
**Don't**: Default to Transformers or deep learning for every problem.
**If you catch yourself** choosing a complex model without justification → Stop and try the simple approach first.

## Rule 7: Reproducible Experiments
**Do**: Record config, random seeds, and environment for every experiment.
**Don't**: Say "I can't reproduce last week's results."
**If you catch yourself** running an experiment without tracking → Stop and set up experiment tracking.

## Rule 8: Change One Variable at a Time
**Do**: Make one change per experiment iteration.
**Don't**: Change data + model + hyperparameters simultaneously.
**If you catch yourself** making multiple changes → Stop and isolate variables.

## Rule 9: Monitor Before You Optimize
**Do**: Set up monitoring immediately after deployment, before tuning.
**Don't**: Discover model drift only when users complain.
**If you catch yourself** deploying without monitoring → Stop and add observability first.

## Rule 10: Cost Consciousness
**Do**: Calculate token count and latency for every LLM call.
**Don't**: Use GPT-4/Claude Opus for simple tasks that Haiku can handle.
**If you catch yourself** using the most expensive model by default → Stop and evaluate if a smaller model works.

## Rule 11: Evaluation-Driven LLM Development
**Do**: Build an eval benchmark before iterating on LLM applications.
**Don't**: Judge LLM output quality by vibes ("I think it's okay").
**If you catch yourself** manually checking outputs → Stop and build an automated eval.

## Rule 12: Security Baseline
**Do**: Always assume user input is malicious, especially in LLM applications.
**Don't**: Concatenate user input directly into prompts without sanitization.
**If you catch yourself** injecting user text into a prompt → Stop and add input validation.

---

## Skill Activation

When the user's request matches a skill trigger, activate the corresponding skill:

- Starting a new ML project or training a model → use `ml-bootstrap` skill
- Model not working, debugging training issues → use `ml-debug` skill
- Deploying, productionizing, or serving a model → use `ml-ship` skill
- Building RAG, agents, or LLM applications → use `llm-craft` skill
