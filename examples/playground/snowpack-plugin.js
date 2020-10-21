const internalIp = require('internal-ip')
const execa = require('execa')
const fse = require('fs-extra')

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
  }
}
