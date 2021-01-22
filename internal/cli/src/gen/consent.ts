import { warnMessage, fireDocumentEventTs } from './shared'

function buildTypeScript(): string {
  return `// ${warnMessage}
${fireDocumentEventTs}
`
}

export default () => ({
  files: [{ path: 'cordova-consent/ts/generated.ts', f: buildTypeScript }],
})
