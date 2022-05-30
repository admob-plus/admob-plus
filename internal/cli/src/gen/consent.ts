import _ from 'lodash';
import {pkgsDirJoin} from '../utils.js';
import {
  buildUtils,
  indent4,
  renderJavaContants,
  renderSwiftContants,
  renderTsContants,
  warnMessage,
} from './shared.js';

const Actions = _.mapValues(
  {
    ready: null,
    getConsentStatus: null,
    requestInfoUpdate: null,
    loadForm: null,
    getFormStatus: null,
    showForm: null,
    reset: null,
    trackingAuthorizationStatus: null,
    requestTrackingAuthorization: null,
  },
  (v, k) => (v === null ? k : v) as string
);

const Events = _.mapValues(
  {ready: null},
  (v, k) => `consent.${v === null ? k : v}`
);

const ConsentStatus: Record<string, number> = {
  Unknown: 0,
  Required: 1,
  NotRequired: 2,
  Obtained: 3,
};

function buildJava(): string {
  const linesActions = renderJavaContants(Actions);
  const linesEvents = renderJavaContants(Events);
  const linesConsentStatus = _.map(
    ConsentStatus,
    (v, k) =>
      `${indent4(2)}public static final int ${_.snakeCase(
        k
      ).toUpperCase()} = ${v};`
  ).join('\n');

  return `// ${warnMessage}
package cordova.plugin.consent;

public final class Generated {
    public final class Actions {
${linesActions}
    }

    public final class Events {
${linesEvents}
    }

    public final class ConsentStatus {
${linesConsentStatus}
    }
}
`;
}

function buildSwift(): string {
  const linesEvents = renderSwiftContants(Events);

  return `// ${warnMessage}
struct CSNEvents {
${linesEvents}
}
`;
}

function buildTypeScript(): string {
  return `// ${warnMessage}
export enum NativeActions {
${renderTsContants(Actions)}
}

export enum Events {
${renderTsContants(Events)}
}

export enum ConsentStatus {
${_.map(ConsentStatus, (v, k) => `  ${k} = ${v},`).join('\n')}
}
${buildUtils('Consent')}
`;
}

export default () => ({
  files: [
    {path: 'cordova-consent/src/android/Generated.java', f: buildJava},
    {
      path: 'cordova-consent/src/ios/CSNGenerated.swift',
      f: buildSwift,
    },
    {path: 'cordova-consent/src/www/generated.ts', f: buildTypeScript},
  ],
  pkgDir: pkgsDirJoin('cordova-consent'),
  targetDir: 'src/cordova/plugin/consent',
});
