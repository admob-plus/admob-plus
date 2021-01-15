import { exec } from 'cordova'
import BannerAd from './banner'
import {
  execAsync,
  fireDocumentEvent,
  NativeActions,
  RequestConfig,
} from './base'
import InterstitialAd from './interstitial'
import RewardVideo from './reward-video'
import AdMobState from './state'

class AdMob {
  public readonly BannerAd = BannerAd
  public readonly InterstitialAd = InterstitialAd

  public rewardVideo: RewardVideo

  private state: AdMobState

  constructor() {
    const state = new AdMobState()
    this.state = state

    this.rewardVideo = new RewardVideo(state)

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
