import {ListrBaseClassOptions} from 'listr2';
import {Pkg} from 'pkg-proxy';

export interface Ctx {
  pkg?: Pkg;
  swiftVersion: string;
  playServicesVersion: string;
  iosSDKVersion: string;
}

export const options: ListrBaseClassOptions<any, any, 'verbose'> = {
  concurrent: true,
  exitOnError: false,
  rendererOptions: {collapse: false, persistentOutput: true},
};
