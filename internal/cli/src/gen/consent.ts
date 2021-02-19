import _ from 'lodash'
import { pkgsDirJoin } from '../utils'
import {
  buildUtils,
  renderJavaContants,
  renderSwiftContants,
  renderTsContants,
  warnMessage,
} from './shared'

const Actions = _.mapValues(
  {
    ready: null,
    getConsentStatus: null,
    getConsentType: null,
    requestInfoUpdate: null,
    loadForm: null,
    getFormStatus: null,
    showForm: null,
    reset: null,
    requestTrackingAuthorization: null,
  },
  (v, k) => (v === null ? k : v) as string,
)

const Events = _.mapValues(
  { ready: null },
  (v, k) => `consent.${v === null ? k : v}`,
)

function buildJava(): string {
  const linesActions = renderJavaContants(Actions)
  const linesEvents = renderJavaContants(Events)

  return `// ${warnMessage}
package cordova.plugin.consent;

public final class Generated {
    public final class Actions {
${linesActions}
    }

    public final class Events {
${linesEvents}
    }
}
`
}

function buildSwift(): string {
  const linesEvents = renderSwiftContants(Events)

  return `// ${warnMessage}
struct CSNEvents {
${linesEvents}
}
`
}

function buildTypeScript(): string {
  return `// ${warnMessage}
import { exec } from 'cordova'

export enum NativeActions {
${renderTsContants(Actions)}
}

export enum Events {
${renderTsContants(Events)}
}
${buildUtils('Consent')}
`
}

export default () => ({
  files: [
    { path: 'cordova-consent/src/android/Generated.java', f: buildJava },
    {
      path: 'cordova-consent/src/ios/CSNGenerated.swift',
      f: buildSwift,
    },
    { path: 'cordova-consent/ts/generated.ts', f: buildTypeScript },
  ],
  pkgDir: pkgsDirJoin('cordova-consent'),
  tagertDir: 'src/cordova/plugin/consent',
})
