import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "./",
  plugins: [react()],
  root: path.resolve(__dirname),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    // Optimize for production
    minify: "terser",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/app"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  define: {
    "process.env.VITE_API_URL": JSON.stringify(process.env.VITE_API_URL || "http://localhost:3001/api"),
    "process.env.VITE_STRIPE_PUBLIC_KEY": JSON.stringify(process.env.VITE_STRIPE_PUBLIC_KEY || ""),
  },
});
