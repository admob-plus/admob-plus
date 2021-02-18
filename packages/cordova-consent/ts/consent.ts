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
  public static readonly ConsentStatus = ConsentStatus
  public static readonly ConsentType = ConsentType
  public static readonly FormStatus = FormStatus
  public static readonly TrackingAuthorizationStatus = TrackingAuthorizationStatus

  constructor() {
    initPlugin()
  }

  public getFormStatus() {
    return execAsync(NativeActions.getFormStatus)
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

  public async requestTrackingAuthorization() {
    if (cordova.platformId === 'ios') {
      return execAsync('requestTrackingAuthorization')
    }

    return false
  }
}

export default new Consent()
