
import { exec } from 'cordova'

const enum NativeActions {
  Service = 'AdMob',
  show = 'show'
}

function execAsync(action: NativeActions, args?: string[]) {
  return new Promise((resolve, reject) => {
    exec(resolve, reject, NativeActions.Service, action, args)
  })
}

class AdMob {
}

export = new AdMob()
