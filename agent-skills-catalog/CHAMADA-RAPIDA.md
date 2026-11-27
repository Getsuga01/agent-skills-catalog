# ⚡ Cheat Sheet — Chamada Rápida de Skills e Agentes

Copie e cole esses blocos no OpenCode para ativar skills e subagentes por perfil.

---

## 🧠 Processo Universal (antes de qualquer tarefa)

```javascript
await skill({ id: "brainstorming" });          // 1. Definir escopo e requisitos
await skill({ id: "planning-and-task-breakdown" }); // 2. Decompor em tarefas
```

---

## 👨‍💻 Desenvolvedor

### Stack Fullstack (Next.js + React + TypeScript + Postgres)
```javascript
await skill({ id: "brainstorming" });
await skill({ id: "planning-and-task-breakdown" });
await skill({ id: "nextjs" });
await skill({ id: "nextjs-app-router-patterns" });
await skill({ id: "typescript" });
await skill({ id: "react" });
await skill({ id: "tailwind-design-system" });
await skill({ id: "shadcn" });
await skill({ id: "postgresql-optimization" });
await skill({ id: "database-design" });
await skill({ id: "testing" });
await skill({ id: "e2e-testing-patterns" });
await skill({ id: "clean-code" });
await skill({ id: "verification-before-completion" });
```

### Stack Backend (Node/NestJS + Postgres)
```javascript
await skill({ id: "api-design-principles" });
await skill({ id: "openapi-spec-generation" });
await skill({ id: "nestjs" });
await skill({ id: "nodejs-backend-patterns" });
await skill({ id: "graphql" });
await skill({ id: "trpc-fullstack" });
await skill({ id: "database-design" });
await skill({ id: "postgresql-optimization" });
await skill({ id: "drizzle-orm-expert" });
await skill({ id: "api-security-testing" });
await skill({ id: "testing" });
await skill({ id: "verification-before-completion" });
```

### Stack Mobile (React Native / Flutter)
```javascript
await skill({ id: "react-native-architecture" });
await skill({ id: "flutter-expert" });
await skill({ id: "android-dev" });
await skill({ id: "android-jetpack-compose-expert" });
await skill({ id: "ios-debugger-agent" });
await skill({ id: "swiftui-ui-patterns" });
await skill({ id: "typescript" });
await skill({ id: "testing" });
await skill({ id: "e2e-testing-patterns" });
await skill({ id: "android_ui_verification" });
```

### Qualidade de Código
```javascript
await skill({ id: "clean-code" });
await skill({ id: "super-code" });
await skill({ id: "simplify-code" });
await skill({ id: "code-review-excellence" });
await skill({ id: "receiving-code-review" });
await skill({ id: "brooks-review" });
await skill({ id: "logic-lens" });
await skill({ id: "codebase-audit-pre-push" });
await skill({ id: "vibe-code-cleanup" });
```

### UI/UX e Design
```javascript
await skill({ id: "ui-ux-pro-max" });
await skill({ id: "design-system" });
await skill({ id: "tailwind-design-system" });
await skill({ id: "shadcn" });
await skill({ id: "radix-ui-design-system" });
await skill({ id: "accessibility-compliance-accessibility-audit" });
await skill({ id: "wcag-audit-patterns" });
await skill({ id: "screen-reader-testing" });
await skill({ id: "frontend-lighthouse" });
await skill({ id: "pagespeed-enhancer" });
await skill({ id: "ux-audit" });
await skill({ id: "uxui-principles" });
await skill({ id: "styleseed-design-review" });
await skill({ id: "anti-ui-slop" });
```

### DevOps e Cloud
```javascript
await skill({ id: "docker" });
await skill({ id: "container-security-hardening" });
await skill({ id: "kubernetes-deployment" });
await skill({ id: "terraform-infrastructure" });
await skill({ id: "aws-skills" });
await skill({ id: "aws-security-audit" });
await skill({ id: "aws-iam-best-practices" });
await skill({ id: "aws-secrets-rotation" });
await skill({ id: "github-actions-advanced" });
await skill({ id: "github-actions-debugger" });
await skill({ id: "git-hooks-automation" });
await skill({ id: "vercel-deployment" });
await skill({ id: "devcontainer-setup" });
```

