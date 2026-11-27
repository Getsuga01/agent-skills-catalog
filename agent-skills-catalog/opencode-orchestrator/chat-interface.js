#!/usr/bin/env node
/**
 * Chat Interface - Interface conversacional para o OpenCode Orchestrator
 * Permite ao usuário interagir com agentes como um assistente
 */

const readline = require('readline');
const { FileManager } = require('./file-manager');
const { IDEAdapter } = require('./ide-adapters');

class ChatInterface {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '💬 > ',
      terminal: true
    });
    this.fileManager = new FileManager();
    this.ide = new IDEAdapter();
    this.historico = [];
    this.contexto = {
      perfilAtivo: null,
      tarefaAtiva: null,
      skillsCarregadas: [],
      agentesAtivos: []
    };
  }

  async iniciar() {
    console.log('\n══════════════════════════════════════════════════════════════════');
    console.log('  🤖 OPENCODE ASSISTENTE');
    console.log('  Assistente interativo com Skills e Agentes do OpenCode');
    console.log('  IDE detectada:', this.ide.ide.toUpperCase());
    console.log('══════════════════════════════════════════════════════════════════\n');
    console.log('Digite "help" para ver comandos disponíveis.');
    console.log('Digite "sair" para encerrar.\n');

    this.rl.prompt();

    this.rl.on('line', async (linha) => {
      const comando = linha.trim();
      if (!comando) {
        this.rl.prompt();
        return;
      }

      this.historico.push({ usuario: comando, timestamp: new Date().toISOString() });

      try {
        await this.processarComando(comando);
      } catch (err) {
        console.log(`❌ Erro: ${err.message}`);
      }

      this.rl.prompt();
    });

    this.rl.on('close', () => {
      console.log('\n👋 Assistente encerrado. Até logo!');
      process.exit(0);
    });
  }

  // Divide o comando em partes respeitando aspas simples/duplas.
  // Ex.: escrever a.md "# Título com espaços" -> ['escrever', 'a.md', '# Título com espaços']
  dividirComando(comando) {
    const partes = [];
    let atual = '';
    let aspas = null;
    let temConteudo = false;

    for (const ch of comando) {
      if (aspas) {
        if (ch === aspas) {
          aspas = null;
        } else {
          atual += ch;
        }
      } else if (ch === '"' || ch === "'") {
        aspas = ch;
        temConteudo = true; // permite token vazio com ""
      } else if (/\s/.test(ch)) {
        if (atual.length > 0 || temConteudo) {
          partes.push(atual);
          atual = '';
          temConteudo = false;
        }
      } else {
        atual += ch;
        temConteudo = true;
      }
    }

    if (atual.length > 0 || temConteudo) partes.push(atual);
    return partes;
  }

  async processarComando(comando) {
    const partes = this.dividirComando(comando);
    if (partes.length === 0) return;

    const cmd = partes[0].toLowerCase();
    const args = partes.slice(1);

    switch (cmd) {
      case 'help':
      case 'ajuda':
        this.mostrarAjuda();
        break;

      case 'skills':
        this.listarSkills();
        break;

      case 'agentes':
      case 'agents':
        this.listarAgentes();
        break;

      case 'perfil':
        this.mudarPerfil(args[0]);
        break;

      case 'executar':
      case 'run':
        this.executarTarefa(args[0]);
        break;

      case 'chat':
        await this.modoChat(args);
        break;

      case 'arquivo':
      case 'file':
        await this.comandoArquivo(args);
        break;

      case 'ler':
        await this.lerArquivo(args[0]);
        break;

      case 'escrever':
      case 'write':
        await this.escreverArquivo(args);
        break;

      case 'modificar':
      case 'edit':
        await this.modificarArquivo(args);
        break;

      case 'buscar':
      case 'search':
        this.buscarTexto(args[0]);
        break;

      case 'contexto':
        this.mostrarContexto();
        break;

      case 'limpar':
      case 'clear':
        console.clear();
        break;

      case 'sair':
      case 'exit':
      case 'quit':
        this.rl.close();
        break;

      default:
        if (this.contexto.perfilAtivo && this.contexto.agentesAtivos.length > 0) {
          await this.enviarParaAgente(comando);
        } else {
          console.log(`❓ Comando não reconhecido: "${cmd}". Digite "help" para ver comandos.`);
        }
    }
  }

  mostrarAjuda() {
    const comandos = this.ide.getComandos();
    console.log('\n📋 Comandos disponíveis:\n');
    for (const [cmd, desc] of Object.entries(comandos)) {
      console.log(`  ${cmd.padEnd(22)} - ${desc}`);
    }
    console.log('\n💡 Exemplos de uso:\n');
    console.log('  perfil desenvolvedor          # Define o perfil ativo');
    console.log('  executar criar-feature-nextjs # Executa uma tarefa pré-definida');
    console.log('  chat fullstack "Como criar um componente React?"  # Conversa com agente');
    console.log('  ler README.md                 # Lê um arquivo');
    console.log('  escrever novo.md "# Título"   # Cria um arquivo');
    console.log('  modificar arquivo.txt "antigo" "novo"  # Modifica texto');
    console.log('  buscar "skill"                # Busca texto em arquivos');
    console.log('  contexto                      # Mostra perfil e tarefa ativa');
    console.log('');
  }

  listarSkills() {
    console.log('\n🔧 Skills disponíveis (por categoria):');
    console.log('  Use "perfil desenvolvedor" para ver skills do desenvolvedor');
    console.log('  Use "perfil seguranca" para ver skills de segurança');
    console.log('  Use "perfil dados" para ver skills de dados');
    console.log('');
  }

  listarAgentes() {
    console.log('\n🤖 Agentes disponíveis:');
    console.log('  Desenvolvedor:  fullstack, backend, frontend, mobile, devops');
    console.log('  Segurança:      appsec, devsecops, compliance, threat-modeler');
    console.log('  Dados:          data-engineer, data-analyst, bi-analyst, ml-ops');
    console.log('');
  }

  mudarPerfil(nomePerfil) {
    const perfisValidos = ['desenvolvedor', 'seguranca', 'dados'];
    if (!nomePerfil || !perfisValidos.includes(nomePerfil)) {
      console.log(`❌ Perfil inválido. Use: ${perfisValidos.join(', ')}`);
      return;
    }
    this.contexto.perfilAtivo = nomePerfil;
    console.log(`✅ Perfil alterado para: ${nomePerfil}`);
    console.log('   Use "executar <tarefa>" ou "chat <agente> <mensagem>"');
  }

  executarTarefa(idTarefa) {
    if (!this.contexto.perfilAtivo) {
      console.log('❌ Primeiro defina um perfil: perfil desenvolvedor');
      return;
    }
    console.log(`🚀 Executando tarefa: ${idTarefa}`);
    console.log('   Integrado com o orquestrador de skills e agentes.');
    this.contexto.tarefaAtiva = idTarefa;
  }

  async modoChat(args) {
    if (!args || args.length < 2) {
      console.log('❌ Use: chat <nome-do-agente> <mensagem>');
      console.log('   Exemplo: chat fullstack "Como criar um componente React?"');
      console.log('');
      console.log('   Agentes disponíveis:');
      console.log('     fullstack, backend, frontend, mobile, devops');
      console.log('     appsec, devsecops, compliance, threat-modeler');
      console.log('     data-engineer, data-analyst, bi-analyst, ml-ops');
      return;
    }

    const nomeAgente = args[0];
    const mensagem = args.slice(1).join(' ');

    console.log(`\n🤖 Enviando para agente "${nomeAgente}"...`);
    console.log(`   Mensagem: ${mensagem}\n`);

    const resposta = this.simularRespostaAgente(nomeAgente, mensagem);
    console.log(resposta);
    console.log('');
  }

  simularRespostaAgente(agente, mensagem) {
    const respostas = {
      fullstack: `📋 Agente Fullstack recebeu: "${mensagem}"\n\n   Vou ajudar você com:\n   1. Estruturar o projeto Next.js\n   2. Criar componentes com shadcn/ui\n   3. Configurar TypeScript\n   4. Escrever testes com Playwright\n\n   Use "executar criar-feature-nextjs" para iniciar.`,
      backend: `📋 Agente Backend recebeu: "${mensagem}"\n\n   Vou ajudar você com:\n   1. Projetar API REST ou GraphQL\n   2. Modelar banco de dados PostgreSQL\n   3. Configurar autenticação\n   4. Escrever testes de integração`,
      frontend: `📋 Agente Frontend recebeu: "${mensagem}"\n\n   Vou ajudar você com:\n   1. Criar componentes React acessíveis\n   2. Configurar Tailwind CSS\n   3. Otimizar performance com Lighthouse\n   4. Garantir WCAG 2.2 compliance`,
      mobile: `📋 Agente Mobile recebeu: "${mensagem}"\n\n   Vou ajudar você com:\n   1. Configurar React Native ou Flutter\n   2. Navegação e gerenciamento de estado\n   3. Integração com APIs\n   4. Testes E2E no Android/iOS`,
      devops: `📋 Agente DevOps recebeu: "${mensagem}"\n\n   Vou ajudar você com:\n   1. Pipeline CI/CD com GitHub Actions\n   2. Containers Docker e Kubernetes\n   3. Infraestrutura com Terraform\n   4. Deploy na AWS ou Vercel`,
      appsec: `📋 Agente AppSec recebeu: "${mensagem}"\n\n   Vou ajudar você com:\n   1. Modelar ameaças com STRIDE\n   2. Auditar OWASP Top 10\n   3. Revisar código seguro\n   4. Verificar dependências vulneráveis`,
      devsecops: `📋 Agente DevSecOps recebeu: "${mensagem}"\n\n   Vou ajudar você com:\n   1. Segurança de containers\n   2. CI/CD seguro\n   3. IAM e secrets na AWS\n   4. Compliance PCI-DSS/SOC 2`,
      compliance: `📋 Agente Compliance recebeu: "${mensagem}"\n\n   Vou ajudar você com:\n   1. Adequação GDPR/LGPD\n   2. PCI-DSS e SOC 2\n   3. Privacidade por design\n   4. Políticas legais`,
      'threat-modeler': `📋 Agente Threat Modeler recebeu: "${mensagem}"\n\n   Vou ajudar você com:\n   1. Modelagem STRIDE/PASTA\n   2. Identificação de ameaças\n   3. Extração de requisitos de segurança\n   4. Mapeamento de mitigações`,
      'data-engineer': `📋 Agente Data Engineer recebeu: "${mensagem}"\n\n   Vou ajudar você com:\n   1. Projetar pipeline ETL/ELT\n   2. Modelar banco de dados\n   3. Configurar Airflow dags\n   4. Implementar dbt transformations`,
      'data-analyst': `📋 Agente Data Analyst recebeu: "${mensagem}"\n\n   Vou ajudar você com:\n   1. Análise estatística com Python\n   2. Métricas de negócio e KPIs\n   3. Data storytelling\n   4. Relatórios gerenciais`,
      'bi-analyst': `📋 Agente BI Analyst recebeu: "${mensagem}"\n\n   Vou ajudar você com:\n   1. Dashboards e KPIs\n   2. Data warehousing (Snowflake)\n   3. Relatórios gerenciais\n   4. Observabilidade de dados`,
      'ml-ops': `📋 Agente ML Ops recebeu: "${mensagem}"\n\n   Vou ajudar você com:\n   1. Implementar RAG e LLMs\n   2. Operacionalizar modelos de ML\n   3. Busca vetorial e similaridade\n   4. Gerenciamento de contexto de IA`
    };

    return respostas[agente] || `📋 Agente "${agente}" recebeu: "${mensagem}"\n\n   Resposta simulada. Integre com o OpenCode para respostas reais dos agentes.`;
  }

  async comandoArquivo(args) {
    const subComando = args[0];
    if (!subComando) {
      console.log('❌ Use: arquivo <ler|escrever|modificar|listar|buscar> <argumentos>');
      return;
    }

    switch (subComando) {
      case 'listar':
      case 'ls':
        const listagem = this.fileManager.listar(args[1] || '.');
        if (listagem.erro) {
          console.log(`❌ ${listagem.erro}`);
        } else {
          console.log(`\n📁 Conteúdo de "${listagem.caminho}":`);
          listagem.itens.forEach(item => {
            const icon = item.tipo === 'pasta' ? '📁' : '📄';
            console.log(`  ${icon} ${item.nome} (${item.tamanho} bytes)`);
          });
          console.log('');
        }
        break;

      case 'ler':
        await this.lerArquivo(args[1]);
        break;

      case 'escrever':
        await this.escreverArquivo(args.slice(1));
        break;

      case 'modificar':
      case 'edit':
        await this.modificarArquivo(args.slice(1));
        break;

      case 'buscar':
      case 'search':
        this.buscarTexto(args[1]);
        break;

      default:
        console.log(`❌ Subcomando não reconhecido: ${subComando}`);
    }
  }

  async lerArquivo(caminho) {
    if (!caminho) {
      console.log('❌ Informe o caminho do arquivo: ler <caminho>');
      return;
    }
    const resultado = this.fileManager.ler(caminho);
    if (resultado.erro) {
      console.log(`❌ ${resultado.erro}`);
    } else {
      console.log(`\n📄 Arquivo: ${resultado.arquivo}`);
      console.log(`   Tamanho: ${resultado.tamanho} bytes | Linhas: ${resultado.linhas}`);
      console.log(`   Caminho: ${resultado.caminho}`);
      console.log('\n══════════════════════════════════════════════════════════════════');
      console.log(resultado.conteudo.substring(0, 3000));
      if (resultado.conteudo.length > 3000) {
        console.log('\n... (conteúdo truncado)');
      }
      console.log('══════════════════════════════════════════════════════════════════\n');
    }
  }

  async escreverArquivo(args) {
    if (args.length < 2) {
      console.log('❌ Use: escrever <caminho> <conteudo>');
      console.log('   Exemplo: escrever novo.md "# Título do arquivo"');
      return;
    }
    const caminho = args[0];
    const conteudo = args.slice(1).join(' ');
    const resultado = this.fileManager.escrever(caminho, conteudo);
    if (resultado.erro) {
      console.log(`❌ ${resultado.erro}`);
    } else {
      console.log(`✅ ${resultado.mensagem}`);
      console.log(`   Arquivo: ${resultado.arquivo}`);
      console.log(`   Tamanho: ${resultado.tamanho} bytes`);
    }
  }

  async modificarArquivo(args) {
    if (args.length < 2) {
      console.log('❌ Use: modificar <caminho> <texto_antigo> <texto_novo>');
      return;
    }
    const caminho = args[0];
    const textoAntigo = args[1];
    const textoNovo = args.slice(2).join(' ') || '';
    const resultado = this.fileManager.modificar(caminho, textoAntigo, textoNovo);
    if (resultado.erro) {
      console.log(`❌ ${resultado.erro}`);
    } else {
      console.log(`✅ ${resultado.mensagem}`);
      console.log(`   Arquivo: ${resultado.arquivo}`);
    }
  }

  buscarTexto(termo) {
    if (!termo) {
      console.log('❌ Informe o termo de busca: buscar <termo>');
      return;
    }
    const resultado = this.fileManager.buscar(termo);
    console.log(`\n🔍 Busca por "${termo}": ${resultado.total} resultado(s)`);
    resultado.resultados.slice(0, 10).forEach(r => {
      console.log(`  📄 ${r.arquivo}:${r.linha} - ${r.trecho}`);
    });
    if (resultado.total > 10) {
      console.log(`  ... e mais ${resultado.total - 10} resultado(s)`);
    }
    console.log('');
  }

  mostrarContexto() {
    console.log('\n📊 Contexto atual:');
    console.log(`   Perfil: ${this.contexto.perfilAtivo || 'Nenhum'}`);
    console.log(`   Tarefa: ${this.contexto.tarefaAtiva || 'Nenhuma'}`);
    console.log(`   Skills carregadas: ${this.contexto.skillsCarregadas.length}`);
    console.log(`   Agentes ativos: ${this.contexto.agentesAtivos.length}`);
    console.log(`   IDE: ${this.ide.ide}`);
    console.log(`   Histórico: ${this.historico.length} comando(s)`);
    console.log('');
  }

  async enviarParaAgente(mensagem) {
    const agente = this.contexto.agentesAtivos[0] || 'fullstack';
    await this.modoChat([agente, mensagem]);
  }
}

module.exports = { ChatInterface };