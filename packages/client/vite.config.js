import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/public': 'http://localhost:3001',
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
