import { execAsync, MobileAd, NativeActions, MobileAdOptions } from './shared'

export default class AppOpenAd extends MobileAd {
  constructor(opts: MobileAdOptions) {
    super(opts)

    execAsync(NativeActions.createAd, [
      { ...opts, id: this.id, type: 'app-open' },
    ]).then(async () => {
      document.addEventListener(
        'resume',
        () => {
          this.showOrLoad()
        },
        false,
      )

      await this.showOrLoad()
    })
  }

  async showOrLoad() {
    await execAsync(NativeActions.appOpenTryToPresent, [{ id: this.id }])
  }
}
