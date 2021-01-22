export { AdSizeType, Events } from './generated'

export type MobileAdOptions = { adUnitId: string }

export class MobileAd {
  private static allAds: { [s: number]: MobileAd } = {}

  public readonly adUnitId: string
  public readonly id: number

  constructor({ adUnitId }: MobileAdOptions) {
    this.adUnitId = adUnitId

    this.id = 10001 + Object.keys(MobileAd.allAds).length
    MobileAd.allAds[this.id] = this
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
