import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@styles': path.resolve(__dirname, 'src/assets/scss'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [path.resolve(__dirname, 'sass')],
        additionalData: `@import "./src/assets/scss/common/helper/variables"; @import "./src/assets/scss/common/helper/mixins";`,
      },
    },
  },
  build: {
    target: 'es2017',
    minify: 'terser',
  },
})
