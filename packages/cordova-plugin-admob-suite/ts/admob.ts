
import { exec } from 'cordova'

const enum NativeActions {
  Service = 'AdMob',
  ready = 'ready',
  interstitial_prepare = 'interstitial_prepare',
}

function execAsync(action: NativeActions, args?: string[]) {
  return new Promise((resolve, reject) => {
    exec(resolve, reject, NativeActions.Service, action, args)
  })
}

class Interstitial {
  public prepare() {
    return execAsync(NativeActions.interstitial_prepare)
  }
}

class AdMob {
  public interstitial = new Interstitial()

  public ready() {
    return execAsync(NativeActions.ready)
  }
}

export = new AdMob()
