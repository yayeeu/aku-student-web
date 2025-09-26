import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 8080,
    strictPort: true,
    allowedHosts: [
      'student-stg.aku.education',
      'aku.education',
      'student.localhost',
      '.aku.education', // allows all subdomains of aku.education
    ],
    hmr: {
      hmr: { host: 'student.localhost' },
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
