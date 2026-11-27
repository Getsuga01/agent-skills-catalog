# 📤 Como criar o repositório no GitHub

Este guia mostra como publicar o conteúdo desta pasta no seu próprio repositório GitHub.

## Pré-requisitos

- Conta no [GitHub](https://github.com)
- [Git](https://git-scm.com/) instalado localmente
- (Opcional) [GitHub CLI (`gh`)](https://cli.github.com/) instalado e autenticado (`gh auth login`)

## Passo 1: Inicializar o repositório local

Abra o terminal na raiz desta pasta (`D:\Qi tech\Educadados\agent-skills-catalog`) e execute:

```powershell
git init
git add .
git commit -m "feat: catálogo de skills e agentes + servidor MCP"
```

> Antes de commitar, confira o que vai subir com `git status`. Os arquivos `.pbix`/`.xlsx` e a pasta `Base de Dados-...` estão fora desta pasta e já são ignorados pelo `.gitignore`.

## Passo 2: Criar o repositório no GitHub

### Opção A — Via GitHub CLI (mais rápido)

```powershell
gh repo create agent-skills-catalog --public --source=. --remote=origin --push
```

### Opção B — Via interface web

1. Acesse https://github.com/new
2. Nome do repositório: `agent-skills-catalog`
3. Deixe **vazio** (não inicialize com README, .gitignore nem licença)
4. Clique em **Create repository**
5. Copie os comandos mostrados na tela, por exemplo:

```powershell
git remote add origin https://github.com/SEU-USUARIO/agent-skills-catalog.git
git branch -M main
git push -u origin main
```

## Passo 3: Verificar

Acesse `https://github.com/SEU-USUARIO/agent-skills-catalog` e confirme que os arquivos estão publicados.

## Atualizações futuras

Sempre que edicionar os arquivos localmente:

```powershell
git add .
git commit -m "feat: atualiza lista de skills"
git push
```

---
*Dica: mantenha este repositório público ou privado conforme sua preferência. As skills são metadados do OpenCode e não contêm segredos.*