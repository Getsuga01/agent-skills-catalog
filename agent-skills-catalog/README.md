# 🛠️ Repositório de Skills e Agentes do OpenCode

Coleção curada e abrangente de **skills** (capacidades sob demanda) e **agentes especializados** (subagentes com system prompts prontos) do OpenCode / Claude Code, organizados por perfil técnico:

- 👨‍💻 **[Desenvolvedor](./desenvolvedor/)**
- 🔒 **[Analista de Segurança](./seguranca/)**
- 📊 **[Analista de Dados](./dados/)**
- 🤖 **[Agentes Especializados](./agentes/)** — subagentes prontos para cada sub-especialidade

---

## 🧭 O que são Skills e Agentes?

| Conceito | O que é | Como usar no OpenCode |
|----------|---------|----------------------|
| **Skill** | Capacidade especializada que o agente carrega antes de executar uma tarefa (planejamento, código, teste, design, segurança, etc.) | `skill({ id: "id-da-skill" })` |
| **Agente** | Subagente com system prompt pronto para uma função específica (ex.: AppSec, Data Engineer, Fullstack) | `subagent({ agent: "general", prompt: "..." })` |

> **Regra de ouro:** Sempre carregue skills relevantes **antes** de qualquer ação, incluindo perguntas esclarecedoras. Se uma skill aplicar ao seu uso, ela é obrigatória.

---

## 📂 Estrutura do repositório

```
📁 agent-skills-catalog/
├── 📄 README.md                      # Este arquivo
├── 📄 INSTRUCOES-GITHUB.md           # Como criar o repositório no GitHub
├── 📄 CHAMADA-RAPIDA.md              # Cheat sheet de cópia-e-cola
├── 📁 desenvolvedor/                 # Skills para Desenvolvedor
│   ├── README.md
│   └── skills.md
├── 📁 seguranca/                     # Skills para Analista de Segurança
│   ├── README.md
│   └── skills.md
├── 📁 dados/                         # Skills para Analista de Dados
│   ├── README.md
│   └── skills.md
└── 📁 agentes/                       # Agentes especializados (subagentes)
    ├── README.md
    ├── desenvolvedor/
    │   ├── fullstack.md
    │   ├── backend.md
    │   ├── frontend.md
    │   ├── mobile.md
    │   └── devops.md
    ├── seguranca/
    │   ├── appsec.md
    │   ├── devsecops.md
    │   ├── compliance.md
    │   └── threat-modeler.md
    └── dados/
        ├── data-engineer.md
        ├── data-analyst.md
        ├── bi-analyst.md
        └── ml-ops.md
```

### Integração nativa (`.opencode/` + MCP)

```
📁 .opencode/
├── commands/                      # Comandos /skills, /agentes, /agente, /buscar
│   ├── skills.md
│   ├── agentes.md
│   ├── agente.md
│   └── buscar.md
└── agents/
    └── orquestrador.md            # Subagente que consulta este repositório

📄 opencode.json                   # Registra o servidor MCP "orchestrator"
📁 opencode-orchestrator/
└── mcp-server.js                  # Servidor MCP (stdio) com 11 ferramentas
```

---

## 🚀 Como usar

### 1. Carregar uma skill

```javascript
await skill({ id: "brainstorming" });
await skill({ id: "nextjs" });
await skill({ id: "testing" });
```

### 2. Disparar um subagente

```javascript
subagent({
  agent: "general",
  description: "Desenvolvedor Fullstack",
  prompt: "Você é o agente Desenvolvedor Fullstack. Leia o arquivo agentes/desenvolvedor/fullstack.md e siga suas instruções para esta tarefa."
});
```

### 3. Fluxo universal antes de qualquer tarefa

```javascript
await skill({ id: "brainstorming" });           // 1. Definir escopo e requisitos
await skill({ id: "planning-and-task-breakdown" }); // 2. Decompor em tarefas
await skill({ id: "systematic-debugging" });    // 3. (se for debug) Encontrar causa-raiz
```

### 4. Usar este repositório como ferramenta do OpenCode

O repositório já vem conectado ao OpenCode por um **servidor MCP**. Não é preciso abrir nada separado:

```powershell
opencode mcp list        # deve mostrar: ✓ orchestrator connected
```

Dentro do OpenCode:

| Comando | O que faz |
|---------|-----------|
| `/skills dados criar um dashboard` | Carrega o catálogo de skills do perfil e sugere as 3 primeiras |
| `/agentes seguranca` | Lista os subagentes e recomenda um |
| `/agente appsec revisar o login` | Carrega o prompt do agente e executa a tarefa |
| `/buscar nextjs` | Busca o termo nos arquivos do repositório |

Ou peça ao agente para usar as ferramentas `orchestrator.*` (`obter_perfil`, `obter_agente`, `ler_arquivo`, `buscar_texto`, ...).

Detalhes e lista completa das 11 ferramentas: [`opencode-orchestrator/README.md`](./opencode-orchestrator/README.md#-integração-nativa-com-o-opencode-mcp).

---

## 📊 Dados do Skills Directory (pesquisa externa)

O site [skillsdirectory.com](https://www.skillsdirectory.com/skills?category=ai-agents&securityGrade=all&sort=stars) organiza skills nas seguintes categorias com volumes aproximados:

| Categoria | Volume de Skills |
|-----------|-----------------|
| AI & Agents | 398.182 |
| Development | 87.085 |
| Tools & Automation | 50.533 |
| Research | 32.426 |
| Testing & QA | 34.628 |
| Security | 31.072 |
| Business & Operations | 41.988 |
| Code Review & Quality | 17.319 |
| Documentation | 19.022 |
| Content & Marketing | 17.138 |
| DevOps & Cloud | 23.294 |
| Data & Analytics | 13.404 |
| Design & UX | 12.322 |
| Databases | 5.822 |
| Education & Personal | 7.223 |
| Blockchain & Web3 | 1.546 |

Recursos úteis do diretório:
- [Como instalar skills Claude](/learn/how-to-install-claude-skills)
- [Como escrever SKILL.md](/learn/how-to-write-a-skill-md)
- [Skills vs MCP](/learn/claude-skills-vs-mcp-servers)
- [Diretórios de skills comparados](/learn/claude-skills-directories-compared)
- [Skills seguras](/skills/best/secure-claude-skills)
- [Security badges](/security/badges)

> ⚠️ Nota: as listas individuais de skills do diretório são renderizadas via JavaScript. Os nomes específicos das skills neste repositório vêm do catálogo nativo do ambiente OpenCode.

---

## 📤 Subir para o seu próprio GitHub

Consulte [`INSTRUCOES-GITHUB.md`](./INSTRUCOES-GITHUB.md).

---
*Última atualização: 26 de novembro de 2026*