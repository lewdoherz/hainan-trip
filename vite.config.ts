import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the built site works on GitHub Pages project URLs
// (https://<user>.github.io/<repo>/) as well as at a domain root.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
