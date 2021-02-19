import { initPlugin, execAsync, NativeActions } from './generated'

type RequestInfoUpdateOptions = {
  tagForUnderAgeOfConsent?: boolean
}

enum TrackingAuthorizationStatus {
  notDetermined = 0,
  restricted = 1,
  denied = 2,
  authorized = 3,
}

enum ConsentStatus {
  Unknown = 0,
  Required = 1,
  NotRequired = 2,
  Obtained = 3,
}

enum ConsentType {
  Unknown = 0,
  Personalized = 1,
  NonPersonalized = 2,
}

enum FormStatus {
  Unknown = 0,
  Available = 1,
  Unavailable = 2,
}

class ConsentForm {
  public readonly id: number

  constructor(id: number) {
    this.id = id
  }

  public show() {
    return execAsync(NativeActions.showForm, [{ id: this.id }])
  }
}

class Consent {
  public readonly ConsentStatus = ConsentStatus
  public readonly ConsentType = ConsentType
  public readonly FormStatus = FormStatus
  public readonly TrackingAuthorizationStatus = TrackingAuthorizationStatus

  constructor() {
    initPlugin()
  }

  public async getConsentStatus(): Promise<ConsentStatus> {
    const n = await execAsync(NativeActions.getConsentStatus)
    return ConsentStatus[ConsentStatus[n as number]]
  }

  public async getConsentType(): Promise<ConsentType> {
    const n = await execAsync(NativeActions.getConsentType)
    return ConsentType[ConsentType[n as number]]
  }

  public async getFormStatus(): Promise<FormStatus> {
    const n = await execAsync(NativeActions.getFormStatus)
    return FormStatus[FormStatus[n as number]]
  }

  public requestInfoUpdate(opts: RequestInfoUpdateOptions = {}) {
    return execAsync(NativeActions.requestInfoUpdate, [opts])
  }

  public async loadForm() {
    const id = await execAsync(NativeActions.loadForm)
    return new ConsentForm(id as number)
  }

  public reset() {
    return execAsync(NativeActions.reset)
  }

  public async requestTrackingAuthorization(): Promise<
    TrackingAuthorizationStatus | false
  > {
    if (cordova.platformId === 'ios') {
      const n = await execAsync(NativeActions.requestTrackingAuthorization)
      return TrackingAuthorizationStatus[
        TrackingAuthorizationStatus[n as number]
      ]
    }

    return false
  }
}

const consent = new Consent()

export default consent
