import { execAsync, NativeActions } from './generated'

export { execAsync, AdSizeType, Events, NativeActions } from './generated'

/** @internal */
export type MobileAdOptions = { id?: number; adUnitId: string; npa?: '1' }

/** @internal */
export class MobileAd<T extends MobileAdOptions = MobileAdOptions> {
  public static readonly type: string = ''

  private static allAds: { [s: number]: MobileAd } = {}
  private static idCounter = 0

  public readonly id: number

  protected readonly opts: T
  private _init: Promise<void> | null

  constructor(opts: T) {
    this.opts = opts

    this.id = opts.id ?? MobileAd.nextId()
    MobileAd.allAds[this.id] = this

    this._init = execAsync(NativeActions.adCreate, [
      { ...opts, id: this.id, cls: this.constructor.name },
    ]).then(() => {
      this._init = null
    })
  }

  public static getAdById(id: number) {
    return this.allAds[id]
  }

  private static nextId() {
    MobileAd.idCounter += 1
    return MobileAd.idCounter
  }

  public get adUnitId() {
    return this.opts.adUnitId
  }

  protected async isLoaded() {
    await this.init()
    return execAsync(NativeActions.adIsLoaded, [
      { id: this.id },
    ]) as Promise<boolean>
  }

  protected async load() {
    await this.init()
    await execAsync(NativeActions.adLoad, [{ id: this.id }])
  }

  protected async show(opts?: Record<string, any>) {
    await this.init()
    return execAsync(NativeActions.adShow, [{ ...opts, id: this.id }])
  }

  protected async hide() {
    return execAsync(NativeActions.adHide, [{ id: this.id }])
  }

  protected async init() {
    if (this._init !== null) await this._init
  }
}

export enum MaxAdContentRating {
  G = 'G',
  MA = 'MA',
  PG = 'PG',
  T = 'T',
  UNSPECIFIED = '',
}

export type RequestConfig = {
  maxAdContentRating?: MaxAdContentRating
  tagForChildDirectedTreatment?: boolean | null
  tagForUnderAgeOfConsent?: boolean | null
  testDeviceIds?: string[]
}

export const enum Platforms {
  android = 'android',
  ios = 'ios',
}

export enum TrackingAuthorizationStatus {
  notDetermined = 0,
  restricted = 1,
  denied = 2,
  authorized = 3,
}
