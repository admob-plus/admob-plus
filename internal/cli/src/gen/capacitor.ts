import { AdMobPlusWeb } from '@admob-plus/capacitor/src/web'
import { pkgsDirJoin } from '../utils'
import { indent4, warnMessage } from './shared'

const genIosMacro = () => {
  const methods = Object.getOwnPropertyNames(AdMobPlusWeb.prototype).filter(
    (x) => x !== 'constructor',
  )

  return `// ${warnMessage}
#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(AdMobPlusPlugin, "AdMobPlus",
${methods
    .map(
      (x) => `${indent4(2)}   CAP_PLUGIN_METHOD(${x}, CAPPluginReturnPromise);`,
    )
    .join('\n')}
)
`
}

export default async () => ({
  files: [
    {
      path: 'capacitor/ios/Plugin/AdMobPlusPlugin.m',
      f: genIosMacro,
    },
  ],
  pkgDir: pkgsDirJoin('capacitor'),
  targetDir: '',
})
