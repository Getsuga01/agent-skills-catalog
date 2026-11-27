# 👨‍💻 Skills para Desenvolvedor

Lista abrangente e curada das skills do OpenCode mais úteis para desenvolvedores de software (fullstack, frontend, backend, mobile, DevOps e IA aplicada a código).

## Como usar

Carregue a skill **antes** de iniciar a tarefa:

```javascript
skill({ id: "brainstorming" })
```

---

## 📑 Índice por categoria

1. [Processo e Planejamento](#processo-e-planejamento)
2. [Qualidade de Código e Revisão](#qualidade-de-código-e-revisão)
3. [Frontend e UI/UX](#frontend-e-uiux)
4. [Backend e APIs](#backend-e-apis)
5. [Banco de Dados](#banco-de-dados)
6. [Testes e QA](#testes-e-qa)
7. [DevOps, Infraestrutura e Cloud](#devops-infraestrutura-e-cloud)
8. [Mobile](#mobile)
9. [IA, LLMs e Agentes de Código](#ia-llms-e-agentes-de-código)
10. [Segurança para Desenvolvedores](#segurança-para-desenvolvedores)
11. [Documentação](#documentação)
12. [Design e Produto](#design-e-produto)

---

## 1. Processo e Planejamento

| ID da Skill | Utilidade |
|-------------|-----------|
| `brainstorming` | **Obrigatório antes de qualquer tarefa nova.** Estrutura requisitos, escopo, não-goals e plano de ação. |
| `planning-and-task-breakdown` | Quebra trabalho complexo em tarefas ordenadas, estimáveis e executáveis. |
| `concise-planning` | Gera checklist atômico e ação-viável para tarefas de código. |
| `task-intelligence` | Ativa todos os agentes relevantes do ecossistema antes de executar uma tarefa. |
| `ai-loop` | Loop espec-build-review com gates de aprovação humana para desenvolvimento guiado. |
| `systematic-debugging` | Protocolo de 5 fases para encontrar causa-raiz antes de editar código. |
| `before-you-build` | Review de produto antes de coding (demanda, alternativas, canais, riscos). |

---

## 2. Qualidade de Código e Revisão

| ID da Skill | Utilidade |
|-------------|-----------|
| `clean-code` | Transforma "código que funciona" em "código limpo" (princípios de Uncle Bob). |
| `super-code` | Estilo denso, correto e idiomático; minimiza bloat de código e overhead de operações. |
| `simplify-code` | Revisa diffs por clareza e aplica simplificações de baixo risco. |
| `code-review-excellence` | Code review como conhecimento compartilhado, não gatekeeping. |
| `receiving-code-review` | Tratamento rigoroso de feedback de PR; verifica sugestões antes de implementar. |
| `brooks-review` | PR review que surface decay risks, design smells e maintainability issues. |
| `brooks-lint` | Code reviewer baseado em livros clássicos de engenharia de software. |
| `logic-lens` | Revisão profunda com lógica formal para detectar bugs além de linters. |
| `codebase-audit-pre-push` | Auditoria completa antes de push: remove junk, dead code, security holes, otimizações. |
| `codebase-cleanup-refactor-clean` | Refatoração com foco em clean code, SOLID e boas práticas. |
| `vibe-code-cleanup` | Limpeza e hardening para aplicações criadas via vibe-coding (Next.js, React, Node). |
| `vibecode-production-qa-validator` | 13-phase production QA para fullstack Next.js (build, SEO, OG, favicon, rotas, API auth, etc). |

---

## 3. Frontend e UI/UX

| ID da Skill | Utilidade |
|-------------|-----------|
| `react` | Componentes React 18/19, hooks, Server Components, Suspense, memoização. |
| `nextjs` | App Router (14+), Server Components, boundary `use client`, caching, Metadata API. |
| `nextjs-app-router-patterns` | Padrões avançados de App Router, Server Components e full-stack React moderno. |
| `typescript` | Tipagem estática avançada: branded types, discriminated unions, `satisfies`, strict tsconfig. |
| `tailwind-design-system` | Design system com Tailwind CSS, container queries, tokens de design. |
| `tailwind-patterns` | Tailwind CSS v4: CSS-first config, container queries, modern patterns. |
| `shadcn` | Componentes shadcn/ui (Radix + Tailwind), theming e design systems de produção. |
| `radix-ui-design-system` | Componentes acessíveis com Radix UI, theming strategies, compound components. |
| `ui-styling` | Interfaces bonitas e acessíveis com shadcn/ui + Tailwind + canvas. |
| `ui-ux-pro-max` | Inteligência de design para web, mobile e desktop (79+ estilos, palettes, stacks, 25 chart types). |
| `design-system` | Token architecture (primitivo → semântico → componente), CSS vars, spacing/typography scales. |
| `frontend-design` | Direção visual distinta, tipografia, escolhas que não parecem templates defaults. |
| `frontend-lighthouse` | Lighthouse CI gate para builds frontend com Core Web Vitals budgets. |
| `pagespeed-enhancer` | Auditoria e correção de performance nos 4 pilares do Lighthouse. |
| `accessibility-compliance-accessibility-audit` | Auditoria WCAG 2.2 e remediação de acessibilidade. |
| `wcag-audit-patterns` | Guia completo para auditar contra WCAG 2.2. |
| `screen-reader-testing` | Testes com screen readers para validação de acessibilidade. |
| `ux-audit` | Auditoria de UX com heurísticas de Nielsen e boas práticas mobile. |
| `uxui-principles` | Avaliação contra 168 princípios de UX/UI baseados em pesquisa. |
| `deterministic-design` | Layout audit determinístico + visão-julgada de usabilidade Nielsen. |
| `anti-ui-slop` | Evita UI genérica; usa contratos de produto, estados obrigatórios e finish gate. |
| `styleseed-design-review` | Por que sua UI parece "feita por IA" e como corrigir. |
| `frontend-slides` | Cria apresentações HTML ricas em animação do zero ou PPTX. |
| `slides` | Apresentações HTML estratégicas com Chart.js, design tokens, copywriting. |
| `imagem` / `image-studio` / `imagen` | Geração de imagens para UI placeholders, documentação e design assets. |
| `banner-design` | Design de banners para redes sociais, ads, website heroes, print. |
| `iconsax-library` | Biblioteca de ícones e geração de ícones com IA para UI/UX premium. |

---

## 4. Backend e APIs

| ID da Skill | Utilidade |
|-------------|-----------|
| `nodejs-backend-patterns` | APIs Node.js escaláveis, padrões arquiteturais modernos, produção-ready. |
| `nestjs` | Convenções NestJS: módulos, serviços, DTOs, guards, interceptores, pipes, filters, ConfigModule. |
| `dotnet-backend` | ASP.NET Core 8+ com EF Core, auth, background jobs, APIs de produção. |
| `dotnet-core` | .NET 8: clean architecture, CQRS com MediatR, minimal APIs, DbContext na infra. |
| `csharp` | C# 12 / .NET 8+: nullable enabled, records, pattern matching, Result pattern, async com CancellationToken. |
| `python-fastapi-development` | Backend FastAPI com async, SQLAlchemy, Pydantic, autenticação, padrões de API. |
| `laravel-expert` | Laravel 10/11+: clean architecture, segurança, performance, padrões modernos. |
| `go-in-depth` | Go avançado: concurrency, context, padrões de produção. |
| `grpc-golang` | gRPC services em Go com mTLS, streaming, observabilidade, Protobuf com Buf. |
| `convex` | Convex reactive backend: schema, TypeScript functions, subscriptions, auth, file storage. |
| `hono` | APIs ultra-rápidas com Hono (Cloudflare Workers, Deno, Bun, Node, WinterCG). |
| `api-design-principles` | REST vs GraphQL vs tRPC, versionamento, paginação, response formats. |
| `api-and-interface-design` | Design de módulos, limites de interface, contratos entre módulos. |
| `api-documentation` | Workflow completo de documentação de APIs REST. |
| `openapi-spec-generation` | Geração e manutenção de specs OpenAPI 3.1 a partir de código ou design-first. |
| `trpc-fullstack` | APIs tipo-safe end-to-end com tRPC, routers, procedures, middleware, Next.js/React. |
| `graphql` | GraphQL com controle de consultas complexas, introspecção, segurança. |
| `frontend-api-integration-patterns` | Race conditions, request cancellation, retry strategies, error normalization, UI state. |
| `websocket` (implícito via api patterns) | Comunicação em tempo real. |

---

## 5. Banco de Dados

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

## 6. Testes e QA

| ID da Skill | Utilidade |
|-------------|-----------|
| `testing` | Convenções de teste: o que merece teste vs. cobertura teatral, TDD, padrões Jest/NestJS. |
| `test-driven-development` | Desenvolvimento guiado por testes (red-green-refactor). |
| `tdd-workflows` | Ciclo TDD completo para implementação de features e bugfixes. |
| `python-testing-patterns` | Testes com pytest, fixtures, mocking, TDD. |
| `javascript-testing-patterns` | Estratégias de teste em JavaScript/TypeScript com frameworks modernos. |
| `e2e-testing` | E2E com Playwright: browser automation, visual regression, cross-browser, CI/CD. |
| `e2e-testing-patterns` | Suítes E2E rápidas, confiáveis e de baixa manutenção. |
| `playwright-java` | E2E enterprise em Java (Page Object Model, JUnit 5, Allure, paralelo). |
| `quinn` | Escrita e execução de suítes completas de teste para provar que o sistema funciona. |
| `test-fixing` | Correção sistemática de testes falhando com agrupamento inteligente. |
| `android_ui_verification` | E2E UI testing em Android Emulator via ADB. |
| `ios-debugger-agent` | Debug de projeto iOS no simulador com XcodeBuildMCP. |

---

## 7. DevOps, Infraestrutura e Cloud

| ID da Skill | Utilidade |
|-------------|-----------|
| `docker` / `container-security-hardening` | Imagens seguras, non-root, CVE scanning, SBOM/signing, seccomp/AppArmor, K8s pod security. |
| `kubernetes-deployment` | Orquestração de containers, Helm charts, service mesh, produção-ready K8s. |
| `terraform-infrastructure` | IaC com Terraform: módulos reutilizáveis, provisionamento de cloud, escala. |
| `terraform-skill` | Boas práticas Terraform para infraestrutura como código. |
| `aws-skills` | AWS com automação de infraestrutura e cloud architecture patterns. |
| `aws-security-audit` | Avaliação completa de postura de segurança na AWS. |
| `aws-cost-optimizer` | Análise de custos AWS e recomendações de otimização. |
| `aws-iam-best-practices` | IAM policy review, hardening, least privilege. |
| `aws-secrets-rotation` | Rotação automática de secrets AWS (RDS, API keys, credenciais). |
| `aws-compliance-checker` | Compliance automatizado contra CIS, PCI-DSS, HIPAA, SOC 2. |
| `aws-cost-cleanup` | Limpeza de recursos AWS não utilizados. |
| `azure-functions` | Azure Functions: isolated worker, Durable Functions, cold start, .NET/Python/Node. |
| `cloud-devops` | Cloud infrastructure e DevOps: AWS, Azure, GCP, K8s, Terraform, CI/CD. |
| `cloudflare-workers-expert` | Cloudflare Workers: Wrangler, KV, D1, Durable Objects, R2. |
| `github-actions-advanced` | CI/CD avançado: reusable workflows, matrizes, OIDC, ambientes, secrets, release automation. |
| `github-actions-debugger` | Diagnóstico e correção de GitHub Actions workflows falhando. |
| `git-hooks-automation` | Git hooks com Husky, lint-staged, pre-commit, commitlint. |
| `vercel-deployment` | Deploy de aplicações Next.js na Vercel. |
| `vercel-cli-with-tokens` | Deploy/manage na Vercel com token-based auth. |
| `vercel-optimize` | Auditoria de apps Vercel para custo e performance. |
| `devcontainer-setup` | Devcontainers com Claude Code, tooling específico de linguagem, volumes persistentes. |
| `mise-configurator` | mise.toml para padronização de toolchain local e CI/CD. |
| `uv-package-manager` | Python package management ultra-rápido com uv. |
| `server-management` | Princípios de server management: processos, monitoring, scaling. |
| `linux-troubleshooting` | Diagnóstico e resolução de problemas Linux. |
| `os-scripting` | Shell scripting para Linux, macOS, Windows. |
| `bash-scripting` / `bash-defensive-patterns` | Scripts Bash production-ready com error handling e segurança. |
| `tmux` | Gestão de sessões, janelas e painéis tmux. |
| `windows-shell-reliability` | Execução confiável de comandos no Windows. |

---

## 8. Mobile

| ID da Skill | Utilidade |
|-------------|-----------|
| `react-native-architecture` | React Native com Expo: navegação, estado, native modules, offline-first. |
| `react-native-skills` | Skills específicas para React Native. |
| `flutter-expert` | Flutter com Dart 3, widgets avançados, multi-plataforma. |
| `android-dev` | Android nativo (Kotlin/Java) e cross-platform. |
| `android-jetpack-compose-expert` | Jetpack Compose: state, navigation, performance, Material Design 3. |
| `ios-debugger-agent` | Debug iOS no simulador. |
| `swiftui-ui-patterns` | SwiftUI: navigation, sheets, async state, reusable screens. |
| `swiftui-performance-audit` | Auditoria de performance SwiftUI. |
| `swiftui-view-refactor` | Refatoração de views SwiftUI em componentes menores. |
| `macos-menubar-tuist-app` | Apps macOS menubar com SwiftUI + Tuist. |
| `macos-spm-app-packaging` | Empacotamento SwiftPM para macOS sem Xcode projects. |

---

## 9. IA, LLMs e Agentes de Código

| ID da Skill | Utilidade |
|-------------|-----------|
| `ai-agent-development` | Agentes autônomos, multi-agentes, orquestração com CrewAI, LangGraph. |
| `multi-agent-architect` | Design de sistemas multi-agente produção-ready com LangGraph, LangChain, DeepAgents. |
| `agent-orchestrator` | Orquestração de agentes com anti-duplicação, quality gates, heartbeat monitoring. |
| `agent-evaluation` | Testes e benchmarks de agentes LLM: behavioral testing, capability assessment. |
| `advanced-evaluation` | LLM-as-judge, comparação de outputs, rubrics, mitigation de bias. |
| `evaluation` | Frameworks de avaliação para sistemas de agentes. |
| `rag-implementation` | RAG: embeddings, vector database, chunking, otimização de recuperação. |
| `llm-ops` | Operações de LLM em produção: evals, qualidade, custos, arquiteturas de IA. |
| `prompt-engineering` | Otimização de prompts (RTF, RISEN, CoT, RODES, Chain of Density, etc.). |
| `llm-prompt-optimizer` | Melhora prompts para qualquer LLM: qualidade, menos alucinações, menos tokens. |
| `prompt-caching` | Caching de prompts: Anthropic prompt caching, response caching, CAG. |
| `llm-structured-output` | JSON, enums, typed objects de LLMs via response_format, tool_use, schema-constrained decoding. |
| `pydantic-ai` | Agentes de produção com PydanticAI: tool use type-safe, structured outputs, DI. |
| `vercel-ai-sdk-expert` | Vercel AI SDK: generateText, streamText, hooks useChat, tool calling, streaming UI. |
| `gemini-api-integration` | Integração com Google Gemini: seleção de modelos, multimodal, streaming, function calling. |
| `local-llm-expert` | Inferência local de LLMs: Ollama, llama.cpp, vLLM, LM Studio, quantização GGUF/EXL2. |
| `routerbase-model-gateway` | RouterBase como gateway OpenAI-compatível para GPT, Claude, Gemini, embeddings. |
| `context-fundamentals` | O que é contexto em LLMs: system instructions, tool definitions, history, retrieved docs. |
| `context-optimization` | Compressão, masking, caching, partitioning para aumentar capacidade efetiva de contexto. |
| `context-degradation` | Padrões de degradação de LLMs conforme contexto aumenta. |
| `context-manager` | Gerenciamento dinâmico de contexto, vetores, knowledge graphs, memória inteligente. |
| `recursive-context-pruning-token-budgeting` | Poda de contexto redundante, gestão de tokens, respostas ultra-concisas. |
| `compile-knowledge` | Compila descobertas duradouras em knowledge store interligado (atomic files, [[wiki-links]], índice). |
| `memory-systems` | Arquiteturas de memória curta, longa e baseadas em grafo para agentes. |
| `hierarchical-agent-memory` | Memória hierárquica com CLAUDE.md por diretório, dashboard de economia de tokens. |
| `mesh-memory` | Memória semântica local-first para agentes (Postgres + pgvector com auto-tagging). |
| `tree-ring-memory` | Ciclo de vida de memória: recall, evidence, audit, forgetting, consolidation. |
| `user-thoughts` | Persistir decisões e restrições do usuário em mdbase entre sessões. |
| `lore` | Markdown project memory para agentes de IA: decisões, arquitetura, convenções, monorepo scopes. |
| `ai-native-cli` | Design de CLI para agentes de IA: JSON output, error handling, contracts, exit codes. |
| `mcp-tool-developer` | Build de servidores e ferramentas MCP do zero (TypeScript/Python, testing, deployment). |
| `ai-md` | Converter CLAUDE.md em formato AI-native com labels estruturados. |
| `yes-md` | 6-layer AI governance: safety gates, debugging baseado em evidência, anti-slack, hooks. |

---

## 10. Segurança para Desenvolvedores

| ID da Skill | Utilidade |
|-------------|-----------|
| `security-audit` | Auditoria OWASP Top 10, pentest, vulnerability scanning, hardening. |
| `web-security-testing` | Injeção, XSS, authentication flaws, access control issues. |
| `api-security-testing` | Autenticação, autorização, rate limiting, input validation em APIs. |
| `threat-modeling-expert` | STRIDE, PASTA, attack trees, security requirement extraction. |
| `stride-analysis-patterns` | Aplicação sistemática do STRIDE para identificar ameaças. |
| `threat-mitigation-mapping` | Mapeamento de ameaças para controles e mitigações. |
| `security-requirement-extraction` | Deriva requisitos de segurança de threat models e contexto de negócio. |
| `privacy-by-design` | Data minimization, consent, encryption desde o design. |
| `gdpr-data-handling` | Implementação prática de GDPR, consent management, privacy controls. |
| `code-review-excellence` | (Também aplicável) Code review focado em segurança. |

---

## 11. Documentação

| ID da Skill | Utilidade |
|-------------|-----------|
| `documentation` | Docstrings, JSDoc/TSDoc, convenções Microsoft, @throws, data shapes (WHAT not WHY). |
| `readme` | READMEs completos e aprofundados para projetos. |
| `api-documentation` | API docs, developer guides, OpenAPI specs. |
| `documentation-templates` | Templates de documentação: README, API docs, code comments, AI-friendly docs. |
| `docs-architect` | Documentação técnica longa (manuals, ebooks) a partir de código existente. |
| `reference-builder` | Referências técnicas exaustivas: parameter listings, configuration guides. |
| `c4-code` | C4 code-level documentation: function signatures, arguments, dependencies. |
| `c4-component` | C4 component-level documentation: boundaries, interfaces, relationships. |
| `c4-container` | C4 container-level documentation. |
| `c4-context` | C4 context-level documentation: personas, user journeys, features, dependencies. |
| `wiki-builder` | Wikis de pesquisa reutilizáveis com source provenance e estrutura configurável. |
| `wiki-researcher` | Análise arquitetural profunda e resposta de perguntas baseada em código. |
| `spec-mining` | Reverse-engineering de sistemas legacy/undocumented: scope, explore, trace, EARS format. |

---

## 12. Design e Produto

| ID da Skill | Utilidade |
|-------------|-----------|
| `design` | Brand identity, design tokens, UI styling, logo generation, CIP, HTML presentations, banners, icons, social photos. |
| `ui-ux-pro-max` | (Também aplicável) UI/UX design intelligence. |
| `design-taste-frontend` | High-agency frontend interfaces: calibrated color, responsive layout, motion rules. |
| `design-philosophy` | Visual philosophy e art-direction para campanhas de alto conceito. |
| `design-orchestration` | Orquestração de workflows de design: brainstorming → multi-agent review → execução. |
| `product-design` | Design de produto nível Apple: sistemas visuais, UX flows, acessibilidade, tokens, prototipagem. |
| `product-inventor` | Product Thinking + Design Systems + UI Engineering + Psicologia Cognitiva + Storytelling. |
| `stitch-ui-design` | Prompts eficazes para Google Stitch (UI design tool). |
| `stitch-design-taste` | Google Stitch DESIGN.md: premium typography, color, layout, motion, anti-generic UI. |
| `spline-3d-integration` | Cenas 3D interativas do Spline.design em projetos web. |
| `vizcom` | Transformação de esboços em renders 3D full-fidelity. |
| `lookdev` / `lookdev-auto` | Tuning visual por olho humano ou por modelo de visão em loop. |
| `article-illustrations` | Ilustrações 16:9 feitas à mão com o personagem Grav. |

---

## 🚀 Stack sugerida para Desenvolvedor

**Fullstack Web (Next.js + TypeScript + Postgres):**
```javascript
await skill({ id: "brainstorming" });
await skill({ id: "planning-and-task-breakdown" });
await skill({ id: "nextjs" });
await skill({ id: "typescript" });
await skill({ id: "tailwind-design-system" });
await skill({ id: "shadcn" });
await skill({ id: "postgresql-optimization" });
await skill({ id: "testing" });
await skill({ id: "verification-before-completion" });
```

**Backend APIs (Node/NestJS + Postgres):**
```javascript
await skill({ id: "api-design-principles" });
await skill({ id: "openapi-spec-generation" });
await skill({ id: "nestjs" });
await skill({ id: "database-design" });
await skill({ id: "postgresql-optimization" });
await skill({ id: "api-security-testing" });
await skill({ id: "testing" });
```

**Mobile (React Native + Expo):**
```javascript
await skill({ id: "react-native-architecture" });
await skill({ id: "typescript" });
await skill({ id: "testing" });
await skill({ id: "e2e-testing-patterns" });
```