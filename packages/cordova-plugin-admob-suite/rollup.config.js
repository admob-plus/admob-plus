import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

export default {
  external: ['cordova'],
  input: './ts/admob.ts',
  output: {
    file: 'www/admob.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    typescript(),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
  ],
}
