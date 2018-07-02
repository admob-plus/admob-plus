import { exec } from 'cordova'

import { Events, fireDocumentEvent, NativeActions } from './base'
import Interstitial from './interstitial'

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
      event => {
        fireDocumentEvent(event.type)
      },
      err => {
        alert(err)
      },
      NativeActions.Service,
      NativeActions.ready
    )
  }
}

export default new AdMob()
