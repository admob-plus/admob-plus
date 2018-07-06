import { exec } from 'cordova'

import Banner from './banner'
import { fireDocumentEvent, NativeActions } from './base'
import Interstitial from './interstitial'
import AdMobState from './state'

class AdMob {
  public banner: Banner
  public interstitial: Interstitial

  private state: AdMobState

  constructor() {
    const state = new AdMobState()
    this.state = state

    this.banner = new Banner(state)
    this.interstitial = new Interstitial(state)

    document.addEventListener(
      'deviceready',
      () => {
        this.ready()
      },
      false,
    )
  }

  public setDevMode(value) {
    this.state.devMode = value
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
      NativeActions.ready,
    )
  }
}

export default new AdMob()