### IA, LLMs e Agentes
```javascript
await skill({ id: "ai-agent-development" });
await skill({ id: "multi-agent-architect" });
await skill({ id: "rag-implementation" });
await skill({ id: "llm-ops" });
await skill({ id: "prompt-engineering" });
await skill({ id: "llm-prompt-optimizer" });
await skill({ id: "prompt-caching" });
await skill({ id: "llm-structured-output" });
await skill({ id: "pydantic-ai" });
await skill({ id: "vercel-ai-sdk-expert" });
await skill({ id: "gemini-api-integration" });
await skill({ id: "context-manager" });
await skill({ id: "memory-systems" });
await skill({ id: "mesh-memory" });
await skill({ id: "mcp-tool-developer" });
await skill({ id: "ai-native-cli" });
```

### Subagentes Desenvolvedor
```javascript
// Fullstack
subagent({
  agent: "general",
  description: "Desenvolvedor Fullstack",
  prompt: "Siga o arquivo agentes/desenvolvedor/fullstack.md"
});

// Backend
subagent({
  agent: "general",
  description: "Desenvolvedor Backend",
  prompt: "Siga o arquivo agentes/desenvolvedor/backend.md"
});

// Frontend
subagent({
  agent: "general",
  description: "Desenvolvedor Frontend",
  prompt: "Siga o arquivo agentes/desenvolvedor/frontend.md"
});

// Mobile
subagent({
  agent: "general",
  description: "Desenvolvedor Mobile",
  prompt: "Siga o arquivo agentes/desenvolvedor/mobile.md"
});

// DevOps
subagent({
  agent: "general",
  description: "DevOps / SRE",
  prompt: "Siga o arquivo agentes/desenvolvedor/devops.md"
});
```

---

## 🔒 Analista de Segurança

### Auditoria Completa (AppSec)
```javascript
await skill({ id: "threat-modeling-expert" });
await skill({ id: "security-audit" });
await skill({ id: "web-security-testing" });
await skill({ id: "api-security-testing" });
await skill({ id: "ffuf-claude-skill" });
await skill({ id: "brooks-review" });
await skill({ id: "code-review-excellence" });
await skill({ id: "logic-lens" });
await skill({ id: "audit-context-building" });
await skill({ id: "security-scanning-security-dependencies" });
```

### DevSecOps / Infraestrutura Segura
```javascript
await skill({ id: "gha-security-review" });
await skill({ id: "agentic-actions-auditor" });
await skill({ id: "container-security-hardening" });
await skill({ id: "aws-iam-best-practices" });
await skill({ id: "aws-secrets-rotation" });
await skill({ id: "aws-compliance-checker" });
await skill({ id: "git-hooks-automation" });
await skill({ id: "varlock-claude-skill" });
await skill({ id: "protect-mcp-governance" });
```

### Compliance e Privacidade (GDPR / PCI-DSS)
```javascript
await skill({ id: "security-compliance-compliance-check" });
await skill({ id: "gdpr-data-handling" });
await skill({ id: "privacy-by-design" });
await skill({ id: "legal-advisor" });
await skill({ id: "lex" });
```

### Threat Modeling
```javascript
await skill({ id: "threat-modeling-expert" });
await skill({ id: "stride-analysis-patterns" });
await skill({ id: "threat-mitigation-mapping" });
await skill({ id: "security-requirement-extraction" });
await skill({ id: "risk-metrics-calculation" });
```

### Resposta a Incidentes
```javascript
await skill({ id: "systematic-debugging" });
await skill({ id: "error-detective" });
await skill({ id: "diagnosing-bugs" });
await skill({ id: "bug-hunter" });
await skill({ id: "bug-hunt-swarm" });
```

### Governança de Skills e MCP
```javascript
await skill({ id: "skill-audit" });
await skill({ id: "skill-scanner" });
await skill({ id: "skill-sentinel" });
await skill({ id: "skill-optimizer" });
await skill({ id: "skill-creator" });
await skill({ id: "writing-skills" });
```

### Subagentes Segurança
```javascript
// AppSec
subagent({
  agent: "general",
  description: "Analista de Segurança AppSec",
  prompt: "Siga o arquivo agentes/seguranca/appsec.md"
});

// DevSecOps
subagent({
  agent: "general",
  description: "DevSecOps / Infra Segura",
  prompt: "Siga o arquivo agentes/seguranca/devsecops.md"
});

// Compliance
subagent({
  agent: "general",
  description: "Analista de Compliance e Privacidade",
  prompt: "Siga o arquivo agentes/seguranca/compliance.md"
});

// Threat Modeling
subagent({
  agent: "general",
  description: "Threat Modeler",
  prompt: "Siga o arquivo agentes/seguranca/threat-modeler.md"
});
```

