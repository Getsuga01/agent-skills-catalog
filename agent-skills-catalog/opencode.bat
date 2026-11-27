@echo off
REM Atalho do OpenCode Orchestrator a partir da raiz do repositorio
REM Uso: opencode.bat            (modo interativo)
REM      opencode.bat --ide vscode
node "%~dp0opencode-orchestrator\index.js" %*
