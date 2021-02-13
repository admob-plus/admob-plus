import { WebPlugin } from '@capacitor/core'

import type { AdmobPlusPlugin } from './definitions'

export class AdmobPlusWeb extends WebPlugin implements AdmobPlusPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options)
    return options
  }
}
