import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'static/editorial',
    emptyOutDir: false,
    minify: true,
    lib: {
      entry: resolve(__dirname, 'src/components/editorial/EditorialClient.tsx'),
      name: 'EditorialComponents',
      fileName: 'editorial-bundle',
      formats: ['umd']
    },
    rollupOptions: {
      // Make sure to externalize dependencies that shouldn't be bundled
      external: [],
      output: {
        // Global variables to use in UMD build for externalized deps
        globals: {
          // We'll include React in the UMD build
        },
        // Generate sourcemaps
        sourcemap: true
      }
    }
  }
}); 