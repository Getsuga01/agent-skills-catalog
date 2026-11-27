#!/usr/bin/env node
/**
 * Teste automatizado do OpenCode Orchestrator
 *
 * Valida sem interação manual:
 *  - FileManager: listar, ler, escrever, modificar, adicionar, deletar, buscar
 *  - IDEAdapter: detecção de IDE, comandos, formatação, comandos de cópia
 *  - ChatInterface: comandos não-interativos (help, perfil, agentes, chat, arquivos...)
 *
 * Uso: node testar-automatico.js
 */

const fs = require('fs');
const path = require('path');

const { FileManager } = require('./file-manager');
const { IDEAdapter } = require('./ide-adapters');
const { ChatInterface } = require('./chat-interface');

// ─────────────────────────────────────────────────────────────────────────────
// Mini framework de testes
// ─────────────────────────────────────────────────────────────────────────────

let passou = 0;
let falhou = 0;
const falhas = [];

function teste(nome, fn) {
  try {
    fn();
    passou++;
    console.log(`  \x1b[32m✅\x1b[0m ${nome}`);
  } catch (err) {
    falhou++;
    falhas.push({ nome, erro: err.message });
    console.log(`  \x1b[31m❌\x1b[0m ${nome}`);
    console.log(`     \x1b[31m→ ${err.message}\x1b[0m`);
  }
}

async function testeAsync(nome, fn) {
  try {
    await fn();
    passou++;
    console.log(`  \x1b[32m✅\x1b[0m ${nome}`);
  } catch (err) {
    falhou++;
    falhas.push({ nome, erro: err.message });
    console.log(`  \x1b[31m❌\x1b[0m ${nome}`);
    console.log(`     \x1b[31m→ ${err.message}\x1b[0m`);
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'asserção falhou');
}

function assertIgual(actual, esperado, msg) {
  if (actual !== esperado) {
    throw new Error(
      `${msg || 'valor diferente'}: esperado ${JSON.stringify(esperado)}, recebido ${JSON.stringify(actual)}`
    );
  }
}

function assertContem(texto, trecho, msg) {
  if (!String(texto).includes(trecho)) {
    throw new Error(`${msg || 'texto não contém'}: ${JSON.stringify(trecho)}`);
  }
}

function capturarConsole(fn) {
  const original = console.log;
  const linhas = [];
  console.log = (...args) => linhas.push(args.join(' '));
  try {
    fn();
  } finally {
    console.log = original;
  }
  return linhas.join('\n');
}

