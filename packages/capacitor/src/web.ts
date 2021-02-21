import { WebPlugin } from '@capacitor/core'
import type { AdMobPlusPlugin } from './definitions'

export class AdMobPlusWeb extends WebPlugin implements AdMobPlusPlugin {
  async start(): Promise<void> {
    console.log('start')
  }

  async bannerShow(opts: { id: number; adUnitId: string }): Promise<void> {
    console.log('bannerShow', opts)
  }

  async bannerHide(opts: { id: number }): Promise<void> {
    console.log('bannerHide', opts)
  }

  async interstitialLoad(opts: {
    id: number
    adUnitId: string
  }): Promise<void> {
    console.log('interstitialLoad', opts)
  }

  async interstitialShow(opts: { id: number }): Promise<void> {
    console.log('interstitialShow', opts)
  }

  async rewardedLoad(opts: { id: number; adUnitId: string }): Promise<void> {
    console.log('rewardedLoad', opts)
  }

  async rewardedShow(opts: { id: number }): Promise<void> {
    console.log('rewardedShow', opts)
  }
}
