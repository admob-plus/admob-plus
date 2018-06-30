import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import findCacheDir from 'find-cache-dir'

export default {
  external: ['cordova'],
  input: './ts/admob.ts',
  output: {
    file: 'www/admob.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    typescript({
      cacheRoot: findCacheDir({ name: 'rts2' }),
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
  ],
}
