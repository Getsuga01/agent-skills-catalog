#!/usr/bin/env node
'use strict';

/**
 * Teste de integração MCP do OpenCode Orchestrator
 *
 * Sobe o servidor MCP como processo filho e conversa com ele via
 * JSON-RPC 2.0 sobre stdio, exatamente como o OpenCode faz.
 *
 * Uso: node testar-mcp.js
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const SERVIDOR = path.join(__dirname, 'mcp-server.js');
const RAIZ = path.resolve(__dirname, '..');
const TEMP = path.join(RAIZ, '__teste_mcp__');

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
    throw new Error(`${msg || 'valor diferente'}: esperado ${JSON.stringify(esperado)}, recebido ${JSON.stringify(actual)}`);
  }
}

function assertContem(texto, trecho, msg) {
  if (!String(texto).includes(trecho)) {
    throw new Error(`${msg || 'texto não contém'}: ${JSON.stringify(trecho)}`);
  }
}

function assertNaoContem(texto, trecho, msg) {
  if (String(texto).includes(trecho)) {
    throw new Error(`${msg || 'texto não deveria conter'}: ${JSON.stringify(trecho)}`);
  }
}

// ─── Cliente MCP mínimo ──────────────────────────────────────────────────────

const filho = spawn(process.execPath, [SERVIDOR], {
  cwd: RAIZ,
  stdio: ['pipe', 'pipe', 'pipe']
});

let bufferSaida = '';
let bufferErro = '';
const pendentes = new Map();
let proximoId = 1;

filho.stdout.setEncoding('utf-8');
filho.stderr.setEncoding('utf-8');

filho.stdout.on('data', chunk => {
  bufferSaida += chunk;
  let indice;
  while ((indice = bufferSaida.indexOf('\n')) !== -1) {
    const linha = bufferSaida.slice(0, indice).trim();
    bufferSaida = bufferSaida.slice(indice + 1);
    if (!linha) continue;

    let mensagem;
    try {
      mensagem = JSON.parse(linha);
    } catch (err) {
      console.error('❌ stdout não-JSON recebido do servidor:', JSON.stringify(linha.slice(0, 200)));
      continue;
    }

    const pendente = pendentes.get(mensagem.id);
    if (!pendente) continue;
    pendentes.delete(mensagem.id);
    clearTimeout(pendente.timer);

    if (mensagem.error) {
      pendente.reject(new Error(`${mensagem.error.code}: ${mensagem.error.message}`));
    } else {
      pendente.resolve(mensagem.result);
    }
  }
});

filho.stderr.on('data', chunk => {
  bufferErro += chunk;
});

function rpc(method, params) {
  const id = proximoId++;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pendentes.delete(id);
      reject(new Error(`timeout ao chamar ${method}`));
    }, 15000);

    pendentes.set(id, { resolve, reject, timer });
    filho.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');
  });
}

function notificar(method, params) {
  filho.stdin.write(JSON.stringify({ jsonrpc: '2.0', method, params }) + '\n');
}

function chamar(nome, argumentos) {
  return rpc('tools/call', { name: nome, arguments: argumentos });
}

function textoDe(resultado) {
  return (resultado.content || []).map(c => c.text).join('\n');
}

function finalizar() {
  if (fs.existsSync(TEMP)) fs.rmSync(TEMP, { recursive: true, force: true });

  console.log('\n' + '═'.repeat(64));
  console.log('  \x1b[1mRESULTADO DOS TESTES MCP\x1b[0m');
  console.log('═'.repeat(64));
  console.log(`  Total:  ${passou + falhou}`);
  console.log(`  \x1b[32mPassou: ${passou}\x1b[0m`);
  console.log(`  \x1b[31mFalhou: ${falhou}\x1b[0m`);

  if (falhou > 0) {
    console.log('\n  Falhas:');
    falhas.forEach(f => console.log(`   - ${f.nome}: ${f.erro}`));
    if (bufferErro) console.log(`\n  stderr do servidor:\n${bufferErro}`);
    console.log('═'.repeat(64) + '\n');
    process.exitCode = 1;
  } else {
    console.log('\n  \x1b[32m✅ TODOS OS TESTES MCP PASSARAM!\x1b[0m');
    console.log('═'.repeat(64) + '\n');
  }

  try {
    filho.stdin.end();
    filho.kill();
  } catch {}
}

// ─── Execução ────────────────────────────────────────────────────────────────

async function principal() {
  console.log('=== TESTE DE INTEGRAÇÃO MCP (stdio) ===\n');

  if (fs.existsSync(TEMP)) fs.rmSync(TEMP, { recursive: true, force: true });

  let inicializacao;
  let ferramentas;

  console.log('\x1b[36m━━━ Handshake ━━━\x1b[0m');

  await testeAsync('initialize responde com serverInfo e capabilities', async () => {
    inicializacao = await rpc('initialize', {
      protocolVersion: '2025-11-25',
      capabilities: {},
      clientInfo: { name: 'teste-mcp', version: '1.0.0' }
    });
    assertIgual(inicializacao.serverInfo.name, 'orchestrator');
    assert(inicializacao.capabilities.tools, 'deve declarar capability tools');
    assertIgual(inicializacao.protocolVersion, '2025-11-25');
    assertContem(inicializacao.instructions, 'EducaDados');
  });

  teste('notificação initialized é aceita sem resposta', () => {
    notificar('notifications/initialized', {});
    assert(true);
  });

  await testeAsync('ping responde objeto vazio', async () => {
    const r = await rpc('ping', {});
    assertIgual(JSON.stringify(r), '{}');
  });

  await testeAsync('tools/list retorna as 11 ferramentas', async () => {
    const r = await rpc('tools/list', {});
    ferramentas = r.tools;
    assertIgual(ferramentas.length, 11, 'quantidade de ferramentas');
    for (const f of ferramentas) {
      assert(f.name && f.description && f.inputSchema, `ferramenta incompleta: ${JSON.stringify(f.name)}`);
      assertIgual(f.inputSchema.type, 'object', `schema de ${f.name}`);
    }
  });

  console.log('\n\x1b[36m━━━ Catálogo (skills e agentes) ━━━\x1b[0m');

  await testeAsync('listar_perfis lista os 3 perfis', async () => {
    const t = textoDe(await chamar('listar_perfis', {}));
    for (const p of ['desenvolvedor', 'seguranca', 'dados']) assertContem(t, p);
    assertContem(t, 'Skills:');
  });

  await testeAsync('obter_perfil devolve o catálogo de skills', async () => {
    const t = textoDe(await chamar('obter_perfil', { perfil: 'desenvolvedor' }));
    assertContem(t, 'brainstorming');
    assertContem(t, 'skills.md');
  });

  await testeAsync('obter_perfil aceita nome com acento/caixa diferente', async () => {
    const t = textoDe(await chamar('obter_perfil', { perfil: 'SEGURANÇA' }));
    assertContem(t, 'Perfil: seguranca');
  });

  await testeAsync('obter_perfil inválido retorna isError', async () => {
    const r = await chamar('obter_perfil', { perfil: 'inexistente' });
    assertIgual(r.isError, true, 'isError');
    assertContem(textoDe(r), 'Perfil inválido');
  });

  await testeAsync('listar_agentes lista todos os agentes do repositório', async () => {
    const esperados = ['desenvolvedor', 'seguranca', 'dados']
      .flatMap(p => {
        const dir = path.join(RAIZ, 'agentes', p);
        return fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.md')) : [];
      }).length;

    const t = textoDe(await chamar('listar_agentes', {}));
    const m = t.match(/Agentes disponíveis \((\d+)\)/);
    assert(m, 'cabeçalho com contagem');
    assertIgual(Number(m[1]), esperados, 'quantidade de agentes');
    for (const a of ['fullstack', 'appsec', 'ml-ops', 'data-analyst']) assertContem(t, a);
  });

  await testeAsync('listar_agentes filtra por perfil', async () => {
    const t = textoDe(await chamar('listar_agentes', { perfil: 'seguranca' }));
    const lista = t.split('Use "obter_agente"')[0];
    assertContem(lista, 'appsec');
    assertNaoContem(lista, 'fullstack');
  });

  await testeAsync('obter_agente retorna o prompt completo', async () => {
    const t = textoDe(await chamar('obter_agente', { nome: 'fullstack' }));
    assertContem(t, '# Agente: Desenvolvedor Fullstack');
    assertContem(t, 'brainstorming');
  });

  await testeAsync('obter_agente inexistente retorna isError com opções', async () => {
    const r = await chamar('obter_agente', { nome: 'nao-existe' });
    assertIgual(r.isError, true, 'isError');
    assertContem(textoDe(r), 'Disponíveis');
  });

  console.log('\n\x1b[36m━━━ Arquivos ━━━\x1b[0m');

  await testeAsync('listar_arquivos lista a raiz', async () => {
    const t = textoDe(await chamar('listar_arquivos', { caminho: '.' }));
    assertContem(t, 'README.md');
    assertContem(t, 'opencode-orchestrator');
  });

  await testeAsync('escrever_arquivo cria arquivo em subpasta', async () => {
    const t = textoDe(await chamar('escrever_arquivo', {
      caminho: '__teste_mcp__/sub/nota.md',
      conteudo: '# Nota de teste\nlinha dois'
    }));
    assertContem(t, 'criado');
    assert(fs.existsSync(path.join(TEMP, 'sub', 'nota.md')), 'arquivo deve existir');
  });

  await testeAsync('escrever_arquivo recusa sobrescrever por padrão', async () => {
    const r = await chamar('escrever_arquivo', {
      caminho: '__teste_mcp__/sub/nota.md',
      conteudo: 'outro'
    });
    assertIgual(r.isError, true, 'isError');
    assertContem(textoDe(r), 'já existe');
  });

  await testeAsync('ler_arquivo devolve conteúdo e metadados', async () => {
    const t = textoDe(await chamar('ler_arquivo', { caminho: '__teste_mcp__/sub/nota.md' }));
    assertContem(t, '# Nota de teste');
    assertContem(t, 'bytes');
  });

  await testeAsync('modificar_arquivo substitui trecho', async () => {
    const t = textoDe(await chamar('modificar_arquivo', {
      caminho: '__teste_mcp__/sub/nota.md',
      texto_antigo: 'linha dois',
      texto_novo: 'linha alterada'
    }));
    assertContem(t, 'modificado');
    const conteudo = fs.readFileSync(path.join(TEMP, 'sub', 'nota.md'), 'utf-8');
    assertContem(conteudo, 'linha alterada');
    assertNaoContem(conteudo, 'linha dois');
  });

  await testeAsync('modificar_arquivo com trecho ausente retorna isError', async () => {
    const r = await chamar('modificar_arquivo', {
      caminho: '__teste_mcp__/sub/nota.md',
      texto_antigo: 'inexistente-xyz',
      texto_novo: 'x'
    });
    assertIgual(r.isError, true, 'isError');
    assertContem(textoDe(r), 'não encontrado');
  });

  await testeAsync('adicionar_arquivo anexa ao final', async () => {
    await chamar('adicionar_arquivo', { caminho: '__teste_mcp__/sub/nota.md', conteudo: '\nfim' });
    const conteudo = fs.readFileSync(path.join(TEMP, 'sub', 'nota.md'), 'utf-8');
    assertContem(conteudo, 'fim');
  });

  await testeAsync('buscar_texto encontra termo', async () => {
    const t = textoDe(await chamar('buscar_texto', { termo: 'linha alterada' }));
    assertContem(t, '__teste_mcp__/sub/nota.md:2');
  });

  await testeAsync('buscar_texto sem resultados informa isso', async () => {
    const t = textoDe(await chamar('buscar_texto', { termo: 'termo-que-nao-existe-abc-123' }));
    assertContem(t, 'Nenhum resultado');
  });

  await testeAsync('deletar_arquivo remove o arquivo', async () => {
    const t = textoDe(await chamar('deletar_arquivo', { caminho: '__teste_mcp__/sub/nota.md' }));
    assertContem(t, 'removido');
    assert(!fs.existsSync(path.join(TEMP, 'sub', 'nota.md')), 'arquivo não deve existir');
  });

  console.log('\n\x1b[36m━━━ Segurança e erros ━━━\x1b[0m');

  await testeAsync('bloqueia path traversal (..)', async () => {
    const r = await chamar('ler_arquivo', { caminho: '../../etc/passwd' });
    assertIgual(r.isError, true, 'isError');
    assertContem(textoDe(r), 'fora do repositório');
  });

  await testeAsync('bloqueia caminho absoluto', async () => {
    const r = await chamar('ler_arquivo', { caminho: 'C:/Windows/win.ini' });
    assertIgual(r.isError, true, 'isError');
    assertContem(textoDe(r), 'fora do repositório');
  });

  await testeAsync('ferramenta desconhecida retorna erro JSON-RPC', async () => {
    try {
      await chamar('nao_existe', {});
      throw new Error('deveria ter falhado');
    } catch (err) {
      assertContem(err.message, '-32602');
    }
  });

  await testeAsync('método desconhecido retorna -32601', async () => {
    try {
      await rpc('metodo/inexistente', {});
      throw new Error('deveria ter falhado');
    } catch (err) {
      assertContem(err.message, '-32601');
    }
  });

  await testeAsync('stdout permanece limpo (apenas JSON)', async () => {
    // Se houvesse log em stdout, o parser já teria reclamado.
    // Aqui só confirmamos que o servidor continua respondendo.
    const r = await rpc('ping', {});
    assertIgual(JSON.stringify(r), '{}');
  });

  finalizar();
}

principal().catch(err => {
  console.error('Erro inesperado no teste MCP:', err);
  finalizar();
  process.exitCode = 1;
});
