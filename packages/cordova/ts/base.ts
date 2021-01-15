import { exec } from 'cordova'
import { AdSizeType, Events, NativeActions } from './generated'

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

export { AdSizeType, Events, NativeActions }

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

export function execAsync(action: NativeActions, args?: any[]) {
  return new Promise((resolve, reject) => {
    exec(resolve, reject, NativeActions.Service, action, args)
  })
}

export function fireDocumentEvent(eventName: string, data = null) {
  const event = new CustomEvent(eventName, { detail: data })
  document.dispatchEvent(event)
}

export function waitEvent(
  successEvent: string,
  failEvent = '',
): Promise<CustomEvent> {
  return new Promise((resolve, reject) => {
    document.addEventListener(
      successEvent as any,
      (event: CustomEvent) => {
        resolve(event)
      },
      false,
    )

    if (failEvent) {
      document.addEventListener(
        failEvent as any,
        (failedEvent: CustomEvent) => {
          reject(failedEvent)
        },
        false,
      )
    }
  })
}
