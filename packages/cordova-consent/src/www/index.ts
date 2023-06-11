import {ConsentStatus, execAsync, initPlugin, NativeActions} from './generated';

export enum DebugGeography {
  Disabled = 0,
  EEA = 1,
  NotEEA = 2,
}

type RequestInfoUpdateOptions = {
  debugGeography?: DebugGeography;
  tagForUnderAgeOfConsent?: boolean;
  testDeviceIds?: string[];
};

export enum FormStatus {
  Unknown = 0,
  Available = 1,
  Unavailable = 2,
}

export enum TrackingAuthorizationStatus {
  notDetermined = 0,
  restricted = 1,
  denied = 2,
  authorized = 3,
}

export class ConsentForm {
  public readonly id: number;

  constructor(id: number) {
    this.id = id;
  }

  public show() {
    return execAsync(NativeActions.showForm, [{id: this.id}]);
  }
}

export {ConsentStatus};

export class Consent {
  public readonly ConsentStatus = ConsentStatus;
  public readonly DebugGeography = DebugGeography;
  public readonly FormStatus = FormStatus;

  constructor() {
    initPlugin();
  }

  public async trackingAuthorizationStatus(): Promise<
    TrackingAuthorizationStatus | false
  > {
    if (cordova.platformId === 'ios') {
      const n = await execAsync(NativeActions.trackingAuthorizationStatus);
      if (n !== false) {
        return TrackingAuthorizationStatus[
          TrackingAuthorizationStatus[n as number]
        ];
      }
    }
    return false;
  }

  public async requestTrackingAuthorization(): Promise<
    TrackingAuthorizationStatus | false
  > {
    if (cordova.platformId === 'ios') {
      const n = await execAsync(NativeActions.requestTrackingAuthorization);
      if (n !== false) {
        return TrackingAuthorizationStatus[
          TrackingAuthorizationStatus[n as number]
        ];
      }
    }
    return false;
  }

  public async getConsentStatus(): Promise<ConsentStatus> {
    const n = await execAsync(NativeActions.getConsentStatus);
    return ConsentStatus[ConsentStatus[n as number]];
  }

  public async getFormStatus(): Promise<FormStatus> {
    const n = await execAsync(NativeActions.getFormStatus);
    return FormStatus[FormStatus[n as number]];
  }

  public requestInfoUpdate(opts: RequestInfoUpdateOptions = {}) {
    return execAsync(NativeActions.requestInfoUpdate, [opts]);
  }

  public async loadForm() {
    const id = await execAsync(NativeActions.loadForm);
    return new ConsentForm(id as number);
  }

  public reset() {
    return execAsync(NativeActions.reset);
  }
}

declare global {
  const consent: Consent;
}
