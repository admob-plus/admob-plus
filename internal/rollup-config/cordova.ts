import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

const outDir = 'www'

export default (config: any) => ({
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
