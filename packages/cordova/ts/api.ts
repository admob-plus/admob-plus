export { AdSizeType, Events, NativeActions } from './generated'

/** @internal */
export type MobileAdOptions = { adUnitId: string }

/** @internal */
export class MobileAd {
  private static allAds: { [s: number]: MobileAd } = {}
  private static idCounter = 0

  public readonly adUnitId: string
  public readonly id: number

  constructor({ adUnitId }: MobileAdOptions) {
    this.adUnitId = adUnitId

    this.id = MobileAd.nextId()
    MobileAd.allAds[this.id] = this
  }

  private static nextId() {
    MobileAd.idCounter += 1
    return MobileAd.idCounter
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
