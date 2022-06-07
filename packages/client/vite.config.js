import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svg from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svg({exportAsDefault: true})],
  server: {
    proxy: {
      '/graphql': 'http://localhost:3001',
      '/graphiql': 'http://localhost:3001',
    },
    watch: {
      ignored: [/coverage/],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    include: ['**/*.{test,Test}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      all: true,
      include: ['src/**/*.jsx', 'src/**/*.js'],
    },
  },
});
