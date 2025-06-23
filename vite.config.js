import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/impressions-of-order/' : '/',
  server: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/(?!api).*$/, to: '/index.html' }
      ]
    }
  }
})