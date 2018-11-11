import { Command, flags } from '@oclif/command'
import * as clipboardy from 'clipboardy'
// @ts-ignore: No types
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

    this.log(infoText)

    if (parsedFlags.clipboard) {
      clipboardy.writeSync(infoText)
    }
  }
}
