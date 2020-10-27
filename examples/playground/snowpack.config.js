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
    '@snowpack/plugin-webpack',
    ['./snowpack-plugin.js', { platform: process.env.CORDOVA_PLATFORM }],
  ],
}
