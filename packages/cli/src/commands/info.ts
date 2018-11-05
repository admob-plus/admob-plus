import { Command, flags } from '@oclif/command'
import * as execa from 'execa'
import * as _ from 'lodash'
import * as readPkgUp from 'read-pkg-up'

export default class InfoCommand extends Command {
  public static description =
    'Get relevant version info about OS, toolchain and libraries'

  public static examples = [`$ admob-plus info`]

  public static flags = {
    help: flags.help({ char: 'h' }),
  }

  public static args = []

  public async run() {
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

    const { pkg } = await readPkgUp()
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
