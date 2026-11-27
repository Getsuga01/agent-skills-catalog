# 📊 Skills para Analista de Dados

Lista abrangente e curada das skills do OpenCode mais úteis para analistas de dados, data engineers, business analysts, BI analysts e profissionais de IA aplicada a dados.

## Como usar

Carregue a skill **antes** de iniciar a tarefa:

```javascript
skill({ id: "postgresql-optimization" })
```

---

## 📑 Índice por categoria

1. [Banco de Dados e SQL](#banco-de-dados-e-sql)
2. [Modelagem e Arquitetura de Dados](#modelagem-e-arquitetura-de-dados)
3. [Análise Estatística e Métricas](#análise-estatística-e-métricas)
4. [Data Storytelling e Business Analysis](#data-storytelling-e-business-analysis)
5. [Orquestração e Pipelines de Dados](#orquestração-e-pipelines-de-dados)
6. [IA, RAG e Dados](#ia-rag-e-dados)
7. [Observabilidade e Qualidade de Dados](#observabilidade-e-qualidade-de-dados)
8. [Data Science e Machine Learning](#data-science-e-machine-learning)

---

## 1. Banco de Dados e SQL

| ID da Skill | Utilidade |
|-------------|-----------|
| `postgresql-optimization` | Tuning de queries, indexação, análise de plano de execução, produção no Postgres. |
| `postgres-best-practices` | Boas práticas de Postgres (Supabase) para queries, schema e configuração. |
| `supabase-postgres-best-practices` | Mesmas boas práticas adaptadas ao ecossistema Supabase. |
| `sql-optimization-patterns` | Transforma queries lentas em operações rápidas via indexação e plano de execução. |
| `database-design` | Modelagem de schema, estratégia de indexação, seleção de ORM. |
| `database` | Desenvolvimento e operações de banco: SQL, NoSQL, design, migrações, otimização. |
| `database-architect` | Design de camada de dados do zero: seleção de tecnologia, schema, arquitetura escalável. |
| `drizzle-orm-expert` | Schema design, queries relacionais, migrações com Drizzle ORM (TypeScript). |
| `saas-multi-tenant` | Multi-tenant com RLS (row-level security), queries escopadas por tenant, isolamento seguro. |
| `nosql-expert` | Modelagem query-first para Cassandra/DynamoDB, single-table design, evitar hot partitions. |
| `using-neon` | Neon serverless Postgres: branching, autoscaling, instant restore, scale-to-zero. |

---

## 2. Modelagem e Arquitetura de Dados

| ID da Skill | Utilidade |
|-------------|-----------|
| `snowflake-development` | Snowflake: SQL best practices, pipelines (Dynamic Tables, Streams, Tasks, Snowpipe), Cortex AI, Snowpark Python, dbt integration, performance tuning, security hardening. |
| `dbt-transformation-patterns` | Modelos dbt, estratégias de teste, documentação, processamento incremental. |
| `workflow-orchestration-patterns` | Orquestração de workflows com Temporal: decisões de design, padrões de resiliência, best practices. |
| `airflow-dag-patterns` | DAGs do Apache Airflow: operadores, sensores, testes, deploy de pipelines de dados. |
| `temporal-golang-pro` | Sistemas duráveis distribuídos com Temporal Go SDK: deterministic workflow rules, mTLS, advanced patterns. |

---

## 3. Análise Estatística e Métricas

| ID da Skill | Utilidade |
|-------------|-----------|
| `statsmodels` | Modelagem estatística em Python: estimação, inferência, diagnósticos (regressão, séries temporais, etc.). |
| `sympy` | Cálculo simbólico exato com símbolos matemáticos (não aproximações numéricas). |
| `quant-analyst` | Modelos financeiros, backtesting de estratégias, métricas de risco, otimização de portfólio. |
| `risk-manager` | Monitoramento de portfólio, R-múltiplos, limites de posição, stop-losses, hedging. |
| `risk-metrics-calculation` | Métricas de risco: VaR, CVaR, Sharpe, Sortino, drawdown analysis. |
| `startup-metrics-framework` | Métricas de desempenho para startups de seed a Series A, por modelo de negócio. |
| `business-analyst` | Business analysis com IA-powered analytics, dashboards em tempo real, insights baseados em dados. |
| `market-sizing-analysis` | TAM, SAM, SOM para oportunidades de mercado e startups. |
| `yield-intelligence` | Análise de portfólio de renda passiva: dividend yields, Treasury rates, REITs, alocações por renda mensal. |

---

## 4. Data Storytelling e Business Analysis

| ID da Skill | Utilidade |
|-------------|-----------|
| `data-storytelling` | Transforma dados brutos em narrativas que geram decisões e inspiram ação. |
| `copywriting` | Copy rigoroso e focado em conversão para landing pages e e-mails (útil em relatórios de dados). |
| `copy-editing` | Edição sistemática de copy de marketing e conversão preservando a mensagem central. |
| `seo-audit` | Diagnóstico de rastreabilidade, indexação, rankings e desempenho orgânico (para análise de dados de busca). |
| `seo-fundamentals` | E-E-A-T, Core Web Vitals, fundamentos técnicos de SEO. |
| `seo-page` | Deep single-page SEO analysis: on-page elements, content quality, technical meta tags, schema, images, performance. |

---

## 5. Orquestração e Pipelines de Dados

| ID da Skill | Utilidade |
|-------------|-----------|
| `airflow-dag-patterns` | Pipelines de dados com Apache Airflow (operadores, sensores, testing, deployment). |
| `workflow-orchestration-patterns` | Orquestração distribuída com Temporal (resiliência, retry, state management). |
| `dbt-transformation-patterns` | Transformações dbt com testes e documentação embutidos. |
| `snowflake-development` | Pipelines modernos no Snowflake (Streams, Tasks, Snowpipe, Cortex AI). |

---

## 6. IA, RAG e Dados

| ID da Skill | Utilidade |
|-------------|-----------|
| `rag-implementation` | RAG completo: seleção de embeddings, banco vetorial, chunking strategies, retrieval optimization. |
| `llm-ops` | Operações de LLM em produção: evals de qualidade, custos, arquiteturas de IA, RAG, embeddings, vector databases, fine-tuning. |
| `hybrid-search-implementation` | Combina busca vetorial e keyword para melhor recall em sistemas de busca e RAG. |
| `similarity-search-patterns` | Busca por similaridade com bancos vetoriais: nearest neighbor queries, otimização de retrieval. |
| `vector-index-tuning` | Otimização de índice vetorial para latência, recall e memória (HNSW, quantization strategies). |
| `compile-knowledge` | Compila descobertas duradouras em knowledge store interligado (atomic files, [[wiki-links]], índice mantido). |
| `memory-systems` | Arquiteturas de memória curta, longa e baseadas em grafo para agentes de dados. |
| `hierarchical-agent-memory` | Memória hierárquica com CLAUDE.md por diretório, dashboard de economia de tokens. |
| `mesh-memory` | Memória semântica local-first para agentes: worklogs, decisões, notas (Postgres + pgvector com auto-tagging). |
| `tree-ring-memory` | Ciclo de vida de memória local-first: recall, evidence, audit, forgetting, consolidation. |
| `context-manager` | Gerenciamento dinâmico de contexto, bancos vetoriais, knowledge graphs, memória inteligente. |
| `context-fundamentals` | O que é contexto em LLMs: system instructions, tool definitions, retrieved docs, message history. |
| `context-optimization` | Compressão, masking, caching, partitioning para aumentar capacidade efetiva de contexto. |
| `context-degradation` | Padrões de degradação de LLMs conforme contexto aumenta. |
| `recursive-context-pruning-token-budgeting` | Poda de contexto redundante, gestão de tokens, respostas ultra-concisas. |
| `llm-structured-output` | JSON, enums, typed objects de LLMs via response_format, tool_use, schema-constrained decoding. |
| `prompt-engineering` | Otimização de prompts (RTF, RISEN, CoT, RODES, Chain of Density, RACE, etc.). |
| `llm-prompt-optimizer` | Melhora prompts para qualquer LLM: qualidade, menos alucinações, menos tokens. |
| `prompt-caching` | Caching de prompts: Anthropic prompt caching, response caching, CAG (Cache Augmented Generation). |
| `vercel-ai-sdk-expert` | Vercel AI SDK: Core API (generateText, streamText), UI hooks (useChat), tool calling. |
| `pydantic-ai` | Agentes de produção com PydanticAI: tool use type-safe, structured outputs, DI, multi-model. |
| `gemini-api-integration` | Integração com Google Gemini: model selection, multimodal inputs, streaming, function calling. |
| `local-llm-expert` | Inferência local de LLMs: Ollama, llama.cpp, vLLM, LM Studio, quantização GGUF/EXL2. |
| `routerbase-model-gateway` | RouterBase como gateway OpenAI-compatível para GPT, Claude, Gemini, media, audio, embeddings. |

---

## 7. Observabilidade e Qualidade de Dados

| ID da Skill | Utilidade |
|-------------|-----------|
| `monte-carlo-prevent` | Contexto de observabilidade Monte Carlo (table health, alerts, lineage, blast radius) antes de editar SQL/dbt. |
| `monte-carlo-monitor-creation` | Criação de monitores Monte Carlo via MCP, produzindo monitors-as-code YAML para CI/CD. |
| `monte-carlo-push-ingestion` | Empurra metadata, lineage e query logs para o Monte Carlo de qualquer data warehouse. |
| `monte-carlo-validation-notebook` | Notebooks de validação SQL para PRs de dbt com comparação antes/depois. |
| `error-diagnostics-error-analysis` | Análise de erros distribuídos, incidentes de produção, observabilidade. |
| `error-diagnostics-error-trace` | Error tracking, alertas, structured logging, resolução rápida de problemas. |
| `error-debugging-error-analysis` | Debug de sistemas distribuídos, análise de incidentes de produção. |
| `error-debugging-error-trace` | Error tracking systems, alerts, structured logging. |

---

## 8. Data Science e Machine Learning

| ID da Skill | Utilidade |
|-------------|-----------|
| `quant-analyst` | Modelos financeiros, backtesting, análise de mercado, risk metrics. |
| `statsmodels` | Estatística clássica para inferência e modelagem. |
| `sympy` | Cálculo simbólico para modelagem matemática exata. |
| `backtesting-frameworks` | Sistemas de backtesting robustos para estratégias de trading/investimento. |
| `monte-carlo-monitor-creation` | (Também aplicável) Criação de monitores para simulações de Monte Carlo. |

---

## 🚀 Stack sugerida para Analista de Dados

**Engenharia de Dados (SQL + Pipelines):**
```javascript
await skill({ id: "database-design" });
await skill({ id: "postgresql-optimization" });
await skill({ id: "sql-optimization-patterns" });
await skill({ id: "dbt-transformation-patterns" });
await skill({ id: "airflow-dag-patterns" });
await skill({ id: "snowflake-development" });
```

**Análise Estatística + Storytelling:**
```javascript
await skill({ id: "statsmodels" });
await skill({ id: "data-storytelling" });
await skill({ id: "startup-metrics-framework" });
await skill({ id: "risk-metrics-calculation" });
await skill({ id: "business-analyst" });
await skill({ id: "market-sizing-analysis" });
```

**IA sobre Dados (RAG + LLMs):**
```javascript
await skill({ id: "rag-implementation" });
await skill({ id: "llm-ops" });
await skill({ id: "hybrid-search-implementation" });
await skill({ id: "vector-index-tuning" });
await skill({ id: "context-manager" });
await skill({ id: "llm-structured-output" });
```

**Observabilidade de Dados:**
```javascript
await skill({ id: "monte-carlo-prevent" });
await skill({ id: "monte-carlo-monitor-creation" });
await skill({ id: "error-diagnostics-error-analysis" });
```