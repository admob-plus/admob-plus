import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import * as doctorCmd from './cmds/doctor'
import * as infoCmd from './cmds/info'

export default (name: string) => {
  const { argv } = yargs(hideBin(process.argv))
    .scriptName(name)
    .command(doctorCmd)
    .command(infoCmd)
    .demandCommand()
    .help()

  return argv
}
