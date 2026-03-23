/*
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
*/

// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // o @vitejs/plugin-react



export default defineConfig({
  plugins: [react()],
  // SOLO el nombre del repositorio entre diagonales
  base: '/Proyecto-PW-2026/',
})
