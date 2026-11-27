# 📖 Exemplo de Uso — OpenCode Orchestrator

Este arquivo mostra como usar a ferramenta `opencode-orchestrator` no dia a dia, integrada com as skills e agentes do repositório.

---

## Cenário 1: Desenvolvedor quer criar uma feature em Next.js

### Passo 1: Iniciar o orquestrador

```bash
cd opencode-orchestrator
node index.js
```

### Passo 2: Selecionar no menu

```
╔════════════════════════════════════════════════════════════════╗
║                    OPENCODE ORCHESTRATOR                    ║
╚═══════════════════════════════════════════════════════════════╝

Selecione um perfil para começar:

  1. 👨‍💻 Desenvolvedor
     Desenvolvimento de software fullstack, frontend, backend...

  2. 🔒 Analista de Segurança
     AppSec, DevSecOps, compliance, threat modeling...

  3. 📊 Analista de Dados
     SQL, modelagem, estatística, storytelling...

  0. Sair

Escolha uma opção: 1
```

### Passo 3: Selecionar a tarefa

```
═════════════════════════════════════════════════════════════════
  TAREFAS DISPONÍVEIS — 👨‍💻 Desenvolvedor
═════════════════════════════════════════════════════════════════

  1. Criar feature em Next.js
     Desenvolver uma nova funcionalidade usando App Router...
     Skills: brainstorming, planning-and-task-breakdown, nextjs, typescript, shadcn, ...
     Agentes: fullstack.md

  2. Criar API REST
     ...

Escolha uma tarefa: 1
```

### Passo 4: Acompanhar a execução em tempo real

```
═════════════════════════════════════════════════════════════════
  TAREFAS DISPONÍVEIS — 👨‍💻 Desenvolvedor
═════════════════════════════════════════════════════════════════

Progresso: 60% (3/5)

  ✅ [SKILL] brainstorming — concluído
  ✅ [SKILL] planning-and-task-breakdown — concluído
  ✅ [SKILL] nextjs — concluído
  🔄 [SKILL] typescript — executando
  ⏳ [SKILL] shadcn — pendente

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LOGS DE EXECUÇÃO:
  [14:32:10] Carregando skill: brainstorming — Define escopo...
  [14:32:11] Carregando skill: nextjs — App Router...
  [14:32:12] Carregando skill: typescript — Tipagem estática...
```

---

## Cenário 2: Analista de Segurança quer fazer uma auditoria AppSec

### Via comando direto

```bash
opencode "auditoria-appsec"
```

Isso iniciará o orquestrador direto com a tarefa de auditoria, carregando:

**Skills:**
- `threat-modeling-expert`
- `security-audit`
- `web-security-testing`
- `api-security-testing`
- `security-scanning-security-dependencies`
- `brooks-review`

**Agente:**
- `appsec.md` (Analista de Segurança AppSec)

---

## Cenário 3: Analista de Dados quer criar um pipeline ETL

```bash
opencode "pipeline-dados"
```

**Skills:**
- `database-design`
- `postgresql-optimization`
- `sql-optimization-patterns`
- `dbt-transformation-patterns`
- `airflow-dag-patterns`

**Agente:**
- `data-engineer.md`

---

## 🔗 Integração com o repositório principal

O orquestrador lê a mesma estrutura de skills e agentes definida em:

- `desenvolvedor/skills.md` e `desenvolvedor/README.md`
- `seguranca/skills.md` e `seguranca/README.md`
- `dados/skills.md` e `dados/README.md`
- `agentes/*/*.md`

Se você adicionar uma nova skill ou agente nos arquivos acima, basta atualizar o objeto `TAREFAS` e `PERFIS` em `opencode-orchestrator/index.js` para refletir no orquestrador.

---

## 🎯 Dica: Criar atalho no terminal

No Windows (PowerShell), adicione ao seu `$PROFILE`:

```powershell
function opencode {
    node "C:\caminho\para\opencode-orchestrator\index.js" $args
}
```

No Linux/macOS, adicione ao `.bashrc` ou `.zshrc`:

```bash
alias opencode='node /caminho/para/opencode-orchestrator/index.js'
```

Depois basta digitar:

```bash
opencode
```

ou

```bash
opencode "criar-feature-nextjs"
```