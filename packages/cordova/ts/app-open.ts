import { execAsync, MobileAd, NativeActions, MobileAdOptions } from './shared'

class GenericAd extends MobileAd {
  private _init: Promise<void> | null

  constructor(opts: MobileAdOptions & { type: string }) {
    super(opts)

    this._init = execAsync(NativeActions.createAd, [
      { ...opts, id: this.id, type: opts.type },
    ]).then(() => {
      this._init = null
    })
  }

  async isLoaded() {
    if (this._init !== null) await this._init
    return execAsync(NativeActions.adIsLoaded, [
      { id: this.id },
    ]) as Promise<boolean>
  }

  async load() {
    if (this._init !== null) await this._init
    await execAsync(NativeActions.adLoad, [{ id: this.id }])
  }

  async show() {
    if (this._init !== null) await this._init
    return execAsync(NativeActions.adShow, [
      { id: this.id },
    ]) as Promise<boolean>
  }
}

export default class AppOpenAd extends GenericAd {
  constructor(opts: MobileAdOptions) {
    super({ ...opts, type: 'app-open' })
  }

  async showOrLoad() {
    await execAsync(NativeActions.appOpenTryToPresent, [{ id: this.id }])
  }
}
