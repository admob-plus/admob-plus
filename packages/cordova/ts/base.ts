import { AdUnitIDOption, Events } from '@admob-plus/core'
import { exec } from 'cordova'
import { NativeActions } from './generated'
import AdMobState from './state'

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

export { AdUnitIDOption, Events, NativeActions }

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

export const enum TestIds {
  dummy = 'test',
  banner_android = 'ca-app-pub-3940256099942544/6300978111',
  interstitial_android = 'ca-app-pub-3940256099942544/1033173712',
  reward_video_android = 'ca-app-pub-3940256099942544/5224354917',
  banner_ios = 'ca-app-pub-3940256099942544/2934735716',
  interstitial_ios = 'ca-app-pub-3940256099942544/4411468910',
  reward_video_ios = 'ca-app-pub-3940256099942544/1712485313',
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

export class AdBase {
  protected state: AdMobState
  protected testIdForAndroid!: string
  protected testIdForIOS!: string

  constructor(state: AdMobState) {
    this.state = state
  }

  protected get testAdUnitID(): string {
    switch (cordova.platformId) {
      case Platforms.android:
        return this.testIdForAndroid
      case Platforms.ios:
        return this.testIdForIOS
      default:
        return TestIds.dummy
    }
  }

  protected resolveAdUnitID(adUnitID?: AdUnitIDOption): string {
    if (adUnitID === TestIds.dummy || this.state.devMode) {
      return this.testAdUnitID
    }
    if (!adUnitID) {
      throw new Error('adUnitID is missing')
    }
    if (typeof adUnitID === 'string') {
      return adUnitID
    }
    switch (cordova.platformId) {
      case Platforms.android:
      case Platforms.ios:
        return adUnitID[cordova.platformId]
      default:
        return TestIds.dummy
    }
  }
}
