import { exec } from 'cordova'

import Banner from './banner'
import { fireDocumentEvent, NativeActions } from './base'
import Interstitial from './interstitial'

class AdMob {
  public banner = new Banner()

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
