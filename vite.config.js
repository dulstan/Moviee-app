import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  server: {
    proxy: {
      '/assets': {
        target: '/assets',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/assets/, ''),
      },
    },
  },
  base:  '/Moviee-app/',
  
});
