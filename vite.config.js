import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import markdown from 'vite-plugin-md';

export default defineConfig({
  plugins: [
    react(),
    markdown()
  ],
  server: {
    open: true,
  },
  build: {
    outDir: 'build',
  },
  assetsInclude: ['**/*.md'],
});