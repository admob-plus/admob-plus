import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import * as doctorCmd from './cmds/doctor';
import * as infoCmd from './cmds/info';
import * as installCmd from './cmds/install';
import * as testIdsCmd from './cmds/test-ids';
import {testAppIds} from './doctor/admob';

export {testAppIds};
export default (name: string) => {
  const {argv} = yargs(hideBin(process.argv))
    .scriptName(name)
    .command(doctorCmd)
    .command(infoCmd)
    .command(installCmd)
    .command(testIdsCmd)
    .demandCommand()
    .help();

  return argv;
};
