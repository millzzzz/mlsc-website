import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/editorial.ts',
  output: {
    file: 'public/scripts/editorial.js',
    format: 'es',
    sourcemap: !isProduction,
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
      preventAssignment: true
    }),
    resolve({
      browser: true,
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: !isProduction,
      inlineSources: !isProduction
    }),
    postcss({
      extensions: ['.css'],
      minimize: isProduction,
      extract: false, // Set to 'public/styles/editorial.css' if you want to extract CSS to a separate file
    }),
    isProduction && terser()
  ],
  external: [],
}; 