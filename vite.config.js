import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        addPet: resolve(__dirname, 'addPet.html'),
        register: resolve(__dirname, 'register.html'),
        petProfile: resolve(__dirname, 'petProfile.html'),
        petEdit: resolve(__dirname, 'petEdit.html'),
        login: resolve(__dirname, 'index.html')
      },
    },
  },
});
