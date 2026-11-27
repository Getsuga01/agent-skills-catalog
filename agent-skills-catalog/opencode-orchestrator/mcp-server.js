#!/usr/bin/env node
'use strict';

/**
 * Servidor MCP do OpenCode Orchestrator
 * ------------------------------------
 * Expõe o ecossistema do repositório (skills, agentes e arquivos) como
 * ferramentas que o OpenCode pode chamar.
 *
 * Transporte: stdio (JSON-RPC 2.0, uma mensagem JSON por linha).
 * IMPORTANTE: stdout é reservado ao protocolo. Todo log vai para stderr.
 *
 * Configuração no opencode.json:
 *   "mcp": { "servers": { "orchestrator": {
 *     "type": "local",
 *     "command": ["node", "opencode-orchestrator/mcp-server.js"]
 *   } } }
 */

const fs = require('fs');
const path = require('path');

// Raiz do repositório: variável de ambiente ou o diretório pai deste arquivo.
const RAIZ = process.env.ORCHESTRATOR_ROOT
  ? path.resolve(process.env.ORCHESTRATOR_ROOT)
  : path.resolve(__dirname, '..');

const NOME_SERVIDOR = 'orchestrator';
const VERSAO_SERVIDOR = '1.0.0';
const VERSAO_PADRAO = '2025-11-25';
const VERSOES_SUPORTADAS = ['2024-11-05', '2025-03-26', '2025-06-18', '2025-11-25'];

const PERFIS = ['desenvolvedor', 'seguranca', 'dados'];
const IGNORAR = new Set(['node_modules', '.git', '__teste_tmp__', 'dist', 'build', '.next', '.cache']);
const LIMITE_BUSCA = 200;
const LIMITE_ARQUIVO = 1024 * 1024; // 1 MB para busca textual

// ─── Utilidades ──────────────────────────────────────────────────────────────

function log(...partes) {
  process.stderr.write(`[orchestrator-mcp] ${partes.join(' ')}\n`);
}

/** Resolve um caminho relativo garantindo que ele não escape da raiz. */
function resolverSeguro(caminho = '.') {
  const alvo = path.resolve(RAIZ, caminho);
  const relativo = path.relative(RAIZ, alvo);
  if (relativo.startsWith('..') || path.isAbsolute(relativo)) {
    throw new Error(`Caminho fora do repositório: ${caminho}`);
  }
  return alvo;
}

function exibir(caminhoAbs) {
  return path.relative(RAIZ, caminhoAbs).split(path.sep).join('/') || '.';
}

function texto(conteudo) {
  return { content: [{ type: 'text', text: String(conteudo) }] };
}

function falha(mensagem) {
  return { content: [{ type: 'text', text: `Erro: ${mensagem}` }], isError: true };
}

function lerTexto(caminhoAbs) {
  return fs.readFileSync(caminhoAbs, 'utf-8');
}

function contarSkills(arquivo) {
  if (!fs.existsSync(arquivo)) return 0;
  let dentro = false;
  let total = 0;
  for (const linha of lerTexto(arquivo).split('\n')) {
    const l = linha.trim();
    if (l.startsWith('```')) {
      dentro = !dentro;
      continue;
    }
    if (dentro && l && !l.startsWith('#')) total++;
  }
  return total;
}

