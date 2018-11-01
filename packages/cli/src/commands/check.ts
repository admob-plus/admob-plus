import { Command, flags } from '@oclif/command'
import * as execa from 'execa'

export default class Check extends Command {
  public static description = 'check setup'

  public static examples = [
    `$ admob-plus check
ok!
`,
  ]

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
  }
}