---

## 📊 Analista de Dados

### Engenharia de Dados (SQL + Pipelines)
```javascript
await skill({ id: "database-design" });
await skill({ id: "postgresql-optimization" });
await skill({ id: "postgres-best-practices" });
await skill({ id: "sql-optimization-patterns" });
await skill({ id: "drizzle-orm-expert" });
await skill({ id: "dbt-transformation-patterns" });
await skill({ id: "airflow-dag-patterns" });
await skill({ id: "snowflake-development" });
await skill({ id: "saas-multi-tenant" });
await skill({ id: "nosql-expert" });
await skill({ id: "using-neon" });
```

### Análise Estatística + Storytelling
```javascript
await skill({ id: "statsmodels" });
await skill({ id: "sympy" });
await skill({ id: "data-storytelling" });
await skill({ id: "startup-metrics-framework" });
await skill({ id: "risk-metrics-calculation" });
await skill({ id: "business-analyst" });
await skill({ id: "market-sizing-analysis" });
await skill({ id: "quant-analyst" });
await skill({ id: "risk-manager" });
await skill({ id: "yield-intelligence" });
await skill({ id: "copywriting" });
await skill({ id: "copy-editing" });
```

### IA sobre Dados (RAG + LLMs)
```javascript
await skill({ id: "rag-implementation" });
await skill({ id: "llm-ops" });
await skill({ id: "hybrid-search-implementation" });
await skill({ id: "similarity-search-patterns" });
await skill({ id: "vector-index-tuning" });
await skill({ id: "context-manager" });
await skill({ id: "context-fundamentals" });
await skill({ id: "context-optimization" });
await skill({ id: "llm-structured-output" });
await skill({ id: "prompt-engineering" });
await skill({ id: "llm-prompt-optimizer" });
await skill({ id: "prompt-caching" });
await skill({ id: "vercel-ai-sdk-expert" });
await skill({ id: "pydantic-ai" });
await skill({ id: "gemini-api-integration" });
await skill({ id: "local-llm-expert" });
await skill({ id: "routerbase-model-gateway" });
await skill({ id: "compile-knowledge" });
await skill({ id: "memory-systems" });
await skill({ id: "mesh-memory" });
await skill({ id: "tree-ring-memory" });
```

### Observabilidade e Qualidade de Dados
```javascript
await skill({ id: "monte-carlo-prevent" });
await skill({ id: "monte-carlo-monitor-creation" });
await skill({ id: "monte-carlo-push-ingestion" });
await skill({ id: "monte-carlo-validation-notebook" });
await skill({ id: "error-diagnostics-error-analysis" });
await skill({ id: "error-diagnostics-error-trace" });
await skill({ id: "error-debugging-error-analysis" });
await skill({ id: "error-debugging-error-trace" });
```

### Subagentes Dados
```javascript
// Data Engineer
subagent({
  agent: "general",
  description: "Data Engineer",
  prompt: "Siga o arquivo agentes/dados/data-engineer.md"
});

// Data Analyst
subagent({
  agent: "general",
  description: "Analista de Dados",
  prompt: "Siga o arquivo agentes/dados/data-analyst.md"
});

// BI Analyst
subagent({
  agent: "general",
  description: "BI Analyst",
  prompt: "Siga o arquivo agentes/dados/bi-analyst.md"
});

// ML Ops
subagent({
  agent: "general",
  description: "ML Ops / IA Aplicada a Dados",
  prompt: "Siga o arquivo agentes/dados/ml-ops.md"
});
```

---

## 📑 Documentação
```javascript
await skill({ id: "documentation" });
await skill({ id: "readme" });
await skill({ id: "api-documentation" });
await skill({ id: "documentation-templates" });
await skill({ id: "docs-architect" });
await skill({ id: "reference-builder" });
await skill({ id: "c4-code" });
await skill({ id: "c4-component" });
await skill({ id: "c4-container" });
await skill({ id: "c4-context" });
await skill({ id: "wiki-builder" });
await skill({ id: "wiki-researcher" });
await skill({ id: "spec-mining" });
```

---

## 📤 Subir para o GitHub

Consulte [`INSTRUCOES-GITHUB.md`](./INSTRUCOES-GITHUB.md).