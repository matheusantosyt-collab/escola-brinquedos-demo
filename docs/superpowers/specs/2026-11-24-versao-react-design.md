# Versão React do demo (React Bits grátis) — design

## Intenção
Segunda versão do site da Escola Brinquedos e Brincadeiras, feita em React com componentes
grátis do React Bits, para mostrar ao cliente lado a lado com o HTML atual.

## Metas
- Mesmo conteúdo, cores, conceito da amarelinha e correções já feitas (contraste, menu no
  celular, cartas acessíveis, sem banner de cookies, data local, ordem do mural, OG/Schema).
- Efeitos feitos à mão trocados por componentes React Bits onde há equivalente.
- Publicada em `…/escola-brinquedos-demo/react/`.

## Não-metas / anti-metas
- Não alterar nem remover o `index.html` da raiz (versão HTML continua no mesmo link).
- Nada de componentes WebGL (fundos/3D): pesam no celular.
- Nada de React Bits Pro.

## Abordagens consideradas
1. **Vite + React, build commitado em `/react/` (escolhida):** funciona com o GitHub Pages
   atual (servindo a `main`), sem mudar a configuração de deploy.
2. Vite + GitHub Actions publicando o build: mais limpo, mas troca o modo do Pages e
   complica publicar o HTML junto.
3. React via CDN sem build: os componentes do React Bits dependem de imports npm (GSAP,
   Motion); inviável.

## Decisões
- Stack: Vite + React, variantes JS + CSS dos componentes, instalados pelo registro do
  React Bits (CLI do shadcn). Fonte em `react-src/`, saída em `react/`, `base: '/escola-brinquedos-demo/react/'`.
- Mapeamento: Gooey Nav (menu), Split Text (título), Animated Content (entradas),
  Count Up (contadores), Bounce Cards (varal de fotos), Logo Loop (fila de crianças),
  Magnet (botões principais), Click Spark (no lugar da bolinha do mouse).
- Feito à mão: cartas que viram, mural + painel da secretaria (localStorage, mesmas chaves),
  formulário + WhatsApp, balões, diálogos.
- Imagens: extraídas do HTML para arquivos (`webp`) em vez de base64.
- `noindex`, OG e Schema iguais ao HTML, com URLs da subpasta.

## Fica a critério de quem constrói
- Parâmetros finos de cada componente (velocidade, intensidade) para casar com o visual atual.
- Organização interna dos componentes React.
