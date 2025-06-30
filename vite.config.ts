import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import stylelint from 'vite-plugin-stylelint';
// @ts-expect-error: vite-plugin-eslint may not have TypeScript types
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  base: '/otaku-vibe/',
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
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
          //   return 'react-core';
          // }

          // if (id.includes('node_modules/@reduxjs/toolkit') || id.includes('node_modules/react-redux')) {
          //   return 'redux-core';
          // }

          // if (id.includes('node_modules/swiper')) {
          //   return 'swiper';
          // }

          // if (id.includes('node_modules/motion')) {
          //   return 'motion-core';
          // }

          // if (
          //   id.includes('node_modules/localforage') ||
          //   id.includes('node_modules/classnames') ||
          //   id.includes('node_modules/react-remove-scroll') ||
          //   id.includes('node_modules/react-transition-state') ||
          //   id.includes('node_modules/redux-persist')
          // ) {
          //   return 'utility-vendor';
          // }

          // if (id.includes('node_modules/react-router')) {
          //   return 'react-router-vendor';
          // }

          if (id.includes('node_modules')) {
            return 'default-vendor';
          }
        },
      },
    },
  },
});
