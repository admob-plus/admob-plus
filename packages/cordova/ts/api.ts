export { AdSizeType, Events, NativeActions } from './generated'

/** @internal */
export type MobileAdOptions = { id?: number; adUnitId: string; npa?: '1' }

/** @internal */
export class MobileAd<T extends MobileAdOptions = MobileAdOptions> {
  public static readonly type: string = ""

  private static allAds: { [s: number]: MobileAd } = {}
  private static idCounter = 0

  public readonly id: number

  protected readonly opts: T

  constructor(opts: T) {
    this.opts = opts

    this.id = opts.id ?? MobileAd.nextId()
    MobileAd.allAds[this.id] = this
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
