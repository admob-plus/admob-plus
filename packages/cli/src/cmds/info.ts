import * as clipboardy from 'clipboardy'
import * as elementtree from 'elementtree'
// @ts-expect-error: no types
import * as envinfo from 'envinfo'
import * as execa from 'execa'
import * as fse from 'fs-extra'
import * as _ from 'lodash'
import * as readPkgUp from 'read-pkg-up'
import { Argv } from 'yargs'

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

export const command = 'info'

export const desc =
  'Get relevant version info about OS, toolchain and libraries'

export const builder = (yargs: Argv<unknown>) =>
  yargs.options({
    clipboard: {
      type: 'boolean',
      desc: 'Copy the environment report output to the clipboard',
    },
  })

export const handler = async (argv: ReturnType<typeof builder>['argv']) => {
  const pkg = { ...(await readPkgUp())?.packageJson }
  let infoText = ''
  try {
    infoText = await envinfo.run(
      {
        Binaries: ['Node', 'Yarn', 'npm', 'Watchman'],
        IDEs: ['Xcode', 'Android Studio'],
        Languages: ['Java'],
        Managers: ['CocoaPods'],
        SDKs: ['iOS SDK', 'Android SDK'],
        System: ['OS', 'CPU', 'Memory', 'Shell'],
        Utilities: ['Clang'],
        npmGlobalPackages: ['cordova', 'ionic'],
        npmPackages: [
          ..._.keys(_.get(pkg, 'cordova.plugins')),
          'admob-plus',
          '@admob-plus/*',
          '@ionic*',
          'admob-plus-cordova',
          'cordova-admob-plus',
          'cordova-android',
          'cordova-browser',
          'cordova-ios',
          'cordova',
          'ionic*',
        ],
      },
      {
        console: false,
        title: 'AdMob Plus Environment Info',
      },
    )
  } catch (err) {
    console.error(err)
  }

  if (!infoText.includes('cordova')) {
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
      undefined,
      2,
    )}\n`
  }

  try {
    const androidInfo = await collectionAndroidManifestInfo()
    infoText += `\nAndroidManifest.xml: ${androidInfo}\n`
    // tslint:disable-next-line:no-empty
  } catch {}

  console.log(infoText)

  if (argv.clipboard) {
    clipboardy.writeSync(infoText)
  }
}
