import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'
import { defineConfig } from 'vite'


// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
    global: 'globalThis',
  },
  resolve: {
    alias: {
      process: 'process/browser',
      util: 'util',
    },
  },
  plugins: [react(), ssr()],
})