async function capturarConsoleAsync(fn) {
  const original = console.log;
  const linhas = [];
  console.log = (...args) => linhas.push(args.join(' '));
  try {
    await fn();
  } finally {
    console.log = original;
  }
  return linhas.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// Preparação do diretório temporário
// ─────────────────────────────────────────────────────────────────────────────

const tmp = path.join(__dirname, '__teste_tmp__');
if (fs.existsSync(tmp)) fs.rmSync(tmp, { recursive: true, force: true });
fs.mkdirSync(tmp, { recursive: true });

const fm = new FileManager(tmp);

// ─────────────────────────────────────────────────────────────────────────────
// 1. FileManager
// ─────────────────────────────────────────────────────────────────────────────

console.log('\n\x1b[36m━━━ 1. FileManager ━━━\x1b[0m');

teste('listar diretório vazio retorna sucesso', () => {
  const r = fm.listar('.');
  assertIgual(r.sucesso, true, 'sucesso');
  assert(Array.isArray(r.itens), 'itens deve ser array');
  assertIgual(r.itens.length, 0, 'quantidade de itens');
});

teste('escrever cria arquivo novo', () => {
  const r = fm.escrever('novo.md', '# Olá Mundo\nLinha dois');
  assertIgual(r.sucesso, true, 'sucesso');
  assert(fs.existsSync(path.join(tmp, 'novo.md')), 'arquivo deve existir');
  assertContem(r.mensagem, 'criado');
});

teste('escrever sem sobrescrever retorna erro', () => {
  const r = fm.escrever('novo.md', 'outro conteúdo');
  assert(r.erro, 'deve retornar erro');
  assertContem(r.erro, 'já existe');
});

teste('escrever com sobrescrever=true substitui', () => {
  const r = fm.escrever('novo.md', '# Substituído', true);
  assertIgual(r.sucesso, true, 'sucesso');
  assertContem(fm.ler('novo.md').conteudo, '# Substituído');
});

teste('ler retorna conteúdo, tamanho e linhas', () => {
  fm.escrever('leitura.txt', 'linha1\nlinha2\nlinha3', true);
  const r = fm.ler('leitura.txt');
  assertIgual(r.sucesso, true, 'sucesso');
  assertIgual(r.linhas, 3, 'linhas');
  assertContem(r.conteudo, 'linha2');
  assert(r.tamanho > 0, 'tamanho > 0');
});

teste('ler arquivo inexistente retorna erro', () => {
  const r = fm.ler('nao-existe.md');
  assert(r.erro, 'deve retornar erro');
  assertContem(r.erro, 'não encontrado');
});

teste('ler diretório retorna erro', () => {
  const r = fm.ler('.');
  assert(r.erro, 'deve retornar erro');
  assertContem(r.erro, 'diretório');
});

teste('modificar substitui texto existente', () => {
  fm.escrever('mod.txt', 'versão antiga do texto', true);
  const r = fm.modificar('mod.txt', 'antiga', 'nova');
  assertIgual(r.sucesso, true, 'sucesso');
  assertContem(fm.ler('mod.txt').conteudo, 'versão nova do texto');
});

teste('modificar texto inexistente retorna erro', () => {
  const r = fm.modificar('mod.txt', 'inexistente-xyz', 'x');
  assert(r.erro, 'deve retornar erro');
  assertContem(r.erro, 'não encontrado');
});

teste('adicionar anexa conteúdo ao final', () => {
  fm.escrever('append.txt', 'início', true);
  const r = fm.adicionar('append.txt', ' | fim');
  assertIgual(r.sucesso, true, 'sucesso');
  assertContem(fm.ler('append.txt').conteudo, 'início | fim');
});

teste('adicionar em arquivo inexistente cria o arquivo', () => {
  const r = fm.adicionar('append-novo.txt', 'criado por append');
  assertIgual(r.sucesso, true, 'sucesso');
  assertContem(fm.ler('append-novo.txt').conteudo, 'criado por append');
});

teste('escrever em caminho aninhado cria diretórios', () => {
  const r = fm.escrever('sub/pasta/arquivo.md', 'aninhado');
  assertIgual(r.sucesso, true, 'sucesso');
  assert(fs.existsSync(path.join(tmp, 'sub', 'pasta', 'arquivo.md')), 'arquivo aninhado deve existir');
});

teste('buscar encontra termo em arquivos .md', () => {
  const r = fm.buscar('aninhado');
  assertIgual(r.sucesso, true, 'sucesso');
  assert(r.total >= 1, `esperado ao menos 1 resultado, recebeu ${r.total}`);
  assertContem(r.resultados[0].arquivo, '.md');
});

teste('buscar termo inexistente retorna zero resultados', () => {
  const r = fm.buscar('termo-que-nao-existe-xyz-123');
  assertIgual(r.total, 0, 'total de resultados');
});

teste('listar reflete arquivos criados', () => {
  const r = fm.listar('.');
  const nomes = r.itens.map(i => i.nome);
  assert(nomes.includes('novo.md'), 'deve conter novo.md');
  assert(nomes.includes('sub'), 'deve conter a pasta sub');
});

teste('deletar remove arquivo', () => {
  const r = fm.deletar('leitura.txt');
  assertIgual(r.sucesso, true, 'sucesso');
  assert(!fs.existsSync(path.join(tmp, 'leitura.txt')), 'arquivo não deve existir');
});

teste('deletar arquivo inexistente retorna erro', () => {
  const r = fm.deletar('leitura.txt');
  assert(r.erro, 'deve retornar erro');
  assertContem(r.erro, 'não encontrado');
});

teste('listar diretório inexistente retorna erro', () => {
  const r = fm.listar('pasta-que-nao-existe');
  assert(r.erro, 'deve retornar erro');
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. IDEAdapter
// ─────────────────────────────────────────────────────────────────────────────

console.log('\n\x1b[36m━━━ 2. IDEAdapter ━━━\x1b[0m');

const chavesIDE = [
  'CLAUDE_CODE',
  'ANTHROPIC_CLAUDE_CODE',
  'VSCODE_PID',
  'VSCODE_IPC_HOOK',
  'ANTIGRAVITY',
  'FORCED_IDE'
];
const envBackup = {};
chavesIDE.forEach(k => (envBackup[k] = process.env[k]));

function limparEnvIDE() {
  chavesIDE.forEach(k => delete process.env[k]);
}
function restaurarEnvIDE() {
  chavesIDE.forEach(k => {
    if (envBackup[k] === undefined) delete process.env[k];
    else process.env[k] = envBackup[k];
  });
}

function comIDE(nome, fn) {
  limparEnvIDE();
  process.env.FORCED_IDE = nome;
  try {
    return fn(new IDEAdapter());
  } finally {
    restaurarEnvIDE();
  }
}

teste('detecta claude-code via FORCED_IDE', () => {
  comIDE('claude-code', ide => assertIgual(ide.ide, 'claude-code'));
});

teste('detecta vscode via FORCED_IDE', () => {
  comIDE('vscode', ide => assertIgual(ide.ide, 'vscode'));
});

teste('detecta antigravity via FORCED_IDE', () => {
  comIDE('antigravity', ide => assertIgual(ide.ide, 'antigravity'));
});

teste('detecta terminal quando nada está definido', () => {
  limparEnvIDE();
  try {
    assertIgual(new IDEAdapter().ide, 'terminal');
  } finally {
    restaurarEnvIDE();
  }
});

teste('getComandos retorna comandos base em todas as IDEs', () => {
  ['claude-code', 'vscode', 'antigravity', 'terminal'].forEach(nome => {
    comIDE(nome, ide => {
      const cmds = ide.getComandos();
      ['help', 'skills', 'agentes', 'perfil', 'executar', 'chat', 'arquivo', 'ler', 'escrever', 'modificar', 'buscar', 'contexto', 'sair']
        .forEach(c => assert(cmds[c], `${nome} deve ter comando "${c}"`));
    });
  });
});

teste('getComandos inclui comandos específicos de claude-code', () => {
  comIDE('claude-code', ide => {
    const cmds = ide.getComandos();
    assert(cmds.skill && cmds.agent && cmds.claude, 'deve ter skill/agent/claude');
  });
});

teste('getComandos inclui comandos específicos de vscode', () => {
  comIDE('vscode', ide => {
    const cmds = ide.getComandos();
    assert(cmds['vscode:open'] && cmds['vscode:edit'] && cmds['vscode:terminal'], 'deve ter vscode:*');
  });
});

teste('getComandos inclui comandos específicos de antigravity', () => {
  comIDE('antigravity', ide => {
    const cmds = ide.getComandos();
    assert(cmds['ag:skill'] && cmds['ag:agent'] && cmds['ag:workflow'], 'deve ter ag:*');
  });
});

teste('formatarSaida formata skill no claude-code', () => {
  comIDE('claude-code', ide => {
    assertContem(ide.formatarSaida('brainstorming', 'skill'), 'Skill carregada');
  });
});

teste('formatarSaida formata agente no claude-code', () => {
  comIDE('claude-code', ide => {
    assertContem(ide.formatarSaida('fullstack', 'agent'), 'Agente invocado');
  });
});

teste('formatarSaida formata arquivo no vscode', () => {
  comIDE('vscode', ide => {
    assertContem(ide.formatarSaida('README.md', 'arquivo'), 'Abrir no VSCode');
  });
});

teste('formatarSaida formata skill no antigravity', () => {
  comIDE('antigravity', ide => {
    assertIgual(ide.formatarSaida('nextjs', 'skill'), 'AG_SKILL:nextjs');
  });
});

teste('formatarSaida é identidade no terminal', () => {
  comIDE('terminal', ide => {
    assertIgual(ide.formatarSaida('texto puro', 'skill'), 'texto puro');
  });
});

teste('getComandoCopia gera skill() no claude-code', () => {
  comIDE('claude-code', ide => {
    assertIgual(ide.getComandoCopia('skill', { id: 'brainstorming' }), 'skill({ id: "brainstorming" })');
  });
});

teste('getComandoCopia gera code no vscode', () => {
  comIDE('vscode', ide => {
    assertIgual(ide.getComandoCopia('abrir', { caminho: 'README.md' }), 'code "README.md"');
  });
});

teste('getComandoCopia gera ag no antigravity', () => {
  comIDE('antigravity', ide => {
    assertIgual(ide.getComandoCopia('skill', { id: 'nextjs' }), 'ag skill load nextjs');
  });
});

teste('getComandoCopia tem fallback no terminal', () => {
  comIDE('terminal', ide => {
    assertIgual(ide.getComandoCopia('executar'), 'opencode executar');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. ChatInterface (métodos não-interativos)
// ─────────────────────────────────────────────────────────────────────────────

console.log('\n\x1b[36m━━━ 3. ChatInterface ━━━\x1b[0m');

async function testarChatInterface() {
let chat;
teste('instancia ChatInterface', () => {
  chat = new ChatInterface();
  assert(chat.fileManager, 'deve ter fileManager');
  assert(chat.ide, 'deve ter ide');
  assert(chat.contexto, 'deve ter contexto');
});

teste('dividirComando respeita aspas duplas', () => {
  const p = chat.dividirComando('escrever a.md "# Título com espaços"');
  assertIgual(
    JSON.stringify(p),
    JSON.stringify(['escrever', 'a.md', '# Título com espaços'])
  );
});

teste('dividirComando respeita aspas simples', () => {
  const p = chat.dividirComando("modificar x.txt 'antigo' 'novo valor'");
  assertIgual(
    JSON.stringify(p),
    JSON.stringify(['modificar', 'x.txt', 'antigo', 'novo valor'])
  );
});

teste('dividirComando lida com comando vazio', () => {
  assertIgual(JSON.stringify(chat.dividirComando('   ')), JSON.stringify([]));
});

await testeAsync('escrever com aspas grava conteúdo sem aspas', async () => {
  const rel = path.relative(process.cwd(), path.join(tmp, 'aspas.md'));
  await capturarConsoleAsync(() => chat.processarComando(`escrever ${rel} "# Título com espaços"`));
  const conteudo = fs.readFileSync(path.join(tmp, 'aspas.md'), 'utf-8');
  assertIgual(conteudo, '# Título com espaços');
});

if (chat) {
  await testeAsync('help mostra comandos disponíveis', async () => {
    const saida = await capturarConsoleAsync(() => chat.processarComando('help'));
    assertContem(saida, 'Comandos disponíveis');
    assertContem(saida, 'perfil');
  });

  await testeAsync('perfil inválido retorna erro', async () => {
    const saida = await capturarConsoleAsync(() => chat.processarComando('perfil invalido'));
    assertContem(saida, 'Perfil inválido');
  });

  await testeAsync('perfil desenvolvedor ativa o perfil', async () => {
    const saida = await capturarConsoleAsync(() => chat.processarComando('perfil desenvolvedor'));
    assertContem(saida, 'Perfil alterado');
    assertIgual(chat.contexto.perfilAtivo, 'desenvolvedor');
  });

  await testeAsync('agentes lista os 12 agentes', async () => {
    const saida = await capturarConsoleAsync(() => chat.processarComando('agentes'));
    assertContem(saida, 'fullstack');
    assertContem(saida, 'appsec');
    assertContem(saida, 'ml-ops');
  });

  await testeAsync('skills lista categorias', async () => {
    const saida = await capturarConsoleAsync(() => chat.processarComando('skills'));
    assertContem(saida, 'Skills disponíveis');
  });

  await testeAsync('contexto mostra perfil ativo e IDE', async () => {
    const saida = await capturarConsoleAsync(() => chat.processarComando('contexto'));
    assertContem(saida, 'Perfil: desenvolvedor');
    assertContem(saida, 'IDE:');
  });

  await testeAsync('executar registra a tarefa ativa', async () => {
    const saida = await capturarConsoleAsync(() => chat.processarComando('executar criar-feature-nextjs'));
    assertContem(saida, 'Executando tarefa');
    assertIgual(chat.contexto.tarefaAtiva, 'criar-feature-nextjs');
  });

  await testeAsync('chat fullstack responde ao agente', async () => {
    const saida = await capturarConsoleAsync(() =>
      chat.processarComando('chat fullstack Como criar um componente React')
    );
    assertContem(saida, 'Agente Fullstack');
    assertContem(saida, 'componente React');
  });

  await testeAsync('chat sem argumentos mostra instruções', async () => {
    const saida = await capturarConsoleAsync(() => chat.processarComando('chat'));
    assertContem(saida, 'Use: chat');
  });

  await testeAsync('chat com agente desconhecido usa fallback', async () => {
    const saida = await capturarConsoleAsync(() => chat.processarComando('chat desconhecido mensagem teste'));
    assertContem(saida, 'Resposta simulada');
  });

  await testeAsync('ler arquivo inexistente reporta erro', async () => {
    const saida = await capturarConsoleAsync(() => chat.processarComando('ler arquivo-que-nao-existe.md'));
    assertContem(saida, 'não encontrado');
  });

  await testeAsync('ler README.md exibe conteúdo', async () => {
    const saida = await capturarConsoleAsync(() => chat.processarComando('ler README.md'));
    assertContem(saida, 'OpenCode Orchestrator');
  });

  await testeAsync('escrever cria arquivo via chat', async () => {
    const rel = path.relative(process.cwd(), path.join(tmp, 'chat-teste.md'));
    const saida = await capturarConsoleAsync(() =>
      chat.processarComando(`escrever ${rel} conteudo-do-chat`)
    );
    assertContem(saida, 'criado com sucesso');
    assertContem(fs.readFileSync(path.join(tmp, 'chat-teste.md'), 'utf-8'), 'conteudo-do-chat');
  });

  await testeAsync('modificar altera arquivo via chat', async () => {
    const rel = path.relative(process.cwd(), path.join(tmp, 'chat-teste.md'));
    const saida = await capturarConsoleAsync(() =>
      chat.processarComando(`modificar ${rel} conteudo-do-chat conteudo-novo`)
    );
    assertContem(saida, 'sobrescrito com sucesso');
    assertContem(fs.readFileSync(path.join(tmp, 'chat-teste.md'), 'utf-8'), 'conteudo-novo');
  });

  await testeAsync('buscar encontra termo', async () => {
    const saida = await capturarConsoleAsync(() => chat.processarComando('buscar OpenCode'));
    assertContem(saida, 'Busca por "OpenCode"');
    assertContem(saida, 'resultado(s)');
  });

  await testeAsync('arquivo listar exibe itens', async () => {
    const rel = path.relative(process.cwd(), tmp);
    const saida = await capturarConsoleAsync(() => chat.processarComando(`arquivo listar ${rel}`));
    assertContem(saida, 'Conteúdo de');
    assertContem(saida, 'chat-teste.md');
  });

  await testeAsync('comando desconhecido é reportado', async () => {
    const saida = await capturarConsoleAsync(() => chat.processarComando('comando-invalido-xyz'));
    assertContem(saida, 'Comando não reconhecido');
  });

  teste('fecha o readline do ChatInterface', () => {
    chat.rl.close();
  });
}
}

// ─────────────────────────────────────────────────────────────────────────────
// Limpeza e relatório
// ─────────────────────────────────────────────────────────────────────────────

function finalizar() {
  fs.rmSync(tmp, { recursive: true, force: true });

  console.log('\n' + '═'.repeat(64));
  console.log('  \x1b[1mRESULTADO DOS TESTES\x1b[0m');
  console.log('═'.repeat(64));
  console.log(`  Total:  ${passou + falhou}`);
  console.log(`  \x1b[32mPassou: ${passou}\x1b[0m`);
  console.log(`  \x1b[31mFalhou: ${falhou}\x1b[0m`);

  if (falhou > 0) {
    console.log('\n  Falhas:');
    falhas.forEach(f => console.log(`   - ${f.nome}: ${f.erro}`));
    console.log('═'.repeat(64) + '\n');
    process.exit(1);
  }

  console.log('\n  \x1b[32m✅ TODOS OS TESTES PASSARAM!\x1b[0m');
  console.log('═'.repeat(64) + '\n');
  process.exit(0);
}

testarChatInterface()
  .then(finalizar)
  .catch(err => {
    console.error('Erro inesperado no teste:', err);
    try {
      fs.rmSync(tmp, { recursive: true, force: true });
    } catch (e) {}
    process.exit(1);
  });
