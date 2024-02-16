import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@/app': path.resolve(__dirname, './src/app/'),
      '@/assets': path.resolve(__dirname, './src/assets/'),
      '@/router': path.resolve(__dirname, './src/router/'),
      '@/view': path.resolve(__dirname, './src/view/'),
    },
  },
})
