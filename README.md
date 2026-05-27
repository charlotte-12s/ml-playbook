# The ML Playbook

> **12 rules and 4 skills that make Claude your senior ML engineer**

Stop vibe-ML-ing. Start using The ML Playbook.

## The 12 Golden Rules

| # | Rule | Anti-Pattern |
|---|------|-------------|
| 1 | **Build Baseline First** | Tuning before baselining |
| 2 | **Data > Model > Hyperparams** | Reaching for a bigger model |
| 3 | **Deploy from Day One** | "I'll productionize later" |
| 4 | **Metrics Before Code** | Coding a model without an eval |
| 5 | **Guard Against Data Leakage** | Using future data in training |
| 6 | **Simplicity First** | Defaulting to Transformers |
| 7 | **Reproducible Experiments** | "Can't reproduce last week's results" |
| 8 | **Change One Variable** | Changing data + model + params at once |
| 9 | **Monitor Before You Optimize** | Discovering drift from user complaints |
| 10 | **Cost Consciousness** | Using GPT-4 for simple tasks |
| 11 | **Eval-Driven LLM Dev** | Judging by vibes |
| 12 | **Security Baseline** | Injecting user text into prompts |

## The 4 Skills

| Skill | Slash Command | What It Does |
|-------|--------------|-------------|
| ML Bootstrap | `/ml-bootstrap` | Launch an ML project right — problem definition, data audit, baseline, eval framework |
| ML Debug | `/ml-debug` | Systematic model debugging — symptom classification, root cause, fix recommendations |
| ML Ship | `/ml-ship` | Notebook to production — packaging, serving, testing, monitoring, rollback |
| LLM Craft | `/llm-craft` | Build production LLM apps — RAG engineering, prompt design, agent architecture, eval |

## Quick Start

```bash
# Install with npx (recommended)
npx ml-playbook

# Or with curl
curl -fsSL https://raw.githubusercontent.com/charlotte-12s/ml-playbook/main/install.sh | bash
```

## Install Options

```bash
# Install all skills (default)
npx ml-playbook

# Install only LLM skills
npx ml-playbook --bundle llm-only

# Install only traditional ML skills
npx ml-playbook --bundle traditional-ml

# Install for a specific tool
npx ml-playbook --tool cursor
npx ml-playbook --tool codex
npx ml-playbook --tool gemini
npx ml-playbook --tool copilot
npx ml-playbook --tool windsurf
```

## Supported Tools

| Tool | Format | Auto-Detected |
|------|--------|:---:|
| Claude Code | `.claude/skills/` + `SKILL.md` | Yes |
| Cursor | `.cursor/rules/` | Yes |
| Codex CLI | `AGENTS.md` | Yes |
| Gemini CLI | `GEMINI.md` | Yes |
| GitHub Copilot | `.github/copilot-instructions.md` | Yes |
| Windsurf | `.windsurfrules` | Yes |

## What's Included

Each skill comes with:

- **SKILL.md** — Step-by-step methodology with gates and checklists
- **References/** — Templates, checklists, decision trees, and architecture guides

### ml-bootstrap references
- Problem definition template
- Data audit checklist
- Project scaffold with directory structure + config templates

### ml-debug references
- Diagnosis decision tree (loss not decreasing → overfitting → serving bugs → drift)
- Common ML pitfalls catalog (30+ pitfalls with symptoms and fixes)

### ml-ship references
- Pre-deployment checklist (25 items across code quality, serving, performance, monitoring)
- Monitoring template (Prometheus metrics + Grafana dashboard layout)

### llm-craft references
- RAG architecture guide (4 patterns, chunking strategies, embedding/vector DB selection)
- Prompt patterns (5 battle-tested templates + injection defense patterns)
- Eval framework (golden dataset structure, automated metrics, regression testing, cost tracking)

## Why The ML Playbook?

**Most AI coding assistants default to:**
- Writing complex models before establishing baselines
- Ignoring data quality issues
- Leaving everything in notebooks
- Not setting up evaluation until it's too late
- Skipping monitoring and security

**The ML Playbook encodes the habits of senior ML engineers** into skills that automatically activate when you're doing ML work. No more forgetting the basics.

## License

BSD-3-Clause
