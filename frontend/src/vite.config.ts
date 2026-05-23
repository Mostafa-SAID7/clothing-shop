import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, "../src/app"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
