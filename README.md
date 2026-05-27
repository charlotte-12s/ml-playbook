<div align="center">

# The ML Playbook

**12 rules and 4 skills that make Claude your senior ML engineer**

[![License: BSD-3-Clause](https://img.shields.io/badge/License-BSD--3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![GitHub Stars](https://img.shields.io/github/stars/charlotte-12s/ml-playbook?style=social)](https://github.com/charlotte-12s/ml-playbook/stargazers)
[![CI](https://github.com/charlotte-12s/ml-playbook/actions/workflows/validate.yml/badge.svg)](https://github.com/charlotte-12s/ml-playbook/actions/workflows/validate.yml)

**Stop vibe-ML-ing. Start using The ML Playbook.**

```bash
npx ml-playbook
```

[Getting Started](#-quick-start) · [The 12 Rules](#-the-12-golden-rules) · [The 4 Skills](#-the-4-skills) · [Supported Tools](#-supported-tools)

</div>

---

## 🎯 The Problem

Most AI coding assistants default to:

| ❌ Bad Default | 💡 What Senior ML Engineers Do |
|:-:|:-:|
| Write complex models before baselines | Always build the simplest baseline first |
| Ignore data quality issues | Audit data before touching models |
| Leave everything in notebooks | Write production-ready code from day one |
| Skip evaluation until it's too late | Define metrics before writing code |
| No monitoring, no security | Deploy monitoring from day one |

**The ML Playbook encodes these senior engineer habits** into skills that automatically activate when you're doing ML work.

---

## ⚡ Quick Start

```bash
# Install with npx (recommended)
npx ml-playbook

# Or with curl
curl -fsSL https://raw.githubusercontent.com/charlotte-12s/ml-playbook/main/install.sh | bash
```

```bash
# Install only LLM skills
npx ml-playbook --bundle llm-only

# Install only traditional ML skills
npx ml-playbook --bundle traditional-ml

# Install for a specific tool
npx ml-playbook --tool cursor --tool codex --tool gemini
```

---

## 📜 The 12 Golden Rules

These rules override default AI behaviors when working on ML/AI code:

| | Rule | Anti-Pattern |
|:-:|------|:------------|
| 1 | **Build Baseline First** — Always implement the simplest model before optimizing | Tuning before baselining |
| 2 | **Data > Model > Hyperparams** — Check data quality before changing architecture | Reaching for a bigger model |
| 3 | **Deploy from Day One** — Write all ML code with production in mind | "I'll productionize later" |
| 4 | **Metrics Before Code** — Define success metrics before writing model code | Coding without an eval |
| 5 | **Guard Against Data Leakage** — Verify every feature is available at inference time | Using future data in training |
| 6 | **Simplicity First** — Use rules over ML, linear over deep learning | Defaulting to Transformers |
| 7 | **Reproducible Experiments** — Record config, seeds, and environment for every run | "Can't reproduce last week's results" |
| 8 | **Change One Variable** — Make one change per experiment iteration | Changing data + model + params at once |
| 9 | **Monitor Before You Optimize** — Set up monitoring before tuning | Discovering drift from user complaints |
| 10 | **Cost Consciousness** — Calculate token count and latency for every LLM call | Using GPT-4 for simple tasks |
| 11 | **Eval-Driven LLM Dev** — Build eval benchmarks before iterating on LLM apps | Judging by vibes |
| 12 | **Security Baseline** — Always assume user input is malicious | Injecting user text into prompts |

---

## 🛠️ The 4 Skills

| Skill | Command | Stage | What It Does |
|-------|---------|:-----:|-------------|
| **ML Bootstrap** | `/ml-bootstrap` | 🚀 Launch | Problem definition → Data audit → Baseline → Eval framework → Project scaffold |
| **ML Debug** | `/ml-debug` | 🔍 Debug | Symptom classification → Root cause analysis → Prioritized fix recommendations |
| **ML Ship** | `/ml-ship` | 🚢 Deploy | Readiness check → Packaging → Serving → Testing → Monitoring → Rollback plan |
| **LLM Craft** | `/llm-craft` | 🧠 Build | Architecture decision → RAG engineering → Prompt design → Agent design → Eval system |

### Skill Detail

<details>
<summary><b>🚀 ml-bootstrap</b> — Launch Your ML Project Right</summary>

5-step gated process that prevents skipping fundamentals:

1. **Problem Definition** — Classify the problem, define the target, identify constraints
2. **Data Audit** — Volume, distribution, missingness, quality, temporal aspects
3. **Baseline Strategy** — Rule-based → Linear → Dummy baseline
4. **Evaluation Framework** — Primary/secondary metrics, validation strategy, significance
5. **Project Scaffold** — Standard ML directory structure with configs

**Includes:** Problem definition template · Data audit checklist · Project scaffold with Dockerfile

</details>

<details>
<summary><b>🔍 ml-debug</b> — Systematic Model Debugging</summary>

4-step diagnosis-to-fix workflow:

1. **Symptom Classification** — Non-convergence / Overfitting / Evaluation bug / Instability / Serving bug / Drift
2. **Root Cause Investigation** — Follow the decision tree to pinpoint the cause
3. **Data Investigation** — Leakage scan, distribution check, label quality audit
4. **Fix Recommendations** — Prioritized by impact/effort matrix

**Includes:** Full diagnosis decision tree (PyTorch + sklearn diagnostic commands) · 30+ common pitfalls catalog

</details>

<details>
<summary><b>🚢 ml-ship</b> — From Notebook to Production</summary>

6-step production readiness pipeline:

1. **Readiness Check** — Performance, latency, reproducibility gates
2. **Packaging** — Model signature, dependency locking, config separation, serialization
3. **Serving** — REST API (FastAPI) / Batch / Triton code generation
4. **Testing** — Unit + Integration + Regression + Load + A/B test design
5. **Monitoring** — Data drift, performance degradation, latency SLA, error rate
6. **Rollback Plan** — Versioning, canary deployment, automatic rollback

**Includes:** 25-item deployment checklist · Prometheus + Grafana monitoring template

</details>

<details>
<summary><b>🧠 llm-craft</b> — Build Production-Grade LLM Apps</summary>

5-step LLM engineering workflow:

1. **Architecture Decision** — RAG vs Fine-tune vs Agent decision matrix
2. **RAG Engineering** — Chunking strategy → Retrieval optimization → Generation quality → Eval loop
3. **Prompt Engineering** — Template design, injection defense, cost optimization
4. **Agent Design** — Tool definition, planning strategy, error recovery, human-in-the-loop
5. **Evaluation System** — Golden dataset, automated metrics, LLM-as-judge, regression testing

**Includes:** 4 RAG architecture patterns · 5 prompt templates + injection defense · Full eval framework with cost tracking

</details>

---

## 🔌 Supported Tools

| Tool | Format | Auto-Detected |
|------|--------|:---:|
| [Claude Code](https://docs.anthropic.com/en/docs/claude-code) | `.claude/skills/` + `SKILL.md` | ✅ |
| [Cursor](https://cursor.sh) | `.cursor/rules/` | ✅ |
| [Codex CLI](https://github.com/openai/codex) | `AGENTS.md` | ✅ |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | `GEMINI.md` | ✅ |
| [GitHub Copilot](https://github.com/features/copilot) | `.github/copilot-instructions.md` | ✅ |
| [Windsurf](https://codeium.com/windsurf) | `.windsurfrules` | ✅ |

The installer auto-detects which tools you're using and generates the right format.

---

## 🧩 How It Works

```
┌─────────────────────────────────────────────────┐
│                  CLAUDE.md                        │
│          12 Golden Rules (always active)          │
│   Override default AI behavior on ML/AI tasks    │
└──────────────────────┬──────────────────────────┘
                       │ routes to
       ┌───────────────┼───────────────┐
       ▼               ▼               ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ ml-bootstrap │ │  ml-debug   │ │  ml-ship    │
│  🚀 Launch   │ │  🔍 Debug   │ │  🚢 Deploy  │
└──────┬──────┘ └──────┬──────┘ └──────┬──────┘
       │               │               │
       ▼               ▼               ▼
  references/      references/      references/
  · templates      · decision tree  · checklists
  · checklists     · pitfalls       · monitoring
  · scaffold                        · rollback
                       │
                       ▼
                ┌─────────────┐
                │  llm-craft  │
                │  🧠 Build   │
                └──────┬──────┘
                       ▼
                  references/
                  · RAG patterns
                  · prompt templates
                  · eval framework
```

1. **CLAUDE.md** activates automatically when you're working on ML/AI code
2. The 12 rules modify AI behavior without you asking
3. **Skill routing** triggers the right skill based on your task
4. Each skill follows a **gated methodology** — you can't skip steps

---

## 🤝 Contributing

Contributions are welcome! Areas of particular interest:

- More reference templates for specific ML frameworks
- Translations of the 12 rules into other languages
- Additional skill bundles (e.g., computer vision, NLP, time-series)
- Improvements to the install script for more tools

Please read the existing skill structure before submitting PRs.

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=charlotte-12s/ml-playbook&type=Date)](https://star-history.com/#charlotte-12s/ml-playbook&type=Date)

---

<div align="center">

**The ML Playbook** — Because senior ML engineers don't vibe-code models.

[⭐ Star this repo](https://github.com/charlotte-12s/ml-playbook) · [🐛 Report Bug](https://github.com/charlotte-12s/ml-playbook/issues) · [💡 Request Feature](https://github.com/charlotte-12s/ml-playbook/issues)

</div>
