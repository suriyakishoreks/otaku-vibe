import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import stylelint from 'vite-plugin-stylelint';
// @ts-expect-error: vite-plugin-eslint may not have TypeScript types
import eslint from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/otaku-vibe/',
  plugins: [
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler'],
        ],
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        "name": "OtakuVibe",
        "short_name": "OtakuVibe",
        "icons": [
          {
            "src": "/pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/pwa-maskable-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "/pwa-maskable-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ],
        "start_url": "/",
        "display": "standalone",
        "background_color": "#000000",
        "theme_color": "#FFFFFF",
        "description": "A unified platform to explore the world of anime, manga, manhwa and manhua."
      }
    }),
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
          if (id.includes('node_modules/swiper')) {
            return 'swiper';
          }

          if (id.includes('node_modules/motion')) {
            return 'motion-core';
          }

          if (id.includes('node_modules/@reduxjs/toolkit') ||
            id.includes('node_modules/react-redux') ||
            id.includes('node_modules/redux-persist')
          ) {
            return 'redux-core';
          }

          if (
            id.includes('node_modules/localforage') ||
            id.includes('node_modules/classnames') ||
            id.includes('node_modules/react-remove-scroll') ||
            id.includes('node_modules/react-transition-state')
          ) {
            return 'utility-vendor';
          }

          if (id.includes('node_modules/react-router')) {
            return 'react-router-core';
          }

          if (id.includes('node_modules')) {
            return 'core';
          }
        },
      },
    },
  },
});
