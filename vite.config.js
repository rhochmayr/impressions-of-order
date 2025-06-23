import { defineConfig } from 'vite'

export default defineConfig({
  base: '/impressions-of-order/',
  server: {
    historyApiFallback: {
      rewrites: [
        // Rewrite all requests to index.html except for API routes
        { from: /^\/(?!api).*$/, to: '/index.html' }
      ]
    }
  }
})
