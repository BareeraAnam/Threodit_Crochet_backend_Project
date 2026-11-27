import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'

const adminRoutePlugin = (): Plugin => ({
  name: 'admin-route-plugin',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const url = req.url?.split('?')[0]
      if (url === '/admin' || url === '/admin/') {
        req.url = '/admin.html' + (req.url?.includes('?') ? '?' + req.url.split('?')[1] : '')
      }
      next()
    })
  },
  configurePreviewServer(server) {
    server.middlewares.use((req, _res, next) => {
      const url = req.url?.split('?')[0]
      if (url === '/admin' || url === '/admin/') {
        req.url = '/admin.html' + (req.url?.includes('?') ? '?' + req.url.split('?')[1] : '')
      }
      next()
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), adminRoutePlugin()],
  server: {
    host: '127.0.0.1',
  },
})