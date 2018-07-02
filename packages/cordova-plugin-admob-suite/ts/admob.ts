import cordova, { exec } from 'cordova'

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
        alert(event.type)
        switch (event.type) {
          case Events.ready:
            this.interstitial.prepare()
          case Events.interstitial_load:
            this.interstitial.show()
        }
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
