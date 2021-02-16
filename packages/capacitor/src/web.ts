import { WebPlugin } from '@capacitor/core'

import type { AdMobPlusPlugin } from './definitions'

export class AdMobPlusWeb extends WebPlugin implements AdMobPlusPlugin {
  async start(): Promise<void> {
    console.log('start')
  }

  async interstitialLoad(opts: {
    id: number
    adUnitID: string
  }): Promise<void> {
    console.log('interstitialLoad', opts)
  }

  async interstitialShow(opts: { id: number }): Promise<void> {
    console.log('interstitialShow', opts)
  }
}
