import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      proxy: {
        // Using the key as the matching path and the value as the proxy target
        '/api': env.VITE_SERVER_BASE_URL, // This proxies any requests to /api to http://localhost:5000
        '/uploads': env.VITE_SERVER_BASE_URL, // This proxies any requests to /uploads to http://localhost:5000
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  };
});
