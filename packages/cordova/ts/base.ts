import { exec } from 'cordova'

import { AdUnitIDOption, Events, NativeActions } from '@admob-plus/core'

import AdMobState from './state'

export { AdUnitIDOption, Events, NativeActions }

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
  protected testIdForAndroid
  protected testIdForIOS

  constructor(state: AdMobState) {
    this.state = state
  }

  protected get testAdUnitID(): string {
    switch (this.state.platform) {
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
    return adUnitID[this.state.platform]
  }
}
