/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    server: {
      host: "::",
      port: 8080,
      open: true,
    },
    // 1. Strip console logs and comments in production
    esbuild: {
      drop: isProduction ? ["console", "debugger"] : [],
      legalComments: "none",
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./tests/setup.ts",
      include: ["tests/**/*.test.{ts,tsx}"],
    },
    plugins: [
      // 2. Router with Auto Code Splitting
      TanStackRouterVite({
        autoCodeSplitting: true,
      }),
      react(),
      tailwindcss(),
      visualizer({
        filename: "bundle-analysis.html",
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      target: "esnext", 
      minify: "esbuild",
      cssCodeSplit: true,
      reportCompressedSize: true,
      // 4. Smart Module Preloading
      modulePreload: {
        resolveDependencies: (filename, deps) => {
          return deps.filter((dep) => {
            // Prioritize core chunks, defer heavy or vendor-specific ones if needed
            return true; 
          });
        },
      },
      rollupOptions: {
        output: {
          entryFileNames: "index.js",
          chunkFileNames: "chunk-[name].js",
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith(".css")) {
              return "index.css";
            }
            return "asset-[name][extname]";
          },
          // 5. Modernized Chunk Splitting Strategy
          manualChunks(id) {
            if (!id.includes("node_modules")) return;

            // 1. React Core (Critical Path)
            if (
              id.includes("/node_modules/react/") ||
              id.includes("/node_modules/react-dom/") ||
              id.includes("/node_modules/scheduler/")
            ) {
              return "react-core";
            }

            // 2. TanStack Ecosystem (Backbone)
            if (
              id.includes("@tanstack/react-query") ||
              id.includes("@tanstack/react-router") ||
              id.includes("@tanstack/query-core")
            ) {
              return "tanstack";
            }

            // 3. Supabase (Data Layer)
            if (id.includes("@supabase")) {
              return "supabase";
            }

            // 4. UI Vendors (Heavy Visuals)
            // Grouping icons, toast, and command menu to avoid fragmentation
            if (
              id.includes("lucide-react") ||
              id.includes("sonner") ||
              id.includes("cmdk") ||
              id.includes("next-themes")
            ) {
              return "ui-vendors";
            }
            
            // 5. Validation & Utils
            if (
              id.includes("zod") ||
              id.includes("date-fns")
            ) {
              return "utils";
            }
          },
        },
      },
    },
  };
});
