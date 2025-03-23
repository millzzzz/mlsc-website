import { build } from 'bun';
import path from 'path';
import fs from 'fs';

const outDir = path.resolve('./static/editorial');

// Create the output directory if it doesn't exist
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Copy the CSS file
const cssSource = path.resolve('./src/components/editorial/MasonryGrid.css');
const cssDestination = path.resolve(outDir, 'MasonryGrid.css');

try {
  fs.copyFileSync(cssSource, cssDestination);
  console.log('✅ CSS file copied successfully');
} catch (error) {
  console.error('⚠️ Error copying CSS file:', error);
}

// Build the editorial bundle
const result = await build({
  entrypoints: ['./src/components/editorial/EditorialClient.tsx'],
  outdir: outDir,
  naming: 'editorial-bundle.js',
  minify: process.env.NODE_ENV === 'production',
  target: 'browser',
  plugins: [],
});

if (result.success) {
  console.log('✅ Bundle built successfully!');
} else {
  console.error('⚠️ Bundle build failed:', result.logs);
} 