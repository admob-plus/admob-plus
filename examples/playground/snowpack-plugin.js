const execa = require('execa')
const fse = require('fs-extra')
const internalIp = require('internal-ip')
const path = require('path')

module.exports = function (snowpackConfig, pluginOptions) {
  return {
    name: 'playground-snowpack-plugin',
    async run({ isDev }) {
      if (isDev) {
        const xmlText = await fse.readFile('config.base.xml', 'utf8')
        const configXml = xmlText.replace(
          /<content src="index\.html" \/>\s+<access origin="\*" \/>/,
          `<content src="http://${await internalIp.v4()}:${
            snowpackConfig.devOptions.port
          }" />
          <access origin="*" launch-external="no" />
          <allow-navigation href="http://*/*" />
          <allow-navigation href="https://*/*" />`,
        )
        await fse.outputFile('config.xml', configXml)
      } else {
        await fse.copy('config.base.xml', 'config.xml')
      }
      await execa('cordova', ['prepare'])
    },
    // eslint-disable-next-line consistent-return
    transform({ contents, id }) {
      if (id === path.resolve('public/index.html')) {
        return contents.replace(
          '</noscript>',
          '</noscript>\n<script type="text/javascript" src="cordova.js"></script>',
        )
      }
    },
  }
}
