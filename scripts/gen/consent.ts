import path from 'node:path';
import {ConsentStatus, Events} from '../../packages/cordova-consent/src/www/index';
import {getUnionTypeDict, renderKotlinConstants, renderKotlinEnums, warnMessage} from './common';
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
    const linesConsentStatus = renderKotlinEnums(ConsentStatus);

    return `// ${warnMessage}
package cordova.plugin.consent

object Actions {
${linesActions}
}

object Events {
${linesEvents}
}

object ConsentStatus {
${linesConsentStatus}
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
