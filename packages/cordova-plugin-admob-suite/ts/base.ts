import { exec } from 'cordova'

import { Events, NativeActions } from './constants'
import AdMobState from './state'

export { Events, NativeActions }

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

export function waitEvent(successEvent, failEvent = '') {
  return new Promise((resolve, reject) => {
    document.addEventListener(
      successEvent,
      event => {
        resolve(event)
      },
      false,
    )

    if (failEvent) {
      document.addEventListener(
        failEvent,
        failedEvent => {
          reject(failedEvent)
        },
        false,
      )
    }
  })
}

export type AdUnitIDOption =
  | string
  | {
      android: string;
      ios: string;
    }

export class AdBase {
  protected state: AdMobState
  protected testAdUnitID

  constructor(state: AdMobState) {
    this.state = state
  }

  protected resolveAdUnitID(adUnitID?: AdUnitIDOption): string {
    if (adUnitID === 'test' || this.state.devMode) {
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
