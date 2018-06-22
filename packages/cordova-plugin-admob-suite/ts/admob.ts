
import { exec } from 'cordova'

const enum NativeActions {
  Service = 'AdMob',
  ready = 'ready',
  interstitial_prepare = 'interstitial_prepare',
  interstitial_show = 'interstitial_show',
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

  public show() {
    return execAsync(NativeActions.interstitial_show)
  }
}

class AdMob {
  public interstitial = new Interstitial()

  constructor() {
    document.addEventListener(
      'deviceready',
      () => {
        this.ready().then(() => {
          this.interstitial.prepare()
        })
      },
      false
    )
  }

  private ready() {
    return execAsync(NativeActions.ready)
  }
}

export = new AdMob()
