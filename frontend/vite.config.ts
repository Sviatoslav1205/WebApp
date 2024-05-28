import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'


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

  resolve: {
    // alias: {
    //   '@api': path.resolve(__dirname, 'src/https'),
    // },
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  }
})
