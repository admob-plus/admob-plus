import { WebPlugin } from '@capacitor/core'
import { AdmobPlusPluginPlugin } from './definitions'

export class AdmobPlusPluginWeb extends WebPlugin
  implements AdmobPlusPluginPlugin {
  constructor() {
    super({
      name: 'AdmobPlusPlugin',
      platforms: ['web'],
    })
  }

  public async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options)
    return options
  }
}

const AdmobPlusPlugin = new AdmobPlusPluginWeb()

export { AdmobPlusPlugin }
