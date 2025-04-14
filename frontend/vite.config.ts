import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: +(process.env.FE_PORT ?? 3000),
    host: '0.0.0.0',
    watch : {
        usePolling : true,
    }
  },
})