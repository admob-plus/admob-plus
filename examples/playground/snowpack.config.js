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
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    [
      '@snowpack/plugin-run-script',
      {
        cmd: 'svelte-check --output human',
        watch: '$1 --watch',
        output: 'stream',
      },
    ],
    '@snowpack/plugin-webpack',
    ['./snowpack-plugin.js', { platform: process.env.CORDOVA_PLATFORM }],
  ],
}
