import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'dashboard.html'),
        nested: resolve(__dirname, 'addPet.html'),
        nested: resolve(__dirname, 'register.html'),
        nested: resolve(__dirname, 'petProfile.html'),
        nested: resolve(__dirname, 'petEdit.html'),
      },
    },
  },
})