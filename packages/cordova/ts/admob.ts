import { exec } from 'cordova'
import BannerAd from './banner'
import {
  execAsync,
  fireDocumentEvent,
  NativeActions,
  RequestConfig
} from './base'
import InterstitialAd from './interstitial'
import RewardedAd from './rewarded'
import AdMobState from './state'

class AdMob {
  public readonly BannerAd = BannerAd
  public readonly InterstitialAd = InterstitialAd
  public readonly RewardedAd = RewardedAd

  private state: AdMobState

  constructor() {
    const state = new AdMobState()
    this.state = state

    document.addEventListener(
      'deviceready',
      () => {
        this.ready()
      },
      false,
    )
  }

  public configRequest(requestConfig: RequestConfig) {
    return execAsync(NativeActions.configRequest, [requestConfig])
  }

  public setAppMuted(value: boolean) {
    return execAsync(NativeActions.setAppMuted, [value])
  }

  public setAppVolume(value: number) {
    return execAsync(NativeActions.setAppVolume, [value])
  }

  public setDevMode(value: boolean) {
    this.state.devMode = value
  }

  private ready() {
    exec(
      (event) => {
        fireDocumentEvent(event.type, event.data)
      },
      console.error,
      NativeActions.Service,
      NativeActions.ready,
    )
  }
}

const admob = new AdMob()
export default admob
