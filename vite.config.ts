import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/civil-engineer-roadmap/', // Updated to match your GitHub repo name
  build: {
    outDir: 'dist',
  }
})