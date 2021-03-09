export { AdSizeType, Events } from './generated'

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

export enum ChildDirectedTreatmentTag {
  FALSE = 0,
  TRUE = 1,
  UNSPECIFIED = -1,
}

export enum UnderAgeOfConsentTag {
  FALSE = 0,
  TRUE = 1,
  UNSPECIFIED = -1,
}

export type RequestConfig = {
  maxAdContentRating?: MaxAdContentRating
  tagForChildDirectedTreatment?: ChildDirectedTreatmentTag
  tagForUnderAgeOfConsent?: UnderAgeOfConsentTag
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
