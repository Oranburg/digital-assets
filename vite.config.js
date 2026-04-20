import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/digital-assets/',
  build: {
    outDir: 'dist',
  },
  assetsInclude: ['**/*.md'],
})
