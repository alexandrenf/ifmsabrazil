import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import markdown from "vite-plugin-md";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import { babel } from "@rollup/plugin-babel";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "babel-plugin-react-compiler",
            {
              target: "18", // Your React version
            },
          ],
        ],
      },
    }),
    markdown(),
    visualizer({
      filename: "./build/stats.html",
      open: true,
    }),
    viteCompression({ algorithm: "brotliCompress" }), // Add compression plugin
    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".jsx", ".ts", ".tsx"], // Add your necessary file extensions
    }),
  ],
  server: {
    open: true,
  },
  build: {
    outDir: "build",
    sourcemap: false, // Disable sourcemaps in production for smaller bundle
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate MUI into its own chunk
          'mui-core': ['@mui/material', '@mui/system'],
          // Separate Algolia into its own chunk  
          'algolia': ['algoliasearch'],
          // Separate other large dependencies
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'styled-components': ['styled-components'],
          'utilities': ['axios', 'date-fns', 'markdown-to-jsx', 'prismjs'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase warning limit
    target: 'esnext', // Use modern JavaScript for better tree shaking
    minify: 'terser', // Use terser for better compression
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true,
        pure_funcs: ['console.log'], // Remove specific functions
      },
    },
  },
  assetsInclude: ["**/*.md"],
});
