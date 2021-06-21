import { GenericAd, execAsync, NativeActions, MobileAdOptions } from './shared'

type ShowOptions = { x: number; y: number; width: number; height: number }

export default class NativeAd extends GenericAd<
  MobileAdOptions & { view?: string },
  ShowOptions
> {
  async hide() {
    return execAsync(NativeActions.adHide, [{ id: this.id }])
  }

  async show(opts: ShowOptions) {
    return super.show({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      ...opts,
    })
  }

  async showWith(elm: HTMLElement) {
    const update = async () => {
      const r = elm.getBoundingClientRect()
      await this.show({
        x: r.x,
        y: r.y,
        width: r.width,
        height: r.height,
      })
    }
    const observer = new MutationObserver(update)
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    })
    document.addEventListener('scroll', update)
    window.addEventListener('resize', update)
    await update()
  }
}
