import { Command, flags } from '@oclif/command'
import * as envinfo from 'envinfo'
import * as execa from 'execa'
import * as _ from 'lodash'
import * as readPkgUp from 'read-pkg-up'

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
            ...Object.keys(_.get(pkg, 'cordova.plugins')),
            'cordova-admob-plus',
          ],
        },
        {
          clipboard: parsedFlags.clipboard,
          title: 'AdMob Plus Environment Info',
        },
      )
      this.log(infoText)
    } catch (err) {
      this.log(err)
    }

    if (infoText.indexOf('cordova') > -1) {
      return
    }

    const { stdout: cordovaVersion } = await execa('cordova', ['--version'], {
      reject: false,
    })

    this.log(`cordova: ${cordovaVersion}`)

    const { stdout: ionicVersion } = await execa('ionic', ['--version'], {
      reject: false,
    })
    if (ionicVersion) {
      this.log(`ionic: ${ionicVersion}`)
    }

    const deps: { [k: string]: string } = {
      ...pkg.devDependencies,
      ...pkg.dependencies,
    }
    const cordovaPlugins = _.reduce(
      _.get(pkg, 'cordova.plugins'),
      (acc, v, k) => ({ ...acc, [k]: deps[k] }),
      {},
    )
    this.log(`cordova plugins: ${JSON.stringify(cordovaPlugins, null, 2)}`)
  }
}
