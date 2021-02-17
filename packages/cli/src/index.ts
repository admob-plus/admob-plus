import yargs from 'yargs'
// @ts-expect-error missing type
import { hideBin } from 'yargs/helpers'

import * as infoCmd from './cmds/info'

export default () => {
  const { argv } = yargs(hideBin(process.argv))
    .command(infoCmd)
    .demandCommand()
    .help()

  return argv
}
