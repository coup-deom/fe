import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
  server: {
    host: process.env.NODE_ENV === 'development' ? '127.0.0.1' : '0.0.0.0',
  },
})
