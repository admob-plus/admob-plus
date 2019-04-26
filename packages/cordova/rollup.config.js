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
    exports: 'default',
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    typescript({
      cacheRoot: findCacheDir({ name: 'rts2' }),
      tsconfigDefaults: {
        compilerOptions: {
          module: 'es2015',
        },
      },
    }),
    commonjs(),
  ],
}
