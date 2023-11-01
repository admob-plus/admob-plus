import path from 'node:path';
import {Events} from '../../packages/cordova-consent/src/www/index';
import {getUnionTypeDict, renderKotlinConstants, warnMessage} from './common';
import Context from './context';

class Generator {
  constructor(private ctx: Context) {}

  pkgDir(...args: string[]) {
    return this.ctx.rootDirJoin('packages/cordova-consent', ...args);
  }

  get cordovaActions() {
    return getUnionTypeDict(this.pkgDir('src/www/index.ts'), 'CordovaAction');
  }

  buildKotlin() {
    const linesActions = renderKotlinConstants(this.cordovaActions);
    const linesEvents = renderKotlinConstants(Events);

    return `// ${warnMessage}
package cordova.plugin.consent

object Actions {
${linesActions}
}

object Events {
${linesEvents}
}

object ConsentStatus {
    const val UNKNOWN = 0
    const val REQUIRED = 1
    const val NOT_REQUIRED = 2
    const val OBTAINED = 3
}
`;
  }

  async files() {
    return {
      [this.pkgDir('src/android/Generated.kt')]: this.buildKotlin(),
    };
  }
}

export default Generator;
