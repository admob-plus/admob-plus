import {
  execAsync,
  Events,
  MobileAd,
  NativeActions,
  MobileAdOptions,
  fireDocumentEvent,
} from './shared'

export class ManagedNativeAd extends MobileAd {}

export default class NativeAd extends MobileAd {
  _init: Promise<void> | null

  constructor(opts: MobileAdOptions) {
    super(opts)

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

    this._init = execAsync(NativeActions.adCreate, [
      { ...opts, id: this.id, type: 'native' },
    ]).then(() => {
      this._init = null
    })
  }

  async load() {
    if (this._init !== null) await this._init
    await execAsync('nativeLoad' as NativeActions, [{ id: this.id }])
  }
}