function coletarAgentes() {
  const base = path.join(RAIZ, 'agentes');
  if (!fs.existsSync(base)) return [];

  const agentes = [];
  for (const entrada of fs.readdirSync(base, { withFileTypes: true })) {
    if (!entrada.isDirectory()) continue;
    const dir = path.join(base, entrada.name);
    for (const arq of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!arq.isFile() || !arq.name.endsWith('.md')) continue;
      const abs = path.join(dir, arq.name);
      const conteudo = lerTexto(abs);
      const titulo = (conteudo.match(/^#\s+(.+)$/m) || [])[1] || arq.name;
      const perfil = (conteudo.match(/^\*\*Perfil:\*\*\s*(.+)$/m) || [])[1] || '';
      agentes.push({
        nome: arq.name.replace(/\.md$/i, ''),
        titulo: titulo.replace(/^Agente:\s*/i, '').trim(),
        perfil: entrada.name,
        descricao: perfil.trim(),
        caminho: exibir(abs)
      });
    }
  }
  return agentes.sort((a, b) => `${a.perfil}/${a.nome}`.localeCompare(`${b.perfil}/${b.nome}`));
}

function normalizar(s) {
  return String(s)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

// ─── Implementação das ferramentas ───────────────────────────────────────────

const implementacoes = {
  listar_perfis() {
    const linhas = [`Perfis disponíveis no repositório (${RAIZ}):`, ''];

    for (const perfil of PERFIS) {
      const dir = path.join(RAIZ, perfil);
      if (!fs.existsSync(dir)) continue;

      const totalSkills = contarSkills(path.join(dir, 'skills.md'));
      const totalAgentes = coletarAgentes().filter(a => a.perfil === perfil).length;

      linhas.push(`## ${perfil}`);
      linhas.push(`- Skills: ${totalSkills}`);
      linhas.push(`- Agentes: ${totalAgentes}`);
      linhas.push(`- Documentação: ${perfil}/README.md`);
      linhas.push(`- Catálogo de skills: ${perfil}/skills.md`);
      linhas.push('');
    }

    linhas.push('Use "obter_perfil" para carregar o catálogo completo de um perfil.');
    return texto(linhas.join('\n'));
  },

  obter_perfil({ perfil = 'desenvolvedor' } = {}) {
    const chave = normalizar(perfil);
    const valido = PERFIS.find(p => normalizar(p) === chave);
    if (!valido) {
      return falha(`Perfil inválido: "${perfil}". Use um de: ${PERFIS.join(', ')}`);
    }

    const partes = [`# Perfil: ${valido}`, ''];

    for (const arquivo of ['README.md', 'skills.md']) {
      const abs = path.join(RAIZ, valido, arquivo);
      if (!fs.existsSync(abs)) continue;
      partes.push(`<!-- ${valido}/${arquivo} -->`);
      partes.push(lerTexto(abs).trim());
      partes.push('');
    }

    if (partes.length === 2) {
      return falha(`Nenhum documento encontrado para o perfil "${valido}".`);
    }

    return texto(partes.join('\n'));
  },

  listar_agentes({ perfil } = {}) {
    let agentes = coletarAgentes();
    if (perfil) {
      const chave = normalizar(perfil);
      agentes = agentes.filter(a => normalizar(a.perfil) === chave);
    }

    if (agentes.length === 0) {
      return falha(`Nenhum agente encontrado${perfil ? ` para o perfil "${perfil}"` : ''}.`);
    }

    const linhas = [`Agentes disponíveis (${agentes.length}):`, ''];
    for (const a of agentes) {
      linhas.push(`- ${a.perfil}/${a.nome} — ${a.titulo}`);
      if (a.descricao) linhas.push(`  ${a.descricao}`);
    }
    linhas.push('');
    linhas.push('Use "obter_agente" com o nome (ex.: "fullstack") para carregar as instruções completas.');
    return texto(linhas.join('\n'));
  },

  obter_agente({ nome } = {}) {
    if (!nome) return falha('Informe o nome do agente (ex.: "fullstack", "appsec", "data-analyst").');

    const chave = normalizar(nome);
    const agentes = coletarAgentes();
    const encontrado =
      agentes.find(a => normalizar(a.nome) === chave) ||
      agentes.find(a => normalizar(`${a.perfil}/${a.nome}`) === chave) ||
      agentes.find(a => normalizar(a.titulo) === chave);

    if (!encontrado) {
      const nomes = agentes.map(a => a.nome).join(', ');
      return falha(`Agente "${nome}" não encontrado. Disponíveis: ${nomes}`);
    }

    const abs = path.join(RAIZ, encontrado.caminho);
    const conteudo = lerTexto(abs);
    return texto(
      [
        `<!-- agente: ${encontrado.perfil}/${encontrado.nome} -->`,
        `<!-- arquivo: ${encontrado.caminho} -->`,
        '',
        conteudo.trim()
      ].join('\n')
    );
  },

  listar_arquivos({ caminho = '.' } = {}) {
    const abs = resolverSeguro(caminho);
    if (!fs.existsSync(abs)) return falha(`Diretório não encontrado: ${caminho}`);
    if (!fs.statSync(abs).isDirectory()) return falha(`Não é um diretório: ${caminho}`);

    const itens = fs.readdirSync(abs, { withFileTypes: true }).map(item => {
      const itemAbs = path.join(abs, item.name);
      const stat = fs.statSync(itemAbs);
      return {
        nome: item.name,
        tipo: item.isDirectory() ? 'pasta' : 'arquivo',
        bytes: item.isFile() ? stat.size : 0,
        caminho: exibir(itemAbs)
      };
    });

    if (itens.length === 0) return texto(`Diretório vazio: ${caminho}`);

    const linhas = [`Conteúdo de ${exibir(abs)} (${itens.length} item(ns)):`, ''];
    for (const i of itens) {
      linhas.push(`- [${i.tipo}] ${i.nome}${i.tipo === 'arquivo' ? ` (${i.bytes} bytes)` : ''}`);
    }
    return texto(linhas.join('\n'));
  },

  ler_arquivo({ caminho } = {}) {
    if (!caminho) return falha('Informe o caminho do arquivo.');

    const abs = resolverSeguro(caminho);
    if (!fs.existsSync(abs)) return falha(`Arquivo não encontrado: ${caminho}`);
    if (fs.statSync(abs).isDirectory()) return falha(`O caminho é um diretório: ${caminho}`);

    const conteudo = lerTexto(abs);
    const linhas = conteudo.split('\n').length;
    return texto(
      [
        `<!-- arquivo: ${exibir(abs)} | ${Buffer.byteLength(conteudo, 'utf-8')} bytes | ${linhas} linha(s) -->`,
        '',
        conteudo
      ].join('\n')
    );
  },

  escrever_arquivo({ caminho, conteudo, sobrescrever = false } = {}) {
    if (!caminho) return falha('Informe o caminho do arquivo.');
    if (typeof conteudo !== 'string') return falha('Informe o parâmetro "conteudo" como texto.');

    const abs = resolverSeguro(caminho);
    if (fs.existsSync(abs) && !sobrescrever) {
      return falha(`O arquivo já existe: ${caminho}. Use sobrescrever=true para substituir.`);
    }

    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, conteudo, 'utf-8');

    return texto(
      `Arquivo ${sobrescrever ? 'sobrescrito' : 'criado'}: ${exibir(abs)} (${Buffer.byteLength(conteudo, 'utf-8')} bytes)`
    );
  },

  modificar_arquivo({ caminho, texto_antigo, texto_novo = '' } = {}) {
    if (!caminho) return falha('Informe o caminho do arquivo.');
    if (typeof texto_antigo !== 'string' || texto_antigo.length === 0) {
      return falha('Informe "texto_antigo" (o trecho a substituir).');
    }

    const abs = resolverSeguro(caminho);
    if (!fs.existsSync(abs)) return falha(`Arquivo não encontrado: ${caminho}`);

    const conteudo = lerTexto(abs);
    if (!conteudo.includes(texto_antigo)) {
      return falha(`Trecho não encontrado em ${caminho}: "${texto_antigo.slice(0, 80)}"`);
    }

    const ocorrencias = conteudo.split(texto_antigo).length - 1;
    const novo = conteudo.split(texto_antigo).join(texto_novo);
    fs.writeFileSync(abs, novo, 'utf-8');

    return texto(`Arquivo modificado: ${exibir(abs)} (${ocorrencias} substituição(ões))`);
  },

  adicionar_arquivo({ caminho, conteudo } = {}) {
    if (!caminho) return falha('Informe o caminho do arquivo.');
    if (typeof conteudo !== 'string') return falha('Informe o parâmetro "conteudo" como texto.');

    const abs = resolverSeguro(caminho);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.appendFileSync(abs, conteudo, 'utf-8');

    return texto(`Conteúdo adicionado ao final de ${exibir(abs)}`);
  },

  deletar_arquivo({ caminho } = {}) {
    if (!caminho) return falha('Informe o caminho do arquivo.');

    const abs = resolverSeguro(caminho);
    if (!fs.existsSync(abs)) return falha(`Arquivo não encontrado: ${caminho}`);
    if (fs.statSync(abs).isDirectory()) return falha(`O caminho é um diretório: ${caminho}`);

    fs.unlinkSync(abs);
    return texto(`Arquivo removido: ${exibir(abs)}`);
  },

  buscar_texto({ termo, extensao = '.md', caminho = '.' } = {}) {
    if (!termo) return falha('Informe o termo de busca.');

    const inicio = resolverSeguro(caminho);
    if (!fs.existsSync(inicio)) return falha(`Caminho não encontrado: ${caminho}`);

    const alvo = normalizar(termo);
    const filtrarPorExtensao = extensao && extensao !== '*';
    const ext = filtrarPorExtensao ? (extensao.startsWith('.') ? extensao : `.${extensao}`) : null;

    const resultados = [];
    const pilha = [inicio];

    while (pilha.length > 0 && resultados.length < LIMITE_BUSCA) {
      const atual = pilha.pop();
      const itens = fs.readdirSync(atual, { withFileTypes: true });

      for (const item of itens) {
        if (resultados.length >= LIMITE_BUSCA) break;

        const itemAbs = path.join(atual, item.name);
        if (item.isDirectory()) {
          if (!IGNORAR.has(item.name)) pilha.push(itemAbs);
          continue;
        }
        if (!item.isFile()) continue;
        if (filtrarPorExtensao && !item.name.toLowerCase().endsWith(ext)) continue;

        let stat;
        try {
          stat = fs.statSync(itemAbs);
        } catch {
          continue;
        }
        if (stat.size > LIMITE_ARQUIVO) continue;

        let conteudo;
        try {
          conteudo = lerTexto(itemAbs);
        } catch {
          continue;
        }

        conteudo.split('\n').forEach((linha, idx) => {
          if (resultados.length < LIMITE_BUSCA && normalizar(linha).includes(alvo)) {
            resultados.push({
              arquivo: exibir(itemAbs),
              linha: idx + 1,
              trecho: linha.trim().slice(0, 160)
            });
          }
        });
      }
    }

    if (resultados.length === 0) {
      return texto(`Nenhum resultado para "${termo}" (extensão: ${extensao || '*'}).`);
    }

    const linhas = [
      `Busca por "${termo}" (extensão: ${extensao || '*'}) — ${resultados.length} resultado(s):`,
      ''
    ];
    for (const r of resultados) {
      linhas.push(`${r.arquivo}:${r.linha}  ${r.trecho}`);
    }
    if (resultados.length >= LIMITE_BUSCA) {
      linhas.push('');
      linhas.push(`(limite de ${LIMITE_BUSCA} resultados atingido)`);
    }
    return texto(linhas.join('\n'));
  }
};

// ─── Catálogo de ferramentas (MCP tools/list) ────────────────────────────────

const FERRAMENTAS = [
  {
    name: 'listar_perfis',
    title: 'Listar perfis do repositório',
    description:
      'Lista os perfis disponíveis (desenvolvedor, seguranca, dados) com a quantidade de skills e agentes de cada um.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true }
  },
  {
    name: 'obter_perfil',
    title: 'Obter catálogo de um perfil',
    description:
      'Retorna a documentação e o catálogo completo de IDs de skills de um perfil. Use antes de escolher quais skills carregar.',
    inputSchema: {
      type: 'object',
      properties: {
        perfil: { type: 'string', enum: PERFIS, description: 'Perfil desejado.' }
      },
      additionalProperties: false
    },
    annotations: { readOnlyHint: true }
  },
  {
    name: 'listar_agentes',
    title: 'Listar agentes',
    description: 'Lista os subagentes especializados do repositório, com perfil e descrição.',
    inputSchema: {
      type: 'object',
      properties: {
        perfil: { type: 'string', enum: PERFIS, description: 'Filtra por perfil (opcional).' }
      },
      additionalProperties: false
    },
    annotations: { readOnlyHint: true }
  },
  {
    name: 'obter_agente',
    title: 'Obter instruções de um agente',
    description:
      'Retorna o prompt de sistema completo de um subagente (ex.: fullstack, appsec, data-analyst). Use para adotar a persona e o fluxo daquele agente.',
    inputSchema: {
      type: 'object',
      properties: {
        nome: { type: 'string', description: 'Nome do agente, ex.: "fullstack".' }
      },
      required: ['nome'],
      additionalProperties: false
    },
    annotations: { readOnlyHint: true }
  },
  {
    name: 'listar_arquivos',
    title: 'Listar arquivos',
    description: 'Lista arquivos e pastas de um diretório do repositório.',
    inputSchema: {
      type: 'object',
      properties: {
        caminho: { type: 'string', description: 'Diretório relativo à raiz. Padrão: "."' }
      },
      additionalProperties: false
    },
    annotations: { readOnlyHint: true }
  },
  {
    name: 'ler_arquivo',
    title: 'Ler arquivo',
    description: 'Lê o conteúdo de um arquivo de texto do repositório.',
    inputSchema: {
      type: 'object',
      properties: {
        caminho: { type: 'string', description: 'Caminho relativo à raiz do repositório.' }
      },
      required: ['caminho'],
      additionalProperties: false
    },
    annotations: { readOnlyHint: true }
  },
  {
    name: 'escrever_arquivo',
    title: 'Escrever arquivo',
    description:
      'Cria um arquivo de texto (e os diretórios necessários). Recusa sobrescrever sem sobrescrever=true.',
    inputSchema: {
      type: 'object',
      properties: {
        caminho: { type: 'string', description: 'Caminho relativo à raiz do repositório.' },
        conteudo: { type: 'string', description: 'Conteúdo completo do arquivo.' },
        sobrescrever: { type: 'boolean', description: 'Substitui se já existir. Padrão: false.' }
      },
      required: ['caminho', 'conteudo'],
      additionalProperties: false
    },
    annotations: { destructiveHint: true }
  },
  {
    name: 'modificar_arquivo',
    title: 'Modificar arquivo',
    description: 'Substitui um trecho de texto em um arquivo existente (todas as ocorrências).',
    inputSchema: {
      type: 'object',
      properties: {
        caminho: { type: 'string', description: 'Caminho relativo à raiz do repositório.' },
        texto_antigo: { type: 'string', description: 'Trecho exato a substituir.' },
        texto_novo: { type: 'string', description: 'Texto substituto. Padrão: vazio.' }
      },
      required: ['caminho', 'texto_antigo'],
      additionalProperties: false
    },
    annotations: { destructiveHint: true }
  },
  {
    name: 'adicionar_arquivo',
    title: 'Adicionar ao final de um arquivo',
    description: 'Anexa conteúdo ao final de um arquivo, criando-o se não existir.',
    inputSchema: {
      type: 'object',
      properties: {
        caminho: { type: 'string', description: 'Caminho relativo à raiz do repositório.' },
        conteudo: { type: 'string', description: 'Texto a anexar.' }
      },
      required: ['caminho', 'conteudo'],
      additionalProperties: false
    },
    annotations: { destructiveHint: true }
  },
  {
    name: 'deletar_arquivo',
    title: 'Deletar arquivo',
    description: 'Remove um arquivo do repositório. Não remove diretórios.',
    inputSchema: {
      type: 'object',
      properties: {
        caminho: { type: 'string', description: 'Caminho relativo à raiz do repositório.' }
      },
      required: ['caminho'],
      additionalProperties: false
    },
    annotations: { destructiveHint: true }
  },
  {
    name: 'buscar_texto',
    title: 'Buscar texto nos arquivos',
    description:
      'Busca um termo nos arquivos do repositório. Padrão: arquivos .md. Use extensao="*" para todos os arquivos de texto.',
    inputSchema: {
      type: 'object',
      properties: {
        termo: { type: 'string', description: 'Termo a procurar (sem diferenciar maiúsculas/acentos).' },
        extensao: { type: 'string', description: 'Extensão, ex.: ".md" ou "*". Padrão: ".md".' },
        caminho: { type: 'string', description: 'Diretório inicial. Padrão: "."' }
      },
      required: ['termo'],
      additionalProperties: false
    },
    annotations: { readOnlyHint: true }
  }
];

const INSTRUCOES = [
  'Este servidor dá acesso ao repositório EducaDados: catálogos de skills por perfil,',
  'prompts dos 12 subagentes especializados e operações de arquivos restritas à raiz do projeto.',
  'Fluxo recomendado: listar_perfis -> obter_perfil -> carregar as skills com a ferramenta skill;',
  'ou listar_agentes -> obter_agente -> seguir as instruções retornadas.',
  'Nunca use caminhos absolutos nem tente sair da raiz do repositório.'
].join(' ');

// ─── Protocolo JSON-RPC / MCP ────────────────────────────────────────────────

function responder(id, result) {
  if (id === undefined || id === null) return; // notificação: sem resposta
  process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, result }) + '\n');
}

