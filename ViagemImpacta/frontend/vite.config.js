// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // Importe este

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // E adicione este aqui
  ],
});