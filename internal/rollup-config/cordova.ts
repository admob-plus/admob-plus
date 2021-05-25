import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import type { RollupOptions } from 'rollup'

const outDir = 'www'

export default (config: RollupOptions): RollupOptions => ({
  external: ['cordova'],
  output: {
    dir: outDir,
    format: 'cjs',
    sourcemap: false,
    exports: 'default',
  },
  plugins: [
    resolve({
      mainFields: ['module', 'main', 'jsnext:main'],
      browser: true,
    }),
    typescript({
      module: 'es2015',
      composite: false,
      declaration: false,
      outDir,
    }),
    commonjs(),
  ],
  ...config,
})
