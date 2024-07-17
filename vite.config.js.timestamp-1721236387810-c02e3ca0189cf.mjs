// vite.config.js
import { defineConfig } from "file:///C:/Users/alebo/Videos/Sites/ifmsabrazil/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/alebo/Videos/Sites/ifmsabrazil/node_modules/@vitejs/plugin-react/dist/index.mjs";
import markdown from "file:///C:/Users/alebo/Videos/Sites/ifmsabrazil/node_modules/vite-plugin-md/dist/index.js";
import { visualizer } from "file:///C:/Users/alebo/Videos/Sites/ifmsabrazil/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import viteCompression from "file:///C:/Users/alebo/Videos/Sites/ifmsabrazil/node_modules/vite-plugin-compression/dist/index.mjs";
import { splitVendorChunkPlugin } from "file:///C:/Users/alebo/Videos/Sites/ifmsabrazil/node_modules/vite/dist/node/index.js";
import { babel } from "file:///C:/Users/alebo/Videos/Sites/ifmsabrazil/node_modules/@rollup/plugin-babel/dist/es/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    markdown(),
    visualizer({
      filename: "./build/stats.html",
      open: true
    }),
    viteCompression({ algorithm: "brotliCompress" }),
    // Add compression plugin
    splitVendorChunkPlugin(),
    // Vite plugin to split vendor code into separate chunks
    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".jsx", ".ts", ".tsx"]
      // Add your necessary file extensions
    })
  ],
  server: {
    open: true
  },
  build: {
    outDir: "build",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        }
      }
    }
  },
  assetsInclude: ["**/*.md"]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbGVib1xcXFxWaWRlb3NcXFxcU2l0ZXNcXFxcaWZtc2FicmF6aWxcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFsZWJvXFxcXFZpZGVvc1xcXFxTaXRlc1xcXFxpZm1zYWJyYXppbFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYWxlYm8vVmlkZW9zL1NpdGVzL2lmbXNhYnJhemlsL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgbWFya2Rvd24gZnJvbSBcInZpdGUtcGx1Z2luLW1kXCI7XHJcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tIFwicm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXCI7XHJcbmltcG9ydCB2aXRlQ29tcHJlc3Npb24gZnJvbSBcInZpdGUtcGx1Z2luLWNvbXByZXNzaW9uXCI7XHJcbmltcG9ydCB7IHNwbGl0VmVuZG9yQ2h1bmtQbHVnaW4gfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgeyBiYWJlbCB9IGZyb20gXCJAcm9sbHVwL3BsdWdpbi1iYWJlbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgbWFya2Rvd24oKSxcclxuICAgIHZpc3VhbGl6ZXIoe1xyXG4gICAgICBmaWxlbmFtZTogXCIuL2J1aWxkL3N0YXRzLmh0bWxcIixcclxuICAgICAgb3BlbjogdHJ1ZSxcclxuICAgIH0pLFxyXG4gICAgdml0ZUNvbXByZXNzaW9uKHsgYWxnb3JpdGhtOiBcImJyb3RsaUNvbXByZXNzXCIgfSksIC8vIEFkZCBjb21wcmVzc2lvbiBwbHVnaW5cclxuICAgIHNwbGl0VmVuZG9yQ2h1bmtQbHVnaW4oKSwgLy8gVml0ZSBwbHVnaW4gdG8gc3BsaXQgdmVuZG9yIGNvZGUgaW50byBzZXBhcmF0ZSBjaHVua3NcclxuICAgIGJhYmVsKHtcclxuICAgICAgYmFiZWxIZWxwZXJzOiBcImJ1bmRsZWRcIixcclxuICAgICAgZXh0ZW5zaW9uczogW1wiLmpzXCIsIFwiLmpzeFwiLCBcIi50c1wiLCBcIi50c3hcIl0sIC8vIEFkZCB5b3VyIG5lY2Vzc2FyeSBmaWxlIGV4dGVuc2lvbnNcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBvcGVuOiB0cnVlLFxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogXCJidWlsZFwiLFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIm5vZGVfbW9kdWxlc1wiKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaWRcclxuICAgICAgICAgICAgICAudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgIC5zcGxpdChcIm5vZGVfbW9kdWxlcy9cIilbMV1cclxuICAgICAgICAgICAgICAuc3BsaXQoXCIvXCIpWzBdXHJcbiAgICAgICAgICAgICAgLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBhc3NldHNJbmNsdWRlOiBbXCIqKi8qLm1kXCJdLFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVCxTQUFTLG9CQUFvQjtBQUNoVixPQUFPLFdBQVc7QUFDbEIsT0FBTyxjQUFjO0FBQ3JCLFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8scUJBQXFCO0FBQzVCLFNBQVMsOEJBQThCO0FBQ3ZDLFNBQVMsYUFBYTtBQUV0QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFDVCxXQUFXO0FBQUEsTUFDVCxVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsSUFDUixDQUFDO0FBQUEsSUFDRCxnQkFBZ0IsRUFBRSxXQUFXLGlCQUFpQixDQUFDO0FBQUE7QUFBQSxJQUMvQyx1QkFBdUI7QUFBQTtBQUFBLElBQ3ZCLE1BQU07QUFBQSxNQUNKLGNBQWM7QUFBQSxNQUNkLFlBQVksQ0FBQyxPQUFPLFFBQVEsT0FBTyxNQUFNO0FBQUE7QUFBQSxJQUMzQyxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGFBQWEsSUFBSTtBQUNmLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixtQkFBTyxHQUNKLFNBQVMsRUFDVCxNQUFNLGVBQWUsRUFBRSxDQUFDLEVBQ3hCLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFDWixTQUFTO0FBQUEsVUFDZDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGVBQWUsQ0FBQyxTQUFTO0FBQzNCLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
