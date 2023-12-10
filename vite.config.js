import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@styles': path.resolve(__dirname, 'src/assets/scss'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [path.resolve(__dirname, 'sass')],
        additionalData: `@import "./src/assets/scss/common/helper/variables"; @import "./src/assets/scss/common/helper/mixins"; @import "./src/assets/scss/common/helper/color"; @import "./src/assets/scss/common/helper/theme";`,
      },
    },
    devSourcemap: true,
  },
  build: {
    target: 'es2017',
    minify: 'terser',
  },
  server: {
    proxy: {
      'https://pokeapi.co/api/v2': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
