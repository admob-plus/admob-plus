import { pkgsDirJoin } from '../utils'
import { AdEvents, extractClassInfo } from './capacitor'
import { indent4, renderSwiftEnumCases, warnMessage } from './shared'

const pluginMethods = (() => {
  const definitionsPath = require.resolve(
    '@admob-plus/react-native/src/definitions.ts',
  )
  const { methodSignatures } = extractClassInfo(
    definitionsPath,
    'AdMobPlusPlugin',
  )
  return methodSignatures.map((x) => x.getName())
})()

const buildIosMacro = () => {
  const methodsWithoutOpts = new Set(['start'])

  return `// ${warnMessage}
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(RNAdMobPlus, RCTEventEmitter)

${[...methodsWithoutOpts]
    .map(
      (x) => `RCT_EXTERN_METHOD(${x}:(RCTPromiseResolveBlock)resolve
${indent4(4)}  rejecter:(RCTPromiseRejectBlock)reject)
`,
    )
    .join('\n')}
${pluginMethods
    .filter((x) => !methodsWithoutOpts.has(x))
    .map(
      (x) => `RCT_EXTERN_METHOD(${x}:(NSDictionary)opts
${indent4(4)}  resolver:(RCTPromiseResolveBlock)resolve
${indent4(4)}  rejecter:(RCTPromiseRejectBlock)reject)
`,
    )
    .join('\n')}
@end
`
}

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
      path: 'react-native/ios/RNAdMobPlus.m',
      f: buildIosMacro,
    },
    {
      path: 'react-native/ios/AMBGenerated.swift',
      f: buildSwift,
    },
  ],
  pkgDir: pkgsDirJoin('react-native'),
  targetDir: '',
})
