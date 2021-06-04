import { execAsync, MobileAd, NativeActions, MobileAdOptions } from './shared'

export class GenericAd<S = Record<string, any>> extends MobileAd {
  private _init: Promise<void> | null

  constructor(opts: MobileAdOptions) {
    super(opts)

    this._init = execAsync(NativeActions.adCreate, [
      { ...opts, id: this.id, cls: this.constructor.name },
    ]).then(() => {
      this._init = null
    })
  }

  async isLoaded() {
    await this.init()
    return execAsync(NativeActions.adIsLoaded, [
      { id: this.id },
    ]) as Promise<boolean>
  }

  async load() {
    await this.init()
    await execAsync(NativeActions.adLoad, [{ id: this.id }])
  }

  async show(opts?: S) {
    await this.init()
    return execAsync(NativeActions.adShow, [
      { ...opts, id: this.id },
    ]) as Promise<boolean>
  }

  protected async init() {
    if (this._init !== null) await this._init
  }
}

export default class AppOpenAd extends GenericAd {}
