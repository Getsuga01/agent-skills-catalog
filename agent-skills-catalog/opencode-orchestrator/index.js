#!/usr/bin/env node
/**
 * OpenCode Orchestrator - Versão Completa com Chat e IDEs
 *
 * Uso:
 *   node index.js                        # Modo interativo com chat
 *   node index.js --ide=vscode           # Força a IDE (forma com "=")
 *   node index.js --ide vscode           # Força a IDE (forma com espaço)
 *   node index.js --antigravity          # Atalho para Antigravity
 *
 * IDEs suportadas: claude-code, vscode, antigravity, terminal
 */

const { ChatInterface } = require('./chat-interface');

// Detectar argumentos de linha de comando para forçar IDE
const args = process.argv.slice(2);
const indiceIde = args.findIndex(a => a === '--ide' || a.startsWith('--ide='));

if (indiceIde !== -1) {
  const arg = args[indiceIde];
  const nomeIde = arg.includes('=') ? arg.split('=')[1] : args[indiceIde + 1];

  if (nomeIde) {
    process.env.FORCED_IDE = nomeIde;
  } else {
    console.error('❌ Uso: node index.js --ide=<claude-code|vscode|antigravity|terminal>');
    process.exit(1);
  }
}

if (args.includes('--antigravity')) {
  process.env.FORCED_IDE = 'antigravity';
}

const chat = new ChatInterface();
chat.iniciar().catch(err => {
  console.error('Erro ao iniciar o assistente:', err);
  process.exit(1);
});
