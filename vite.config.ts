import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit(), SvelteKitPWA({
    registerType: 'autoUpdate',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true
    },

    manifest: {
      name: 'Modern PWA - SvelteKit',
      short_name: 'Modern PWA',
      description: 'A modern Progressive Web App built with SvelteKit, featuring offline capabilities, push notifications, and native-like performance.',
      theme_color: '#3b82f6',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait-primary',
      scope: '/',
      start_url: '/',
      categories: ['productivity', 'utilities'],
      screenshots: [
        {
          src: '/screenshots/desktop.png',
          sizes: '1280x720',
          type: 'image/png',
          form_factor: 'wide'
        },
        {
          src: '/screenshots/mobile.png', 
          sizes: '375x667',
          type: 'image/png',
          form_factor: 'narrow'
        }
      ],
      icons: [
        {
          src: '/favicon.svg',
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'any maskable'
        }
      ]
    },

    workbox: {
      globPatterns: [
        'client/**/*.{js,css,ico,png,svg,webp,woff,woff2}',
        'prerendered/**/*.html'
      ],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/images\.pexels\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'pexels-images',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
            }
          }
        },
        {
          urlPattern: /^https:\/\/api\./i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            networkTimeoutSeconds: 3,
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 5 // 5 minutes
            }
          }
        }
      ],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      skipWaiting: true
    },

    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    }
  })]
})