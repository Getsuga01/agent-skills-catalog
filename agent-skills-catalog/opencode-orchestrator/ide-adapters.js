#!/usr/bin/env node
/**
 * IDE Adapters - Integração com Claude Code, VSCode e Antigravity
 * Fornece comandos específicos para cada ambiente de desenvolvimento
 */

class IDEAdapter {
  constructor() {
    this.ide = this.detectarIDE();
  }

  detectarIDE() {
    if (process.env.CLAUDE_CODE || process.env.ANTHROPIC_CLAUDE_CODE || process.env.FORCED_IDE === 'claude-code') {
      return 'claude-code';
    }
    if (process.env.VSCODE_PID || process.env.VSCODE_IPC_HOOK || process.env.FORCED_IDE === 'vscode') {
      return 'vscode';
    }
    if (process.env.ANTIGRAVITY || process.argv.includes('--antigravity') || process.env.FORCED_IDE === 'antigravity') {
      return 'antigravity';
    }
    return 'terminal';
  }

  getComandos() {
    const comandosBase = {
      help: 'Mostra esta ajuda',
      skills: 'Lista skills disponíveis',
      agentes: 'Lista agentes disponíveis',
      perfil: 'Define o perfil ativo (desenvolvedor, seguranca, dados)',
      executar: 'Executa uma tarefa com skills e agentes',
      chat: 'Modo conversacional com agentes',
      arquivo: 'Gerencia arquivos (ler, escrever, modificar, listar, buscar)',
      ler: 'Lê o conteúdo de um arquivo',
      escrever: 'Cria ou sobrescreve um arquivo',
      modificar: 'Substitui texto em um arquivo existente',
      buscar: 'Busca texto em arquivos do projeto',
      contexto: 'Mostra o contexto atual (perfil, tarefa, skills)',
      limpar: 'Limpa a tela do terminal',
      sair: 'Encerra o assistente'
    };

    const comandosIDE = {
      'claude-code': {
        ...comandosBase,
        claude: 'Envia comando direto para Claude Code',
        skill: 'Carrega uma skill do OpenCode via skill({ id })',
        agent: 'Invoca um subagente do OpenCode via subagent({ })'
      },
      'vscode': {
        ...comandosBase,
        'vscode:open': 'Abre arquivo no VSCode (code <arquivo>)',
        'vscode:edit': 'Edita arquivo no VSCode com linha específica',
        'vscode:terminal': 'Abre terminal integrado do VSCode'
      },
      'antigravity': {
        ...comandosBase,
        'ag:skill': 'Ativa skill no Antigravity (ag skill load <id>)',
        'ag:agent': 'Invoca agente no Antigravity (ag agent invoke <nome>)',
        'ag:workflow': 'Executa workflow no Antigravity (ag workflow run <nome>)'
      },
      terminal: comandosBase
    };

    return comandosIDE[this.ide] || comandosBase;
  }

  formatarSaida(conteudo, tipo = 'texto') {
    if (this.ide === 'claude-code') {
      return this.formatarClaudeCode(conteudo, tipo);
    }
    if (this.ide === 'vscode') {
      return this.formatarVSCode(conteudo, tipo);
    }
    if (this.ide === 'antigravity') {
      return this.formatarAntigravity(conteudo, tipo);
    }
    return conteudo;
  }

  formatarClaudeCode(conteudo, tipo) {
    if (tipo === 'skill') {
      return `🔧 **Skill carregada:** ${conteudo}`;
    }
    if (tipo === 'agent') {
      return `🤖 **Agente invocado:** ${conteudo}`;
    }
    if (tipo === 'arquivo') {
      return `📄 **Arquivo:** ${conteudo}`;
    }
    return conteudo;
  }

  formatarVSCode(conteudo, tipo) {
    if (tipo === 'arquivo') {
      return `📂 [Abrir no VSCode] ${conteudo}`;
    }
    return conteudo;
  }

  formatarAntigravity(conteudo, tipo) {
    if (tipo === 'skill') {
      return `AG_SKILL:${conteudo}`;
    }
    if (tipo === 'agent') {
      return `AG_AGENT:${conteudo}`;
    }
    return conteudo;
  }

  getComandoCopia(acao, parametros = {}) {
    if (this.ide === 'claude-code') {
      return this.comandoClaudeCode(acao, parametros);
    }
    if (this.ide === 'vscode') {
      return this.comandoVSCode(acao, parametros);
    }
    if (this.ide === 'antigravity') {
      return this.comandoAntigravity(acao, parametros);
    }
    return `opencode ${acao}`;
  }

  comandoClaudeCode(acao, params) {
    const map = {
      skill: `skill({ id: "${params.id}" })`,
      agent: `subagent({ agent: "general", prompt: "${params.prompt || ''}" })`,
      arquivo: `ler_arquivo("${params.caminho}")`,
      escrever: `escrever_arquivo("${params.caminho}", "${params.conteudo || ''}")`
    };
    return map[acao] || `opencode ${acao}`;
  }

  comandoVSCode(acao, params) {
    const map = {
      abrir: `code "${params.caminho}"`,
      editar: `code --goto "${params.caminho}:${params.linha || 1}"`,
      terminal: `code .`
    };
    return map[acao] || `opencode ${acao}`;
  }

  comandoAntigravity(acao, params) {
    const map = {
      skill: `ag skill load ${params.id}`,
      agent: `ag agent invoke ${params.nome}`,
      workflow: `ag workflow run ${params.workflow}`
    };
    return map[acao] || `opencode ${acao}`;
  }
}

module.exports = { IDEAdapter };