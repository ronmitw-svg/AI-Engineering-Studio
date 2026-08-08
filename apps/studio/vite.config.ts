import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { aesStudioApiPlugin } from './server/plugin.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), aesStudioApiPlugin()],
})
