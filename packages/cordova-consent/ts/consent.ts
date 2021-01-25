import { initPlugin, execAsync, NativeActions } from './generated'

type RequestInfoUpdateOptions = {
  tagForUnderAgeOfConsent?: boolean
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
  constructor() {
    initPlugin()
  }

  public getStatus() {
    return execAsync(NativeActions.getStatus)
  }

  public isFormAvailable() {
    return execAsync(NativeActions.isFormAvailable)
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

export default new Consent()
