import { exec } from 'cordova'

const enum NativeActions {
  Service = 'AdMob',
  ready = 'ready',
  interstitial_prepare = 'interstitial_prepare',
  interstitial_show = 'interstitial_show',
}

const enum Events {
  ready = 'admob.ready',
  interstitial_load = 'admob.interstitial.load',
  interstitial_load_fail = 'admob.interstitial.load_fail',
  interstitial_open = 'admob.interstitial.open',
  interstitial_close = 'admob.interstitial.close',
  interstitial_exit_app = 'admob.interstitial.exit_app',
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
        this.ready()
      },
      false
    )
  }

  private ready() {
    exec(
      (event) => {
        alert(event.type)
        switch (event.type) {
          case Events.ready:
            this.interstitial.prepare()
          case Events.interstitial_load:
            this.interstitial.show()
        }
      },
      (err) => {
        alert(err)
      },
      NativeActions.Service,
      NativeActions.ready
    )
  }
}

export = new AdMob()
