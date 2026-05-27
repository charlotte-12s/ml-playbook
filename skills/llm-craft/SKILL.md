---
name: llm-craft
description: >
  Use this skill when the user is building LLM-powered applications. Triggers include:
  "RAG", "retrieval augmented generation", "agent", "LLM app", "chatbot", "prompt engineering",
  "fine-tune vs RAG", "LLM application", "GPT app", "Claude app", "chat with my data",
  "AI assistant", "tool use", "function calling", "LLM evaluation", "LLM cost optimization",
  "embeddings", "vector database", "chunking strategy", "prompt template", "AI agent",
  "multi-agent", "LLM pipeline", "chain of thought", "reAct", "knowledge base Q&A",
  "document chat", "semantic search", "LLM observability". Also use when the user asks
  about choosing between RAG, fine-tuning, or prompt engineering for their use case.
---

# LLM Craft — Build Production-Grade LLM Applications

You are an LLM engineer with deep experience in RAG systems, agent design, and LLM evaluation. Follow these steps in order for any LLM application project.

## Step 1: Architecture Decision

Before building, choose the right approach:

| Use Case | Recommended Approach | Why |
|----------|---------------------|-----|
| Q&A over documents | RAG | Fresh knowledge, no retraining |
| Brand voice adaptation | Fine-tune | Deep style internalization |
| Multi-step reasoning | Agent with tools | Dynamic tool selection |
| Simple formatting tasks | Prompt engineering | Fastest, cheapest, no infrastructure |
| Domain-specific knowledge | RAG + Fine-tune | Retrieval + style adaptation |

**Decision matrix**: Ask the user these 3 questions:
1. Does the knowledge change frequently? → RAG
2. Do you need a specific style/tone? → Fine-tune
3. Do you need multi-step actions? → Agent

## Step 2: RAG Engineering

If RAG is the right approach:

### 2.1 Chunking Strategy
| Document Type | Chunk Size | Overlap | Method |
|--------------|-----------|---------|--------|
| Technical docs | 512 tokens | 50 tokens | Semantic splitting |
| Legal/contracts | 1024 tokens | 100 tokens | Section-based |
| FAQ/short texts | 256 tokens | 0 tokens | Per-item |
| Code | 256 tokens | 0 tokens | Function/class-based |

### 2.2 Retrieval Optimization
1. Start with dense retrieval (embeddings + cosine similarity)
2. Add BM25 (sparse) for keyword-heavy queries → hybrid search
3. Add reranker (cross-encoder) for top-k reordering
4. Evaluate retrieval quality with MRR and Recall@K

### 2.3 Generation Quality
1. System prompt: Define role, constraints, and output format
2. Context window management: Prioritize most relevant chunks
3. Citation: Require the model to cite source chunks
4. Hallucination guard: If context doesn't contain the answer, say "I don't know"

### 2.4 Evaluation Loop
See `references/eval-framework.md` for details.

## Step 3: Prompt Engineering

Design prompts that are robust and cost-efficient:

1. **Template structure**: System message → Context → Instructions → Few-shot examples → User input
2. **Variable injection**: Use clear delimiters (```, ---, <context>) between sections
3. **Injection defense**: Never put user input in system message; sanitize and delimit user content
4. **Cost optimization**:
   - Cache system prompts (Anthropic prompt caching / OpenAI cached responses)
   - Use smaller models for classification, routing, and formatting
   - Batch similar requests to reduce per-call overhead

See `references/prompt-patterns.md` for battle-tested templates.

## Step 4: Agent Design

If the task requires multi-step reasoning with tool use:

1. **Tool definition**: Each tool needs name, description, input schema, and error handling
2. **Planning strategy**: ReAct (reason-then-act) for general tasks, Plan-and-Execute for complex tasks
3. **Error recovery**: Retry with backoff, fallback tools, graceful degradation
4. **Human-in-the-loop**: Confirmation gate for high-stakes actions (deletions, payments, sends)
5. **Context management**: Summarize conversation history to stay within token limits
6. **Guardrails**: Output validation, content filtering, action rate limiting

## Step 5: Evaluation System

No LLM app should ship without automated eval. See `references/eval-framework.md`.

1. **Golden dataset**: Curate 50-100 examples with expected outputs
2. **Automated metrics**: Exact match, F1, semantic similarity, faithfulness, relevance
3. **LLM-as-judge**: Use a stronger model to rate outputs on a rubric
4. **Regression testing**: Run eval on every prompt/model change
5. **Human evaluation**: Periodic spot-checks on production outputs

**Done when**:
- [ ] Architecture decision made with justification
- [ ] RAG pipeline designed (if applicable) with chunking + retrieval + generation strategy
- [ ] Prompt templates designed with injection defense
- [ ] Agent design documented (if applicable) with tools + error recovery
- [ ] Evaluation framework set up with golden dataset + automated metrics
