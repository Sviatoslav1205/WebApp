import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('../.ssl_cert/key.pem'),
      cert: fs.readFileSync('../.ssl_cert/cert.pem'),
    },
  },

  plugins: [
    react()
  ],
})
