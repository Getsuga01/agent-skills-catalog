# 🤖 Agentes Especializados

Definições de agentes de IA para atuar como subagentes dedicados a cada perfil técnico. Eles podem ser usados com a ferramenta `subagent` do OpenCode ou como referência para criar agentes personalizados.

## Como usar

No OpenCode, dispare um subagente com:

```javascript
subagent({
  agent: "general",
  description: "Nome do Agente",
  prompt: "Cole aqui o conteúdo do arquivo correspondente em agentes/"
})
```

Ou simplesmente use o conteúdo de cada arquivo como **system prompt** para um agente dedicado.

## Índice

| Pasta | Perfil | Agentes |
|-------|--------|---------|
| `agentes/desenvolvedor/` | Desenvolvedor | `fullstack.md`, `backend.md`, `frontend.md`, `mobile.md`, `devops.md` |
| `agentes/seguranca/` | Analista de Segurança | `appsec.md`, `devsecops.md`, `compliance.md`, `threat-modeler.md` |
| `agentes/dados/` | Analista de Dados | `data-engineer.md`, `data-analyst.md`, `bi-analyst.md`, `ml-ops.md` |

## Fluxo sugerido para usar agentes

```javascript
// 1. Definir escopo com skills
await skill({ id: "brainstorming" });
await skill({ id: "planning-and-task-breakdown" });

// 2. Disparar subagente especializado
subagent({
  agent: "general",
  description: "AppSec Analyst",
  prompt: "Siga o arquivo agentes/seguranca/appsec.md"
});

// 3. Validar antes de entregar
await skill({ id: "verification-before-completion" });
```

---
*Última atualização: 26 de novembro de 2026*