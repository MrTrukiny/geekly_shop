import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // Using the key as the matching path and the value as the proxy target
      '/api': 'http://localhost:5000', // This proxies any requests to /api to http://localhost:5000
      '/uploads': 'http://localhost:5000', // This proxies any requests to /uploads to http://localhost:5000
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
