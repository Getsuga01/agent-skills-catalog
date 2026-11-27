# 🔒 Skills para Analista de Segurança

Lista abrangente e curada das skills do OpenCode mais úteis para analistas de segurança da informação, AppSec, DevSecOps, compliance e resposta a incidentes.

## Como usar

Carregue a skill **antes** de iniciar a tarefa:

```javascript
skill({ id: "threat-modeling-expert" })
```

---

## 📑 Índice por categoria

1. [Auditoria e Testes de Segurança](#auditoria-e-testes-de-segurança)
2. [Threat Modeling e Análise de Riscos](#threat-modeling-e-análise-de-riscos)
3. [Revisão de Código e Arquitetura Segura](#revisão-de-código-e-arquitetura-segura)
4. [Compliance e Regulamentação](#compliance-e-regulamentação)
5. [Segurança de Infraestrutura e Cloud](#segurança-de-infraestrutura-e-cloud)
6. [SecDevOps e CI/CD Seguro](#secdevops-e-cicd-seguro)
7. [Investigação e Resposta a Incidentes](#investigação-e-resposta-a-incidentes)
8. [Governança de Skills e MCP](#governança-de-skills-e-mcp)
9. [Segurança de Dados e Privacidade](#segurança-de-dados-e-privacidade)

---

## 1. Auditoria e Testes de Segurança

| ID da Skill | Utilidade |
|-------------|-----------|
| `security-audit` | Auditoria completa: web application testing, API security, pentest, vulnerability scanning e hardening. |
| `web-security-testing` | OWASP Top 10: injection, XSS, authentication flaws, access control issues, security misconfigurations. |
| `api-security-testing` | Autenticação, autorização, rate limiting, input validation em APIs REST e GraphQL. |
| `ffuf-claude-skill` | Web fuzzing com ffuf para descoberta de endpoints, diretórios e vulnerabilidades. |
| `security-scanning-security-dependencies` | Análise de vulnerabilidades em dependências, geração de SBOM, supply chain security. |
| `agentic-actions-auditor` | Auditoria de GitHub Actions para integrações de IA (Claude Code, Gemini, Codex) e vetores de ataque em CI/CD. |
| `gha-security-review` | Encontra vulnerabilidades exploráveis em GitHub Actions workflows (exige cenário de exploração concreto). |

---

## 2. Threat Modeling e Análise de Riscos

| ID da Skill | Utilidade |
|-------------|-----------|
| `threat-modeling-expert` | Metodologias STRIDE, PASTA, attack trees, security requirement extraction. Use proativamente em arquitetura. |
| `stride-analysis-patterns` | Aplicação sistemática do STRIDE para identificar ameaças (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege). |
| `threat-mitigation-mapping` | Mapeamento de ameaças identificadas para controles de segurança e mitigações apropriadas. |
| `security-requirement-extraction` | Deriva requisitos de segurança a partir de threat models e contexto de negócio. |
| `risk-metrics-calculation` | Cálculo de métricas de risco: VaR, CVaR, Sharpe, Sortino, drawdown para priorização de correções. |
| `risk-manager` | Monitoramento de risco de portfólio, R-múltiplos, limites de posição, stop-losses, estratégias de hedging. |

---

## 3. Revisão de Código e Arquitetura Segura

| ID da Skill | Utilidade |
|-------------|-----------|
| `brooks-review` | PR review que surface decay risks, design smells e maintainability issues — úteis para encontrar fragilidades de segurança. |
| `code-review-excellence` | Code review construtivo e sistemático, focado em conhecimento compartilhado. |
| `logic-lens` | Revisão profunda com lógica formal para detectar bugs e anti-patterns além de linters. |
| `audit-context-building` | Análise ultra-granular linha por linha para construir contexto antes de encontrar vulnerabilidades. |
| `cross-platform-contract-propagation-audit` | Audita se campos, enums, flags e contratos de API propagam consistentemente entre storage, serviços, clientes, analytics e testes. |

---

## 4. Compliance e Regulamentação

| ID da Skill | Utilidade |
|-------------|-----------|
| `security-compliance-compliance-check` | Mapeia mudanças de código/infra para controles específicos do PCI-DSS v4.0 e MAS TRM (Singapura). |
| `gdpr-data-handling` | Implementação prática de GDPR: consent management, data processing, privacy controls, direitos do titular. |
| `privacy-by-design` | Privacidade desde o design: data minimization, consent, encryption, privacy impact assessment. |
| `legal-advisor` | Draft de privacy policies, termos de serviço, disclaimers, DPA e textos legais GDPR-compliant. |
| `lex` | Truth Engine para contexto legal cross-jurisdicional (US, EU, CA) e contract scaffolding. |
| `fda-food-safety-auditor` | Auditoria FDA Food Safety (FSMA), HACCP e PCQI (setor alimentício). |
| `fda-medtech-compliance-auditor` | Auditoria de Dispositivos Médicos (SaMD), IEC 62304 e 21 CFR Part 820 (setor saúde). |

---

## 5. Segurança de Infraestrutura e Cloud

| ID da Skill | Utilidade |
|-------------|-----------|
| `container-security-hardening` | Hardening de Docker/container: base images seguras, non-root, CVE scanning, SBOM/signing, seccomp/AppArmor, Kubernetes pod security. |
| `aws-security-audit` | Avaliação completa de postura de segurança na AWS. |
| `aws-iam-best-practices` | IAM policy review, hardening, implementação de least privilege. |
| `aws-secrets-rotation` | Automação de rotação de secrets AWS (RDS, API keys, credenciais). |
| `aws-compliance-checker` | Compliance automatizado contra CIS, PCI-DSS, HIPAA, SOC 2. |
| `aws-cost-optimizer` | Otimização de custos AWS (indireto, mas ajuda a identificar recursos expostos/desnecessários). |
| `service-mesh-expert` | Service mesh (Istio, Linkerd): traffic management, security policies (mTLS), observabilidade, multi-cluster. |
| `kubernetes-deployment` | Orquestração de containers com foco em segurança de pods, network policies, RBAC. |

---

## 6. SecDevOps e CI/CD Seguro

| ID da Skill | Utilidade |
|-------------|-----------|
| `github-actions-advanced` | CI/CD avançado com OIDC, ambientes, secrets, reusable workflows, matrizes, release automation. |
| `github-actions-debugger` | Diagnóstico e correção de GitHub Actions workflows falhando. |
| `git-hooks-automation` | Git hooks com Husky, lint-staged, pre-commit e commitlint para gates de qualidade antes do CI. |
| `varlock-claude-skill` | Gerenciamento seguro de variáveis de ambiente; secrets nunca expostos em sessões, terminais, logs ou git commits. |
| `protect-mcp-governance` | Governança de MCP: Cedar policy authoring, shadow-to-enforce rollout, Ed25519 receipt verification. |

---

## 7. Investigação e Resposta a Incidentes

| ID da Skill | Utilidade |
|-------------|-----------|
| `systematic-debugging` | Protocolo de 5 fases para root cause antes de qualquer alteração (útil em incidentes de segurança). |
| `error-detective` | Busca logs e codebases por padrões de erro, stack traces e anomalias. |
| `diagnosing-bugs` | Loop de diagnóstico para bugs difíceis e regressões de desempenho. |
| `bug-hunter` | Encontra e corrige bugs sistematicamente, do sintoma à causa-raiz. |
| `bug-hunt-swarm` | Investigação multi-agente paralela para bugs, regressões e falhas não explicadas. |

---

## 8. Governança de Skills e MCP

| ID da Skill | Utilidade |
|-------------|-----------|
| `skill-audit` | Pré-instalação security scanner para skills do agente. 7,5% das skills são maliciosas — audite antes de confiar. |
| `skill-scanner` | Scan de skills para detecção de prompt injection, código malicioso, permissões excessivas, exposição de secrets. |
| `skill-sentinel` | Auditoria e evolução do ecossistema de skills: qualidade, segurança, custos, gaps, duplicações, dependências. |
| `skill-optimizer` | Diagnóstico e otimização de Agent Skills (SKILL.md) com dados reais de sessão. |
| `skill-creator` | Criação de novas skills seguindo boas práticas do Anthropic com zero configuração manual. |
| `writing-skills` | Use quando criando, editando ou verificando skills antes de deploy. |

---

## 9. Segurança de Dados e Privacidade

| ID da Skill | Utilidade |
|-------------|-----------|
| `postgres-best-practices` | Boas práticas de Postgres incluindo criptografia em repouso e controle de acesso. |
| `saas-multi-tenant` | Isolamento de dados entre tenants com RLS (row-level security) — crítico para SaaS seguro. |
| `database-design` | Modelagem segura de schema: mascaramento, criptografia de campos sensíveis, auditoria de acesso. |

---

## 🚀 Stack sugerida para Analista de Segurança

**Auditoria de Aplicação (AppSec):**
```javascript
await skill({ id: "threat-modeling-expert" });
await skill({ id: "security-audit" });
await skill({ id: "web-security-testing" });
await skill({ id: "api-security-testing" });
await skill({ id: "brooks-review" });
await skill({ id: "security-scanning-security-dependencies" });
```

**DevSecOps e Infraestrutura:**
```javascript
await skill({ id: "gha-security-review" });
await skill({ id: "agentic-actions-auditor" });
await skill({ id: "container-security-hardening" });
await skill({ id: "aws-iam-best-practices" });
await skill({ id: "aws-secrets-rotation" });
await skill({ id: "git-hooks-automation" });
await skill({ id: "varlock-claude-skill" });
```

**Compliance e Privacidade:**
```javascript
await skill({ id: "security-compliance-compliance-check" });
await skill({ id: "gdpr-data-handling" });
await skill({ id: "privacy-by-design" });
await skill({ id: "legal-advisor" });
```

**Governança de Skills:**
```javascript
await skill({ id: "skill-audit" });
await skill({ id: "skill-scanner" });
await skill({ id: "skill-sentinel" });
await skill({ id: "protect-mcp-governance" });
```