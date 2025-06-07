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
      name: 'pwa-first-template',
      short_name: 'PFT',
      description: 'PWA description',
      theme_color: '#ffffff'
    },

    workbox: {
      globPatterns: [
        'client/**/*.{js,css,ico,png,svg,webp,woff,woff2}'
      ],

      cleanupOutdatedCaches: true,
      clientsClaim: true
    },

    devOptions: {
      enabled: false,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    }
  })]
})