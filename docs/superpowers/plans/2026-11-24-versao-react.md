# Versão React do demo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recriar o demo da escola em React com componentes grátis do React Bits, publicado em `/react/` sem tocar no `index.html` da raiz.

**Architecture:** Projeto Vite em `react-src/` com `base: '/escola-brinquedos-demo/react/'` e `build.outDir: '../react'`. Lógica pura (datas, ordem do mural, telefone, validação) em `src/lib/` testada com Vitest; seções em `src/secoes/`; componentes React Bits em `src/rb/` (código copiado do registro `https://reactbits.dev/r/<Nome>-JS-CSS.json`).

**Tech Stack:** Vite, React, Vitest, GSAP, Motion (dependências que os componentes pedirem).

**Spec:** `docs/superpowers/specs/2026-11-24-versao-react-design.md`

## Global Constraints
- `index.html` da raiz não muda.
- Só componentes React Bits grátis, variante `JS-CSS`; nenhum componente WebGL.
- Conteúdo, cores e correções iguais ao HTML atual (fonte de verdade: `index.html` da raiz).
- `--verm:#e02229`, ocre `#a06c00`, verde refeitório `#23824a`, `noindex, nofollow`.
- Chaves de localStorage iguais ao HTML: `ebb_recados`, `ebb_contatos`.
- WhatsApp `5581989574792`.

## Review Focus
- Abrir direto em `/escola-brinquedos-demo/react/` no Pages: imagens e JS com caminho certo (base) — verificado no navegador após publicar.
- Celular 375px: barra de baixo cabe e o menu abre/fecha — verificado na Task 4.
- Telefone com menos de 10 dígitos ou sem etapa/consentimento: formulário não envia e mostra erro — teste em `valida.test.js`.
- Recado criado com data de hoje à noite (fuso local) aparece como hoje — teste de `hoje()`.
- Mural vazio num filtro: mostra "Nenhum recado nesta categoria." — coberto na Task 3.

---

### Task 1: Projeto Vite + lógica pura testada

**Files:**
- Create: `react-src/package.json`, `react-src/vite.config.js`, `react-src/index.html`, `react-src/src/main.jsx`
- Create: `react-src/src/lib/datas.js`, `react-src/src/lib/mural.js`, `react-src/src/lib/visita.js`
- Test: `react-src/src/lib/*.test.js`
- Create: `react-src/public/img/{logo,hero,pola1,pola2,pola3}.webp`, `react-src/public/og.jpg` (extraídos do HTML)

**Interfaces — Produces:**
- `hoje(d = new Date()): string` → `'AAAA-MM-DD'` local
- `diaCurto(iso: string): string` → `'27 nov 2026'`
- `ordenaRecados(recados, filtro: 'todos'|'noticia'|'evento', hojeIso): Recado[]` — futuros ascendente, depois passados descendente
- `formataTelefone(valor: string): string` → `'(81) 98957-4792'`
- `validaVisita({nome, tel, etapa, lgpd}): string|null` — mensagens idênticas às do HTML
- `mensagemZap({nome, etapa, turno, id}): string` e `linkZap(msg): string`

- [ ] Step 1: testes — `hoje(new Date(2026,10,24,22,30)) === '2026-11-24'`; `ordenaRecados` com sementes do HTML e hoje `'2026-11-24'` → títulos `['Dia do faz de conta','Festa de encerramento','Matrículas 2027 abertas']`; filtro `'evento'` → 2 itens; `formataTelefone('81989574792') === '(81) 98957-4792'`; `validaVisita` retorna `'Informe um WhatsApp com DDD.'` para tel `'(81) 9895'`, `null` para dados completos.
- [ ] Step 2: `npx vitest run` → FAIL (módulos ausentes)
- [ ] Step 3: implementar as funções
- [ ] Step 4: `npx vitest run` → PASS
- [ ] Step 5: commit

### Task 2: Componentes React Bits em `src/rb/`

**Files:** `react-src/src/rb/{GooeyNav,SplitText,AnimatedContent,CountUp,BounceCards,LogoLoop,Magnet,ClickSpark}.{jsx,css}`

- [ ] Step 1: baixar o JSON de cada um em `https://reactbits.dev/r/<Nome>-JS-CSS.json`, ler o código e gravar os arquivos; instalar as dependências listadas.
- [ ] Step 2: `npm run build` → sem erro de import.
- [ ] Step 3: commit

### Task 3: Seções e interações (port do HTML)

**Files:** `react-src/src/App.jsx`, `react-src/src/estilo.css`, `react-src/src/secoes/{Doca,Inicio,Ensino,Familia,Escola,Mural,Matricula,Rodape,Dialogos,Baloes}.jsx`

**Consumes:** Task 1 (lib), Task 2 (rb).

- Doca: `GooeyNav` nos links (desktop), botão Menu < 980px (mesmo comportamento do HTML).
- Inicio: blocos BRINCAR mantidos; `SplitText` no `h1`; `Magnet` no botão "Agendar uma visita".
- Ensino: cartas viradas à mão (`aria-pressed`, hover só em `(hover:hover)`).
- Familia: `CountUp` para 26 / 181 / 11; `LogoLoop` com as silhuetas menina/menino.
- Escola: `BounceCards` com as 3 fotos; adesivos e mapa à mão.
- Mural: notas + filtros (`aria-pressed`) usando `ordenaRecados`; vazio → "Nenhum recado nesta categoria."
- Matricula: amarelinha + formulário usando `formataTelefone`, `validaVisita`, `mensagemZap`; balões ao enviar.
- Dialogos: login por perfil, painel da secretaria (CMS + tabela de contatos).
- Entradas de seção com `AnimatedContent`; `ClickSpark` envolvendo a página no lugar da bolinha.

- [ ] Step 1: implementar; `npx vitest run` continua PASS
- [ ] Step 2: `npm run dev` e conferir no navegador: cartas, filtros, recado novo no mural, formulário (erro e sucesso), contato na tabela da secretaria
- [ ] Step 3: commit

### Task 4: Build, verificação e publicação

- [ ] Step 1: `npm run build` → `react/index.html` e `react/assets/*`
- [ ] Step 2: servir a raiz do repositório e abrir `/react/` em 1280px e 375px: sem rolagem lateral, menu do celular abre/fecha, imagens carregam
- [ ] Step 3: `git diff --stat main -- index.html` vazio (HTML intacto)
- [ ] Step 4: commit, merge na `main`, push; conferir `https://matheusantosyt-collab.github.io/escola-brinquedos-demo/react/` no ar
