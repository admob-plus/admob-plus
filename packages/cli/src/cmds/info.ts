import envinfo from '@frat/envinfo'
import clipboardy from 'clipboardy'
import elementtree from 'elementtree'
import execa from 'execa'
import fse from 'fs-extra'
import _ from 'lodash'
import readPkgUp from 'read-pkg-up'
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

  const result: { [k: string]: string } = {}
  const appIdKey =
    '<meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" ... />'

  result[appIdKey] = 'missing'
  switch (items.length) {
    case 0:
      result[appIdKey] = 'missing'
      break
    case 1: {
      const appId = items[0].get('android:value') || '-'
      result[appIdKey] = ['ca-app-pub-xxx~yyy', 'test', '-'].includes(appId)
        ? appId
        : 'looks ok'
      break
    }
    default:
      result[appIdKey] = 'multiple'
  }

  return result
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
  const extraInfo: { [x: string]: unknown } = {}

  const { stdout: cordovaVersion } = await execa('cordova', ['--version'], {
    reject: false,
  })

  const deps: { [k: string]: string } = {
    ...pkg.devDependencies,
    ...pkg.dependencies,
  }
  const cordovaPlugins = _.reduce(
    _.get(pkg, 'cordova.plugins'),
    (acc, v, k) => ({ ...acc, [k]: deps[k] }),
    {},
  )
  extraInfo.Cordova = {
    Version: cordovaVersion || '-',
    Plugins: cordovaPlugins,
  }
  const { stdout: ionicVersion } = await execa('ionic', ['--version'], {
    reject: false,
  })
  extraInfo.Ionic = { Version: ionicVersion || '-' }

  try {
    const androidInfo = await collectionAndroidManifestInfo()
    extraInfo['AndroidManifest.xml'] = androidInfo
  } catch {
    extraInfo['AndroidManifest.xml'] = { Version: '-' }
  }

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
          'typescript',
        ],
      },
      {
        console: false,
        title: 'AdMob Plus Environment Info',
        transform(x) {
          return { ...x, ...extraInfo }
        },
      },
    )
  } catch (err) {
    console.error(err)
  }

  console.log(infoText)

  if (argv.clipboard) {
    clipboardy.writeSync(infoText)
  }
}
