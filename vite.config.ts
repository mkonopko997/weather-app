import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export const API_KEY = "";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/forecast": {
        target: "http://api.openweathermap.org/data/2.5/forecast",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          return path.replace(/^\/forecast/, "").concat(`&appid=${API_KEY}`);
        },
      },
      cors: false,
    },
  },
  resolve: {
    alias: {
      src: path.resolve("src/"),
    },
  },
});
