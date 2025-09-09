import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    // Gzip compression
    viteCompression({
      verbose: true,       // log compressed files
      disable: false,
      threshold: 0,        // compress all files
      algorithm: 'gzip',
      ext: '.gz',          // output extension
      deleteOriginFile: false, // keep original files
    }),
    // Brotli compression
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 0,
      algorithm: 'brotliCompress',
      ext: '.br',
      deleteOriginFile: false,
    })
  ],
  build: {
    minify: 'terser',
    outDir: 'dist',        // make sure build goes to dist
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    },
    chunkSizeWarningLimit: 1000,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
