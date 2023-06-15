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

  buildProxyJs() {
    const linesActions = Object.entries(this.cordovaActions)
      .map(([k, v]) => `  ${k}() {},`)
      .sort()
      .join('\n');

    return `// ${warnMessage}
'use strict';

const AdMob = {
${linesActions}
};

// eslint-disable-next-line
require('cordova/exec/proxy').add('AdMob', AdMob);
`;
  }

  async files() {
    return {
      [this.pkgDir('src/android/cordova/Generated.kt')]: this.buildKotlin(),
      [this.pkgDir('src/browser/AdMobProxy.js')]: this.buildProxyJs(),
    };
  }
}

export default Generator;
