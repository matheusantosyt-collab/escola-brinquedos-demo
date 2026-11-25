import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/escola-brinquedos-demo/react/',
  build: { outDir: '../react', emptyOutDir: true },
})
