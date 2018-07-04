import { exec } from 'cordova'

export const enum NativeActions {
  Service = 'AdMob',
  ready = 'ready',
  banner_show = 'banner_show',
  interstitial_prepare = 'interstitial_prepare',
  interstitial_show = 'interstitial_show'
}

export const enum Events {
  ready = 'admob.ready',
  interstitial_load = 'admob.interstitial.load',
  interstitial_load_fail = 'admob.interstitial.load_fail',
  interstitial_open = 'admob.interstitial.open',
  interstitial_close = 'admob.interstitial.close',
  interstitial_exit_app = 'admob.interstitial.exit_app'
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
