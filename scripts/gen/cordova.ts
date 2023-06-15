import {Events} from '../../packages/cordova/src/www/common';
import {getUnionTypeValues, renderKotlinConstants, warnMessage} from './common';
import path from 'node:path';

class Generator {
  constructor(private rootDir: string) {}

  pkgDir(...args: string[]) {
    return path.join(this.rootDir, 'packages/cordova', ...args);
  }

  get cordovaActions() {
    const filePath = this.pkgDir('src/www/common.ts');
    return getUnionTypeValues(filePath, 'CordovaAction').reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: cur,
      }),
      {}
    );
  }

  buildKotlin() {
    const linesActions = renderKotlinConstants(this.cordovaActions);
    const linesEvents = renderKotlinConstants(Events);

    return `// ${warnMessage}
  package admob.plus.cordova

  object Actions {
  ${linesActions}
  }

  object Events {
  ${linesEvents}
  }
  `;
  }

  async files() {
    return {
      [this.pkgDir('src/android/cordova/Generated.kt')]: this.buildKotlin(),
    };
  }
}

export default Generator;
