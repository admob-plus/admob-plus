import { GenericAd } from './app-open'
import {
  Events, fireDocumentEvent, MobileAd, MobileAdOptions
} from './shared'

export class ManagedNativeAd extends MobileAd {}

export default class NativeAd extends GenericAd {
  constructor(opts: MobileAdOptions) {
    super({ ...opts, type: 'native' })

    document.addEventListener(
      Events.adLoad,
      (evt: any) => {
        if (evt.ad instanceof NativeAd) {
          const managedAd = new ManagedNativeAd({
            id: evt.nativeAdId,
            adUnitId: this.adUnitId,
          })
          fireDocumentEvent(Events.adLoad, {
            adId: managedAd.id,
            ad: managedAd,
            managerAd: this,
          } as any)
        }
      },
      false,
    )
  }

  async show() {
    throw new Error("Not implemented")
    return false
  }
}
