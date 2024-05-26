import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import markdown from 'vite-plugin-md';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    markdown(),
    visualizer({
      filename: './build/stats.html',
      open: true,
    }),
  ],
  server: {
    open: true,
  },
  build: {
    outDir: 'build',
  },
  assetsInclude: ['**/*.md'],
});
