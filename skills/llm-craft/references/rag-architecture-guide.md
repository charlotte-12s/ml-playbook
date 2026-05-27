# RAG Architecture Guide

## Architecture Patterns

### Pattern 1: Simple RAG
```
User Query → Embed → Vector Search → Top-K Chunks → LLM → Answer
```
**Best for**: Small document sets, straightforward Q&A
**Limitation**: No query refinement, single-pass retrieval

### Pattern 2: Advanced RAG (with Query Processing)
```
User Query → Query Rewrite → Hybrid Search (Dense + BM25) → Reranker → Top-K → LLM → Answer
```
**Best for**: Complex queries, mixed keyword/semantic needs
**Improvement over Simple RAG**: Better recall via hybrid search, better precision via reranking

### Pattern 3: Agentic RAG
```
User Query → Agent → [Plan → Retrieve → Evaluate Sufficiency → Retrieve More / Answer] → Answer
```
**Best for**: Multi-hop reasoning, research tasks
**Improvement**: Self-evaluates whether context is sufficient

### Pattern 4: Graph RAG
```
Documents → Knowledge Graph Extraction → Graph + Vector Store → Graph-Enhanced Retrieval → LLM
```
**Best for**: Entity-relationship queries, multi-document reasoning
**Trade-off**: Higher setup cost, better for relationship-heavy domains

## Chunking Strategies Comparison

| Strategy | Chunk Size | Best For | Trade-off |
|----------|-----------|----------|-----------|
| Fixed-size | 512 tokens | General purpose | May split mid-sentence |
| Sentence-based | Variable | Narrative text | Irregular sizes |
| Paragraph-based | Variable | Well-structured docs | Large chunks possible |
| Semantic | Variable | Mixed content | Computationally expensive |
| Recursive | 256-1024 | Hierarchical docs | Good balance, recommended default |

## Embedding Model Selection

| Model | Dimensions | Speed | Quality | Cost |
|-------|-----------|-------|---------|------|
| OpenAI text-embedding-3-small | 1536 | Fast | Good | $0.02/1M tokens |
| OpenAI text-embedding-3-large | 3072 | Medium | Best | $0.13/1M tokens |
| Cohere embed-v3 | 1024 | Fast | Good | $0.10/1M tokens |
| BGE-M3 (local) | 1024 | Depends on GPU | Good | Free |
| GTE-Qwen2 (local) | 1536 | Depends on GPU | Great | Free |

## Vector Database Selection

| Database | Type | Best For | Managed Option |
|----------|------|----------|---------------|
| Chroma | Embedded | Prototyping, small scale | No |
| Qdrant | Dedicated | Production, filtering | Yes (Qdrant Cloud) |
| Pinecone | Managed | Zero-ops production | Yes |
| Weaviate | Dedicated | Hybrid search | Yes |
| pgvector | Extension | Already using Postgres | Via RDS |

## Common RAG Anti-Patterns

1. **Chunking too small**: Loses context, answers feel fragmented → Use 256-512 tokens with overlap
2. **No reranking**: Top-K by similarity ≠ top-K by relevance → Add a cross-encoder reranker
3. **Ignoring metadata**: Not filtering by source/date/section → Add metadata filters to retrieval
4. **Over-stuffing context**: Sending 50 chunks to LLM → Use 5-10 most relevant, add "I don't know" option
5. **No evaluation**: Guessing if RAG works → Build retrieval + generation eval from day 1
