import { exec } from 'cordova'
import { IBannerRequest, AdSizeType } from '@admob-plus/core'

import Banner from './banner'
import { execAsync, fireDocumentEvent, NativeActions } from './base'
import Interstitial from './interstitial'
import RewardVideo from './reward-video'
import AdMobState from './state'

type MobileAdOptions = { adUnitId: string }

class MobileAd {
  private static allAds: { [s: number]: MobileAd } = {}

  private _id: number
  public adUnitId: string

  constructor({ adUnitId }: MobileAdOptions) {
    this.adUnitId = adUnitId

    this._id = 10001 + Object.keys(MobileAd.allAds).length
    MobileAd.allAds[this.id] = this
  }

  public get id() {
    return this._id
  }
}

class BannerAd extends MobileAd {
  constructor({ adUnitId }: MobileAdOptions) {
    super({ adUnitId })
  }

  public show(opts: IBannerRequest) {
    return execAsync(NativeActions.banner_show, [
      {
        position: 'bottom',
        size: AdSizeType.SMART_BANNER,
        ...opts,
        adUnitID: this.adUnitId,
        id: this.id,
      },
    ])
  }

  public hide() {
    return execAsync(NativeActions.banner_hide, [{ id: this.id }])
  }
}

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
