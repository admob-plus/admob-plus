import { WebPlugin } from '@capacitor/core'
import { AdmobPlusPlugin } from './definitions'

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
}

const AdmobPlus = new AdmobPlusWeb()

export { AdmobPlus }
