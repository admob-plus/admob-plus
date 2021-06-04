import { GenericAd } from './app-open'
import { execAsync, NativeActions } from './shared'

export default class NativeAd extends GenericAd<{
  x: number
  y: number
  width: number
  height: number
}> {
  async hide() {
    return execAsync(NativeActions.adHide, [{ id: this.id }])
  }
}
