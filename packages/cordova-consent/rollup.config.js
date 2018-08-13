import config from '../cordova/rollup.config'

export default {
  ...config,
  input: './ts/consent.ts',
  output: {
    ...config.output,
    file: 'www/consent.js',
  },
}
