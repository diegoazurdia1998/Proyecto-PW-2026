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
import react from '@vitejs/react-swc' // o @vitejs/plugin-react

export default defineConfig({
  plugins: [react()],
  base: '/Proyecto-PW-2026/', // DEBE ser el nombre exacto de tu repo en GitHub
})
