import { initPlugin, execAsync, NativeActions } from './generated'

export enum DebugGeography {
  Disabled = 0,
  EEA = 1,
  NotEEA = 2,
}

type RequestInfoUpdateOptions = {
  debugGeography?: DebugGeography
  tagForUnderAgeOfConsent?: boolean
  testDeviceIds?: string[]
}

export enum ConsentStatus {
  Unknown = 0,
  Required = 1,
  NotRequired = 2,
  Obtained = 3,
}

export enum FormStatus {
  Unknown = 0,
  Available = 1,
  Unavailable = 2,
}

export class ConsentForm {
  public readonly id: number

  constructor(id: number) {
    this.id = id
  }

  public show() {
    return execAsync(NativeActions.showForm, [{ id: this.id }])
  }
}

export class Consent {
  public readonly ConsentStatus = ConsentStatus
  public readonly DebugGeography = DebugGeography
  public readonly FormStatus = FormStatus

  constructor() {
    initPlugin()
  }

  public async getConsentStatus(): Promise<ConsentStatus> {
    const n = await execAsync(NativeActions.getConsentStatus)
    return ConsentStatus[ConsentStatus[n as number]]
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
}
