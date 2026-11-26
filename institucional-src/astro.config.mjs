import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

// Protótipo institucional: páginas estáticas (HTML pronto para o Google) com ilhas React só onde há interação.
export default defineConfig({
  site: 'https://matheusantosyt-collab.github.io',
  base: '/escola-brinquedos-demo/institucional',
  outDir: '../institucional',
  trailingSlash: 'always',
  integrations: [react()],
  // reaproveita a lógica testada da versão React (máscara, validação, WhatsApp)
  vite: { server: { fs: { allow: ['..'] } } },
})
