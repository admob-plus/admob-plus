import { GenericAd } from './app-open'
import { execAsync, NativeActions } from './shared'

export default class NativeAd extends GenericAd<{
  x: number
  y: number
  width: number
  height: number
}> {
  public static readonly type = 'native'

  async hide() {
    return execAsync("adHide" as NativeActions, [
      { id: this.id },
    ])
  }
}
