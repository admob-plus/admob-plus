import { WebPlugin } from '@capacitor/core'
import { AdmobPlusPlugin, LoadAdOptions } from './definitions'

export class AdmobPlusWeb extends WebPlugin implements AdmobPlusPlugin {
  constructor() {
    super({
      name: 'AdmobPlus',
      platforms: ['web'],
    })
  }

  public async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options)
    return options
  }

  public interstitial_load(options: LoadAdOptions): Promise<void> {
    console.log('interstitial:load', options)
    return Promise.resolve()
  }

  public interstitial_show(options: { id: number }): Promise<void> {
    console.log('interstitial:show', options)
    return Promise.resolve()
  }
}

const AdmobPlus = new AdmobPlusWeb()

export { AdmobPlus }
