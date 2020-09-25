import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default {
  external: ['cordova'],
  input: './ts/admob.ts',
  output: {
    dir: 'www',
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
    }),
    commonjs(),
  ],
}
