import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import  { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173
  },
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        "name": "GlobeMediWatch",
        "short_name": "GMW",
        "start_url": "./",
        "display": "standalone",
        "background_color": "#fff",
        "description": "GlobeMediWatch App.",
        "theme_color": "#ffffff",
        "icons": [
          {
            "src": "images/pwa-64x64.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "images/pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "images/pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "images/maskable-icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ]
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: ({ url }) => {
              return url.pathname.includes('images')
              },
              handler: 'CacheFirst',
              method: 'GET',
              options: {
              cacheName: 'static-assets',
              expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24
              },
              cacheableResponse: {
              statuses: [0, 200]
              },
              }
              },
              {
              urlPattern: ({ url }) => {
              return url.pathname.includes('homepage')
              },
              handler: 'CacheFirst',
              method: 'GET',
              options: {
              cacheName: 'globemediwatch-cache',
              expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24
              },
              cacheableResponse: {
              statuses: [0, 200]
              },
              }
              }
        
          ]
          }
    })
  ],

})
