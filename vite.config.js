import { defineConfig } from 'vite'
import jsx from 'vite-plugin-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [jsx ()],
  test:{
    globals:true,
    environment: 'jsdom',
    setupFiles: './src/tests/setupTest.js'
  }, 
  base: '/', 
  server: {
    proxy: {
      '/assets': {
        target: '/assets',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/assets/, ''),
      },
    },
  },
})
