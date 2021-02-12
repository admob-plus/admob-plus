import { WebPlugin } from '@capacitor/core'
import { AdmobPlusPlugin, IsLoadedResult, LoadAdOptions } from './definitions'

export class AdmobPlusWeb extends WebPlugin implements AdmobPlusPlugin {
  constructor() {
    super({
      name: 'AdmobPlus',
      platforms: ['web'],
    })
  }

  public async isFirebaseTestLabDevice(): Promise<{ value: boolean }> {
    return { value: false }
  }

  public interstitial_load(options: LoadAdOptions): Promise<void> {
    console.log('interstitial:load', options)
    return Promise.resolve()
  }

  // tslint:disable-next-line: variable-name
  public interstitial_isLoaded(_options: {
    id: number;
  }): Promise<IsLoadedResult> {
    return Promise.resolve({ isLoaded: false })
  }

  public interstitial_show(options: { id: number }): Promise<void> {
    console.log('interstitial:show', options)
    return Promise.resolve()
  }
}

const AdmobPlus = new AdmobPlusWeb()

export { AdmobPlus }
