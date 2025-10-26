import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'framer-vendor': ['framer-motion'],
        },
      },
    },
    commonjsOptions: {
      include: [/node_modules/],
    },
    // Optimize bundle size
    chunkSizeWarningLimit: 1000,
  },

  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },

  // Performance optimizations
  server: {
    hmr: {
      overlay: true,
    },
  },
})

