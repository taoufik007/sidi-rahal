import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',  // Utilisez des chemins relatifs
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    mimeTypes: {
      'js': 'application/javascript',
      'mjs': 'application/javascript'
    }
  }
})
