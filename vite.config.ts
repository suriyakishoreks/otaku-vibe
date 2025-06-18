import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import stylelint from 'vite-plugin-stylelint';
// @ts-expect-error: vite-plugin-eslint may not have TypeScript types
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  base: '/anime-list-app/',
  plugins: [
    react(),
    stylelint({
      files: ['**/*.{css,scss,html}'],
      cache: true,
      emitErrorAsWarning: true
    }),
    eslint({
      cache: true,
      failOnError: false
    }),
  ]
});
