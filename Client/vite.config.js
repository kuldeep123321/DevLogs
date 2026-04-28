import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Jab bhi frontend '/api' par request bhejega
      '/api': {
        target: 'http://localhost:3000', // Wo backend (3000) par redirect ho jayegi
        changeOrigin: true,
        secure: false,
      },
    },
  },
})