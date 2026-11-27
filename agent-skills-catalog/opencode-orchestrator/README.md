# 🎯 OpenCode Orchestrator - Assistente Completo

Ferramenta de linha de comando que transforma o OpenCode em um **assistente interativo** com:

- 💬 **Chat conversacional** com agentes especializados
- 📄 **Gerenciamento de arquivos** (ler, escrever, modificar, buscar)
- 🖥️ **Integração com IDEs**: Claude Code, VSCode, Antigravity
- 📋 **Rastreamento** de tarefas, skills e agentes em tempo real
- 🔌 **Servidor MCP** que expõe skills, agentes e arquivos como ferramentas nativas do OpenCode

---

## 📦 Instalação

```bash
cd "D:\Qi tech\Educadados\agent-skills-catalog\opencode-orchestrator"
npm install
```

---

## ▶️ Como usar

### Modo interativo (recomendado)

```powershell
node index.js
```

Ou via wrapper (Windows):

```powershell
opencode.bat
```

Ou via wrapper (Linux/macOS):

```bash
./opencode.sh
```

### Exemplos de uso

| Comando | Descrição |
|---------|-----------|
| `perfil desenvolvedor` | Define o perfil ativo |
| `agentes` | Lista agentes disponíveis |
| `executar criar-feature-nextjs` | Executa uma tarefa pré-definida |
| `chat fullstack "Como criar um componente React?"` | Conversa com um agente |
| `ler README.md` | Lê o conteúdo de um arquivo |
| `escrever novo.md "# Título"` | Cria um novo arquivo |
| `modificar arquivo.txt "antigo" "novo"` | Substitui texto em arquivo |
| `buscar "skill"` | Busca texto em arquivos .md |
| `contexto` | Mostra perfil, tarefa e IDE ativa |
| `limpar` | Limpa a tela |
| `sair` | Encerra o assistente |

---

## 🔌 Integração nativa com o OpenCode (MCP)

Esta é a forma recomendada de usar o assistente **de dentro do OpenCode**: em vez de abrir um chat separado, o OpenCode chama o repositório como se fosse uma ferramenta dele.

### Como funciona

O arquivo `mcp-server.js` é um servidor **MCP (Model Context Protocol)** via stdio/JSON-RPC 2.0, sem dependências externas. Ele expõe 11 ferramentas:

| Ferramenta | Para que serve |
|------------|----------------|
| `listar_perfis` | Lista os 3 perfis com contagem de skills e agentes |
| `obter_perfil` | Devolve README + catálogo completo de skills de um perfil |
| `listar_agentes` | Lista os subagentes (com filtro opcional por perfil) |
| `obter_agente` | Devolve o prompt de sistema completo de um agente |
| `listar_arquivos` | Lista pastas e arquivos de um diretório |
| `ler_arquivo` | Lê um arquivo de texto |
| `escrever_arquivo` | Cria um arquivo (recusa sobrescrever sem `sobrescrever=true`) |
| `modificar_arquivo` | Substitui um trecho de texto |
| `adicionar_arquivo` | Anexa conteúdo ao final de um arquivo |
| `deletar_arquivo` | Remove um arquivo |
| `buscar_texto` | Busca um termo nos arquivos do repositório |

Todas as operações de arquivo são **restritas à raiz do repositório**: caminhos absolutos e `..` são bloqueados.

### Ativação

Já está registrado em `opencode.json` na raiz:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "servers": {
      "orchestrator": {
        "type": "local",
        "command": ["node", "opencode-orchestrator/mcp-server.js"],
        "cwd": "."
      }
    }
  }
}
```

Confira o status:

```powershell
opencode mcp list
# ● ✓ orchestrator connected
```

O OpenCode recarrega a configuração automaticamente — não é preciso reiniciar.

### Usando no OpenCode

**Comandos prontos** (em `.opencode/commands/`):

```text
/skills desenvolvedor criar uma API de autenticação
/agentes seguranca
/agente appsec revisar o fluxo de login
/buscar brainstorming
```

**Subagente** (`.opencode/agents/orquestrador.md`):

```text
Use o subagente orquestrador para escolher as skills certas para esta tarefa.
```

**Chamada direta das ferramentas** pelo agente:

```text
tools.orchestrator.obter_perfil({ perfil: "dados" })
tools.orchestrator.obter_agente({ nome: "appsec" })
tools.orchestrator.buscar_texto({ termo: "nextjs" })
```

### Teste do protocolo

```powershell
npm run test:mcp
```

Sobe o servidor como processo filho e valida handshake, `tools/list`, todas as ferramentas, escrita/leitura/busca e bloqueios de segurança (27 verificações).

---

## 🖥️ Integração com IDEs

### Claude Code

```bash
node index.js --ide claude-code
```

No Claude Code, use os comandos gerados:
```javascript
skill({ id: "brainstorming" })
subagent({ agent: "general", prompt: "Siga o arquivo agentes/..." })
```

### VSCode

```bash
node index.js --ide vscode
```

No terminal do VSCode:
```bash
code README.md          # Abre arquivo
code --goto arquivo:10  # Abre na linha 10
code .                  # Abre o projeto
```

### Antigravity

```bash
node index.js --ide antigravity
```

Comandos no Antigravity:
```bash
ag skill load brainstorming
ag agent invoke fullstack
ag workflow run criar-feature-nextjs
```

---

## 📁 Estrutura do projeto

```
opencode-orchestrator/
├── index.js           # Orquestrador principal com chat
├── file-manager.js    # Gerenciador de arquivos (ler/escrever/modificar)
├── ide-adapters.js    # Adapters para Claude Code, VSCode, Antigravity
├── chat-interface.js  # Interface de chat interativo
├── mcp-server.js      # Servidor MCP (stdio/JSON-RPC) usado pelo OpenCode
├── package.json       # Metadados do projeto
├── opencode.bat       # Wrapper para Windows
├── opencode.sh        # Wrapper para Linux/macOS
├── testar.js          # Teste antigo (versão de menu)
├── testar-automatico.js  # Teste das classes internas (58 verificações)
├── testar-mcp.js      # Teste do protocolo MCP (27 verificações)
└── README.md          # Este arquivo
```

---

## 🧪 Testes

Execute a suíte automatizada (não precisa de interação manual):

```powershell
npm test
```

ou

```powershell
node testar-automatico.js
```

Ela valida **58 verificações** em três camadas:

| Camada | Cobertura |
|--------|-----------|
| `FileManager` | listar, ler, escrever (novo/sobrescrever), modificar, adicionar, deletar, buscar, caminhos aninhados e erros |
| `IDEAdapter` | detecção de IDE (Claude Code, VSCode, Antigravity, terminal), comandos por IDE, formatação e comandos de cópia |
| `ChatInterface` | help, perfil, agentes, skills, contexto, executar, chat, ler/escrever/modificar/buscar e tratamento de erros |

O teste usa um diretório temporário isolado (`__teste_tmp__`) e o remove ao final.

---

## 🔗 Integração com o repositório principal

O assistente lê a mesma estrutura de skills e agentes definida em:

- `desenvolvedor/skills.md` e `desenvolvedor/README.md`
- `seguranca/skills.md` e `seguranca/README.md`
- `dados/skills.md` e `dados/README.md`
- `agentes/*/*.md` (12 subagentes especializados)

Para usar as skills reais do OpenCode, carregue-as via:
```javascript
skill({ id: "brainstorming" })
skill({ id: "nextjs" })
```

E invoque agentes via:
```javascript
subagent({ agent: "general", prompt: "..." })
```

---

## 📄 Licença

MIT