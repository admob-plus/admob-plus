import { WebPlugin } from '@capacitor/core'

import type { AdMobPlusPlugin } from './definitions'

export class AdMobPlusWeb extends WebPlugin implements AdMobPlusPlugin {
  async start(): Promise<void> {
    console.log('start')
  }
}
