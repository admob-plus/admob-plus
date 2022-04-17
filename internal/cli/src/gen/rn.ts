import _ from 'lodash';
import {pkgsDirJoin} from '../utils';
import {AdEvents, extractClassInfo} from './capacitor';
import {
  indent4,
  renderSwiftEnumCases,
  renderJavaContants,
  warnMessage,
} from './shared';

const Events = _.omitBy(
  AdEvents,
  (v, k) =>
    k.startsWith('banner') ||
    k.startsWith('interstitial') ||
    k.startsWith('rewarded')
);

const pluginMethods = (() => {
  const definitionsPath = require.resolve(
    '@admob-plus/react-native/src/definitions.ts'
  );
  const {methodSignatures} = extractClassInfo(
    definitionsPath,
    'AdMobPlusPlugin'
  );
  return methodSignatures.map(x => x.getName());
})();

function buildJava(): string {
  const linesEvents = renderJavaContants(Events);

  return `// ${warnMessage}
package admob.plus.rn;

public final class Generated {
    public final class Events {
${linesEvents}
    }
}
`;
}

const buildIosMacro = () => {
  const methodsWithoutOpts = ['start'];

  return `// ${warnMessage}
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(AdMobPlusRN, RCTEventEmitter)

${methodsWithoutOpts
  .map(
    x => `RCT_EXTERN_METHOD(${x}:(RCTPromiseResolveBlock)resolve
${indent4(4)}  rejecter:(RCTPromiseRejectBlock)reject)
`
  )
  .join('\n')}
${pluginMethods
  .filter(x => !methodsWithoutOpts.includes(x))
  .map(
    x => `RCT_EXTERN_METHOD(${x}:(NSDictionary)opts
${indent4(4)}  resolver:(RCTPromiseResolveBlock)resolve
${indent4(4)}  rejecter:(RCTPromiseRejectBlock)reject)
`
  )
  .join('\n')}
@end
`;
};

function buildSwift(): string {
  const linesEvents = renderSwiftEnumCases(Events);

  return `// ${warnMessage}
enum AMBEvents: String, CaseIterable {
${linesEvents}
}
`;
}

export default () => ({
  files: [
    {
      path: 'react-native/android/src/main/java/admob/plus/rn/Generated.java',
      f: buildJava,
    },
    {
      path: 'react-native/ios/AdMobPlusRN.m',
      f: buildIosMacro,
    },
    {
      path: 'react-native/ios/AMBGenerated.swift',
      f: buildSwift,
    },
  ],
  pkgDir: pkgsDirJoin('react-native'),
  targetDir: '',
});
