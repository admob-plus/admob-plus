
import { exec } from 'cordova'

const enum NativeActions {
  Service = 'AdMob',
  ready = 'ready'
}

function execAsync(action: NativeActions, args?: string[]) {
  return new Promise((resolve, reject) => {
    exec(resolve, reject, NativeActions.Service, action, args)
  })
}

class AdMob {
  public ready() {
    return execAsync(NativeActions.ready)
  }
}

export = new AdMob()
