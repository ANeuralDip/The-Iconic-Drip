import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // 1. Tell Vite to support React JSX
  plugins: [react()],
  
  // 2. Fix the "process is undefined" error
  define: {
    'process.env': {}
  },
  
  server: {
    port: 3000,
    // 3. The "Telephone Line" to your Node server
    proxy: {
      '/api': {
        target: 'http://localhost:REDACTED',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});