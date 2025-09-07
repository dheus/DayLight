import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/js/app.jsx"],
      refresh: true,
    }),
    react({
      include: "**/*.{jsx,tsx}",
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  envPrefix: "VITE_",
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  assetsInclude: ["**/*.woff2"],
});
