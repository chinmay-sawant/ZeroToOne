import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/ZeroToOne/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // GitHub Pages: docs/ at repository root
    outDir: path.resolve(__dirname, '../docs'),
    emptyOutDir: true,
  },
  publicDir: 'public',
})
