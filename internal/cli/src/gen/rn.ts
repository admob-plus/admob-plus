import { pkgsDirJoin } from '../utils'
import { AdEvents } from './capacitor'
import { renderSwiftEnumCases, warnMessage } from './shared'

function buildSwift(): string {
  const linesEvents = renderSwiftEnumCases(AdEvents)

  return `// ${warnMessage}
enum AMBEvents: String, CaseIterable {
${linesEvents}
}
`
}

export default () => ({
  files: [
    {
      path: 'react-native/ios/AMBGenerated.swift',
      f: buildSwift,
    },
  ],
  pkgDir: pkgsDirJoin('react-native'),
  targetDir: '',
})