function responderErro(id, code, message, data) {
  if (id === undefined || id === null) return;
  const erro = { code, message };
  if (data !== undefined) erro.data = data;
  process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, error: erro }) + '\n');
}

function tratar(mensagem) {
  const { id, method, params } = mensagem;

  if (!method) {
    responderErro(id, -32600, 'Requisição inválida: campo "method" ausente.');
    return;
  }

  // Notificações não recebem resposta.
  if (method.startsWith('notifications/')) return;

  switch (method) {
    case 'initialize': {
      const solicitada = params && params.protocolVersion;
      const versao = VERSOES_SUPORTADAS.includes(solicitada) ? solicitada : VERSAO_PADRAO;
      responder(id, {
        protocolVersion: versao,
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: NOME_SERVIDOR, version: VERSAO_SERVIDOR },
        instructions: INSTRUCOES
      });
      return;
    }

    case 'ping':
      responder(id, {});
      return;

    case 'tools/list':
      responder(id, { tools: FERRAMENTAS });
      return;

    case 'tools/call': {
      const nome = params && params.name;
      const argumentos = (params && params.arguments) || {};
      const implementacao = implementacoes[nome];

      if (!implementacao) {
        responderErro(id, -32602, `Ferramenta desconhecida: ${nome}`);
        return;
      }

      try {
        const resultado = implementacao(argumentos);
        responder(id, resultado);
      } catch (err) {
        responder(id, falha(err.message));
      }
      return;
    }

    default:
      responderErro(id, -32601, `Método não encontrado: ${method}`);
  }
}

function iniciar() {
  let buffer = '';

  process.stdin.setEncoding('utf-8');

  process.stdin.on('data', chunk => {
    buffer += chunk;

    let indice;
    while ((indice = buffer.indexOf('\n')) !== -1) {
      const linha = buffer.slice(0, indice).trim();
      buffer = buffer.slice(indice + 1);
      if (!linha) continue;

      let mensagem;
      try {
        mensagem = JSON.parse(linha);
      } catch (err) {
        responderErro(null, -32700, 'JSON inválido.');
        continue;
      }

      try {
        tratar(mensagem);
      } catch (err) {
        responderErro(mensagem && mensagem.id, -32603, `Erro interno: ${err.message}`);
      }
    }
  });

  process.stdin.on('end', () => process.exit(0));
  process.stdin.on('error', err => {
    log('erro no stdin:', err.message);
    process.exit(1);
  });

  log(`servidor iniciado | raiz=${RAIZ} | ${FERRAMENTAS.length} ferramentas`);
}

iniciar();
