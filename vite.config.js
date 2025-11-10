import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy API requests to backend to avoid CORS issues in development
      '/api': {
        target: 'https://dev-be-wm.hikarimoon.pro',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path, // Keep /api in the path
      }
    }
  }
})
