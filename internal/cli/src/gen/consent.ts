import { pkgsDirJoin } from '../utils'
import { warnMessage, fireDocumentEventTs } from './shared'

function buildTypeScript(): string {
  return `// ${warnMessage}
${fireDocumentEventTs}
`
}

export default () => ({
  files: [{ path: 'cordova-consent/ts/generated.ts', f: buildTypeScript }],
  pkgDir: pkgsDirJoin('cordova-consent'),
  tagertDir: 'src/cordova/plugin/consent',
})
