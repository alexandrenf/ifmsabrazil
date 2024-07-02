import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import markdown from "vite-plugin-md";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import { splitVendorChunkPlugin } from "vite";

export default defineConfig({
  plugins: [
    react(),
    markdown(),
    visualizer({
      filename: "./build/stats.html",
      open: true,
    }),
    viteCompression({ algorithm: "brotliCompress" }), // Add compression plugin
    splitVendorChunkPlugin(), // Vite plugin to split vendor code into separate chunks
  ],
  server: {
    open: true,
  },
  build: {
    outDir: "build",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  assetsInclude: ["**/*.md"],
});
