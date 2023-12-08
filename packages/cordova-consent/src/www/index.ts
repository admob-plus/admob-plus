const CordovaService = 'Consent';

type CordovaAction =
  | 'getConsentStatus'
  | 'getFormStatus'
  | 'loadForm'
  | 'ready'
  | 'requestInfoUpdate'
  | 'requestTrackingAuthorization'
  | 'reset'
  | 'showForm'
  | 'trackingAuthorizationStatus'
  | 'canRequestAds'
  | 'privacyOptionsRequirementStatus'
  | 'loadAndShowIfRequired'
  | 'showPrivacyOptionsForm';

function execAsync<T>(action: CordovaAction, args?: unknown[]) {
  return new Promise<T>((resolve, reject) => {
    cordova.exec(resolve, reject, CordovaService, action, args);
  });
}

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
    return execAsync('showForm', [{id: this.id}]);
  }
}

export enum ConsentStatus {
  Unknown = 0,
  Required = 1,
  NotRequired = 2,
  Obtained = 3,
}

export enum PrivacyOptionsRequirementStatus {
  Unknown = 0,
  Required = 1,
  NotRequired = 2,
}

export enum Events {
  ready = 'consent.ready',
}

export class Consent {
  public readonly ConsentStatus = ConsentStatus;
  public readonly DebugGeography = DebugGeography;
  public readonly FormStatus = FormStatus;
  public readonly PrivacyOptionsRequirementStatus =
    PrivacyOptionsRequirementStatus;

  constructor() {
    document.addEventListener(
      'deviceready',
      () => {
        const action: CordovaAction = 'ready';
        cordova.exec(
          event => {
            cordova.fireDocumentEvent(event.type, event.data);
          },
          console.error,
          CordovaService,
          action
        );
      },
      false
    );
  }

  public async canRequestAds() {
    return await execAsync<boolean>('canRequestAds');
  }

  public async privacyOptionsRequirementStatus(): Promise<PrivacyOptionsRequirementStatus> {
    const n = await execAsync<number>('privacyOptionsRequirementStatus');
    return PrivacyOptionsRequirementStatus[PrivacyOptionsRequirementStatus[n]];
  }

  public loadAndShowIfRequired() {
    return execAsync('loadAndShowIfRequired');
  }

  public showPrivacyOptionsForm() {
    return execAsync('showPrivacyOptionsForm');
  }

  public async trackingAuthorizationStatus(): Promise<
    TrackingAuthorizationStatus | false
  > {
    if (cordova.platformId === 'ios') {
      const n = await execAsync<number | false>('trackingAuthorizationStatus');
      if (n !== false) {
        return TrackingAuthorizationStatus[TrackingAuthorizationStatus[n]];
      }
    }
    return false;
  }

  public async requestTrackingAuthorization(): Promise<
    TrackingAuthorizationStatus | false
  > {
    if (cordova.platformId === 'ios') {
      const n = await execAsync<number | false>('requestTrackingAuthorization');
      if (n !== false) {
        return TrackingAuthorizationStatus[TrackingAuthorizationStatus[n]];
      }
    }
    return false;
  }

  public async getConsentStatus(): Promise<ConsentStatus> {
    const n = await execAsync<number>('getConsentStatus');
    return ConsentStatus[ConsentStatus[n]];
  }

  public async getFormStatus(): Promise<FormStatus> {
    const n = await execAsync<number>('getFormStatus');
    return FormStatus[FormStatus[n]];
  }

  public requestInfoUpdate(opts: RequestInfoUpdateOptions = {}) {
    return execAsync('requestInfoUpdate', [opts]);
  }

  public async loadForm() {
    const id = await execAsync<number>('loadForm');
    return new ConsentForm(id);
  }

  public reset() {
    return execAsync('reset');
  }
}

declare global {
  const consent: Consent;
}
