import { pkgsDirJoin } from '../utils'
import { buildUtils, warnMessage } from './shared'

function buildTypeScript(): string {
  return `// ${warnMessage}
import { exec } from 'cordova'
${buildUtils('Consent')}
`
}

export default () => ({
  files: [{ path: 'cordova-consent/ts/generated.ts', f: buildTypeScript }],
  pkgDir: pkgsDirJoin('cordova-consent'),
  tagertDir: 'src/cordova/plugin/consent',
})
