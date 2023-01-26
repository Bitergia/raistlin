import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const path = require("path");

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/tasks': {
        // Forward frontend dev server request for /api to django dev server
        target: 'http://localhost:8000/',
      },
    }
  },
})
