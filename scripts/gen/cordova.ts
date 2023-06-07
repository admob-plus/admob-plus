import {Events} from '../../packages/cordova/src/www/common';
import {getUnionTypeValues, renderKotlinConstants, warnMessage} from './common';
import path from 'node:path';

function buildKotlin(pkgDir: string) {
  const filePath = path.join(pkgDir, 'src/www/common.ts');

  const linesActions = renderKotlinConstants(
    getUnionTypeValues(filePath, 'CordovaAction').reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: cur,
      }),
      {}
    )
  );
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

export default async (rootDir: string) => {
  const pkgDir = path.join(rootDir, 'packages/cordova');

  return {
    [path.join(pkgDir, 'src/android/cordova/Generated.kt')]:
      buildKotlin(pkgDir),
  };
};
