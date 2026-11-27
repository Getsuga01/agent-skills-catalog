#!/usr/bin/env node
/**
 * File Manager - Gerenciador de arquivos para o OpenCode Orchestrator
 * Permite ler, escrever, modificar e listar arquivos do projeto
 */

const fs = require('fs');
const path = require('path');

class FileManager {
  constructor(baseDir = process.cwd()) {
    this.baseDir = baseDir;
  }

  // Listar arquivos e pastas
  listar(dir = '.') {
    const fullPath = path.join(this.baseDir, dir);
    if (!fs.existsSync(fullPath)) {
      return { erro: `Diretório não encontrado: ${dir}` };
    }

    const items = fs.readdirSync(fullPath, { withFileTypes: true });
    const resultado = items.map(item => ({
      nome: item.name,
      tipo: item.isDirectory() ? 'pasta' : 'arquivo',
      caminho: path.join(dir, item.name),
      tamanho: item.isFile() ? fs.statSync(path.join(fullPath, item.name)).size : 0
    }));

    return { sucesso: true, itens: resultado, caminho: dir };
  }

  // Ler arquivo
  ler(arquivo) {
    const fullPath = path.join(this.baseDir, arquivo);
    if (!fs.existsSync(fullPath)) {
      return { erro: `Arquivo não encontrado: ${arquivo}` };
    }

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      return { erro: `O caminho é um diretório, não um arquivo: ${arquivo}` };
    }

    try {
      const conteudo = fs.readFileSync(fullPath, 'utf-8');
      return {
        sucesso: true,
        arquivo,
        caminho: fullPath,
        tamanho: stat.size,
        linhas: conteudo.split('\n').length,
        conteudo
      };
    } catch (err) {
      return { erro: `Erro ao ler arquivo: ${err.message}` };
    }
  }

  // Escrever/criar arquivo
  escrever(arquivo, conteudo, sobrescrever = false) {
    const fullPath = path.join(this.baseDir, arquivo);

    if (fs.existsSync(fullPath) && !sobrescrever) {
      return { erro: `Arquivo já existe. Use sobrescrever=true para substituir: ${arquivo}` };
    }

    // Criar diretórios pais se necessário
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    try {
      fs.writeFileSync(fullPath, conteudo, 'utf-8');
      return {
        sucesso: true,
        arquivo,
        caminho: fullPath,
        tamanho: conteudo.length,
        mensagem: sobrescrever ? 'Arquivo sobrescrito com sucesso' : 'Arquivo criado com sucesso'
      };
    } catch (err) {
      return { erro: `Erro ao escrever arquivo: ${err.message}` };
    }
  }

  // Modificar arquivo (substituir texto específico)
  modificar(arquivo, textoAntigo, textoNovo) {
    const resultadoLeitura = this.ler(arquivo);
    if (resultadoLeitura.erro) {
      return resultadoLeitura;
    }

    const conteudo = resultadoLeitura.conteudo;
    if (!conteudo.includes(textoAntigo)) {
      return { erro: `Texto não encontrado no arquivo: "${textoAntigo.substring(0, 50)}..."` };
    }

    const novoConteudo = conteudo.split(textoAntigo).join(textoNovo);
    return this.escrever(arquivo, novoConteudo, true);
  }

  // Adicionar conteúdo ao final do arquivo (append)
  adicionar(arquivo, conteudo) {
    const fullPath = path.join(this.baseDir, arquivo);
    if (!fs.existsSync(fullPath)) {
      return this.escrever(arquivo, conteudo);
    }

    try {
      fs.appendFileSync(fullPath, conteudo, 'utf-8');
      return {
        sucesso: true,
        arquivo,
        mensagem: 'Conteúdo adicionado ao final do arquivo'
      };
    } catch (err) {
      return { erro: `Erro ao adicionar conteúdo: ${err.message}` };
    }
  }

  // Deletar arquivo
  deletar(arquivo) {
    const fullPath = path.join(this.baseDir, arquivo);
    if (!fs.existsSync(fullPath)) {
      return { erro: `Arquivo não encontrado: ${arquivo}` };
    }

    try {
      fs.unlinkSync(fullPath);
      return { sucesso: true, arquivo, mensagem: 'Arquivo deletado com sucesso' };
    } catch (err) {
      return { erro: `Erro ao deletar arquivo: ${err.message}` };
    }
  }

  // Buscar texto em arquivos
  buscar(termo, extensao = '.md') {
    const resultados = [];
    const percorrer = (dir) => {
      const items = fs.readdirSync(path.join(this.baseDir, dir), { withFileTypes: true });
      for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
          percorrer(fullPath);
        } else if (item.name.endsWith(extensao)) {
          try {
            const conteudo = fs.readFileSync(path.join(this.baseDir, fullPath), 'utf-8');
            const linhas = conteudo.split('\n');
            linhas.forEach((linha, idx) => {
              if (linha.toLowerCase().includes(termo.toLowerCase())) {
                resultados.push({
                  arquivo: fullPath,
                  linha: idx + 1,
                  trecho: linha.trim().substring(0, 100)
                });
              }
            });
          } catch (e) {}
        }
      }
    };
    percorrer('.');
    return { sucesso: true, termo, resultados, total: resultados.length };
  }
}

module.exports = { FileManager };