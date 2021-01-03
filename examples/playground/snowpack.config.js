const _ = require('lodash')
const PnpWebpackPlugin = require('pnp-webpack-plugin')

module.exports = {
  buildOptions: {
    baseUrl: './',
    out: 'www',
  },
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    [
      '@snowpack/plugin-webpack',
      {
        extendConfig: (config) =>
          _.merge(config, {
            resolve: {
              plugins: [PnpWebpackPlugin],
            },
            resolveLoader: {
              plugins: [PnpWebpackPlugin.moduleLoader(module)],
            },
          }),
      },
    ],
    ['./snowpack-plugin.js', { platform: process.env.CORDOVA_PLATFORM }],
  ],
}
