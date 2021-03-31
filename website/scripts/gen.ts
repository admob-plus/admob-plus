import { PluginInfo } from 'cordova-common'
import path from 'path'
import { replaceInFile } from 'replace-in-file'

const main = async () => {
  const cordovaPlugin = new PluginInfo(
    path.dirname(require.resolve('../../packages/cordova/plugin.xml')),
  )
  const PLAY_SERVICES_VERSION = cordovaPlugin._et
    .find(
      './platform/[@name="android"]/preference/[@name="PLAY_SERVICES_VERSION"]',
    )
    .get('default')

  await replaceInFile({
    files: require.resolve('../docs/cordova/installation.mdx'),
    from: /--PLAY_SERVICES_VERSION=([\d\.]+)/g,
    to: `--PLAY_SERVICES_VERSION=${PLAY_SERVICES_VERSION}`,
  })
}

main()
