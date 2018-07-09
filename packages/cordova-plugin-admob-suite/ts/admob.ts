import { exec } from 'cordova'

import Banner from './banner'
import { fireDocumentEvent, NativeActions } from './base'
import Interstitial from './interstitial'
import RewardVideo from './reward-video'
import AdMobState from './state'

class AdMob {
  public banner: Banner
  public interstitial: Interstitial
  public rewardVideo: RewardVideo

  private state: AdMobState

  constructor() {
    const state = new AdMobState()
    this.state = state

    this.banner = new Banner(state)
    this.interstitial = new Interstitial(state)
    this.rewardVideo = new RewardVideo(state)

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
