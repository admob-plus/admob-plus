import { Command, flags } from '@oclif/command'
import * as clipboardy from 'clipboardy'
import * as elementtree from 'elementtree'
// @ts-ignore: No types
import * as envinfo from 'envinfo'
import * as execa from 'execa'
import * as fse from 'fs-extra'
import * as _ from 'lodash'
import * as readPkgUp from 'read-pkg-up'

const collectionAndroidManifestInfo = async () => {
  const content = await fse.readFile(
    'platforms/android/app/src/main/AndroidManifest.xml',
    'utf8',
  )
  const etree = elementtree.parse(content)
  const items = etree.findall(
    './application/meta-data/[@android:name="com.google.android.gms.ads.APPLICATION_ID"]',
  )
  return {
    count: items.length,
    toString() {
      switch (items.length) {
        case 0:
          return 'missing <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" ... />'
        case 1:
          return items[0].get('android:value') === 'test'
            ? 'using test APPLICATION_ID'
            : 'looks ok'
        default:
          return 'multiple <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" ... />'
      }
    },
  }
}

export default class InfoCommand extends Command {
  public static description =
    'Get relevant version info about OS, toolchain and libraries'

  public static examples = [`$ admob-plus info`]

  public static flags = {
    clipboard: flags.boolean({
      description: 'copy the environment report output to the clipboard',
    }),
    help: flags.help({ char: 'h' }),
  }

  public static args = []

  public async run() {
    const { flags: parsedFlags } = this.parse(InfoCommand)

    const { pkg } = await readPkgUp()
    let infoText = ''
    try {
      infoText = await envinfo.run(
        {
          Binaries: ['Node', 'Yarn', 'npm', 'Watchman'],
          IDEs: ['Xcode', 'Android Studio'],
          SDKs: ['iOS SDK', 'Android SDK'],
          System: ['OS', 'CPU', 'Memory', 'Shell'],
          npmGlobalPackages: ['cordova', 'ionic'],
          npmPackages: [
            'cordova-android',
            'cordova-browser',
            'cordova-ios',
            ..._.keys(_.get(pkg, 'cordova.plugins')),
            'cordova-admob-plus',
          ],
        },
        {
          console: false,
          title: 'AdMob Plus Environment Info',
        },
      )
    } catch (err) {
      this.log(err)
    }

    if (infoText.indexOf('cordova') === -1) {
      const { stdout: cordovaVersion } = await execa('cordova', ['--version'], {
        reject: false,
      })
      infoText += `\ncordova: ${cordovaVersion}\n`

      const { stdout: ionicVersion } = await execa('ionic', ['--version'], {
        reject: false,
      })
      infoText += `ionic: ${ionicVersion}\n`

      const deps: { [k: string]: string } = {
        ...pkg.devDependencies,
        ...pkg.dependencies,
      }
      const cordovaPlugins = _.reduce(
        _.get(pkg, 'cordova.plugins'),
        (acc, v, k) => ({ ...acc, [k]: deps[k] }),
        {},
      )
      infoText += `cordova plugins: ${JSON.stringify(
        cordovaPlugins,
        null,
        2,
      )}\n`
    }

    try {
      const androidInfo = await collectionAndroidManifestInfo()
      infoText += `\nAndroidManifest.xml: ${androidInfo}\n`
      // tslint:disable-next-line:no-empty
    } catch (err) {}

    this.log(infoText)

    if (parsedFlags.clipboard) {
      clipboardy.writeSync(infoText)
    }
  }
}
