import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  root: "./",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "/index.html",
    },
  },
})
