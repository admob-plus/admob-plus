import { execAsync, MobileAd, NativeActions, MobileAdOptions } from './shared'

export class GenericAd<
  T extends MobileAdOptions = MobileAdOptions,
  S = Record<string, any>,
> extends MobileAd<T> {
  private _init: Promise<void> | null

  constructor(opts: T) {
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

enum AppOpenAdOrientation {
  Portrait = 1,
  PortraitUpsideDown = 2,
  LandscapeRight = 3,
  LandscapeLeft = 4,
}

export default class AppOpenAd extends GenericAd<
  MobileAdOptions & { orientation: AppOpenAdOrientation }
> {
  static readonly Orientation = AppOpenAdOrientation
}
