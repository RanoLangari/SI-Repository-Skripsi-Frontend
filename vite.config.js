import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => {
  return {
    resolve: {
        alias: {
          '~': path.resolve(__dirname, './src'),
        },
      },
    server: {
      port: 8080,
      // open: true,
    },
    build: {
      outDir: 'build',
    },
    plugins: [react()],
  };
});