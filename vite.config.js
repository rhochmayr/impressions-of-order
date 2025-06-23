import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/impressions-of-order/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        // Include the utility files as additional entry points
        trail: 'src/utils/trail.js',
        scanline: 'src/utils/scanline.js',
        run: 'src/utils/run.js'
      },
      output: {
        manualChunks: undefined,
        // Keep the utility files in their original structure
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'trail') return 'src/utils/trail.js'
          if (chunkInfo.name === 'scanline') return 'src/utils/scanline.js'
          if (chunkInfo.name === 'run') return 'src/utils/run.js'
          return 'assets/[name]-[hash].js'
        }
      }
    },
    // Copy additional files to dist
    copyPublicDir: true
  },
  server: {
    historyApiFallback: {
      rewrites: [
        // Rewrite all requests to index.html except for API routes
        { from: /^\/(?!api).*$/, to: '/index.html' }
      ]
    }
  },
  // Ensure source files are treated as static assets
  publicDir: false,
  assetsInclude: ['**/*.js']
})