import { exec } from 'cordova'
import { IBannerRequest, AdSizeType } from '@admob-plus/core'

import Banner from './banner'
import { execAsync, fireDocumentEvent, NativeActions } from './base'
import Interstitial from './interstitial'
import RewardVideo from './reward-video'
import AdMobState from './state'
import { BannerAd } from './banner'

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

  public get BannerAd() {
    return BannerAd
  }

  public setAppMuted(value: boolean) {
    return execAsync(NativeActions.set_app_muted, [value])
  }

  public setAppVolume(value: number) {
    return execAsync(NativeActions.set_app_volume, [value])
  }

  public setDevMode(value: boolean) {
    this.state.devMode = value
  }

  private ready() {
    exec(
      (event) => {
        this.state.applicationId = event.data.applicationId
        fireDocumentEvent(event.type, event.data)
      },
      (err) => {
        alert(err)
      },
      NativeActions.Service,
      NativeActions.ready,
    )
  }
}

const admob = new AdMob()
export default admob
