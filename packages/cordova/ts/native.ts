import { GenericAd } from './app-open'
import { Events, fireDocumentEvent, MobileAd, MobileAdOptions } from './shared'

export class ManagedNativeAd extends GenericAd {
}

export default class NativeAd extends GenericAd {
  public static readonly type = 'native'

  public readonly ads: ManagedNativeAd[] = []

  constructor(opts: MobileAdOptions) {
    super({ ...opts, type: NativeAd.type })

    document.addEventListener(
      Events.adLoad,
      (evt: any) => {
        if (evt.ad instanceof NativeAd) {
          const managedAd = new ManagedNativeAd({
            id: evt.nativeAdId,
            adUnitId: this.adUnitId,
            type: 'native-managed',
            _noinit: true,
          })
          fireDocumentEvent(Events.adLoad, {
            adId: managedAd.id,
            ad: managedAd,
            managerAd: this,
          } as any)

          this.ads.push(managedAd)
        }
      },
      false,
    )
  }

  async show() {
    const results = await Promise.all(this.ads.map((ad) => ad.show()))
    return results.every((x) => x)
  }
}
