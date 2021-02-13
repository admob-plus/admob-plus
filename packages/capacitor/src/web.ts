import { WebPlugin } from '@capacitor/core'

import type { AdmobPlusPlugin } from './definitions'

export class AdmobPlusWeb extends WebPlugin implements AdmobPlusPlugin {
  async start(): Promise<void> {
    console.log('start')
  }
}
