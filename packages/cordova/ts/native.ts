import { GenericAd } from './app-open'
import { execAsync, NativeActions, MobileAdOptions } from './shared'

export default class NativeAd extends GenericAd<
  MobileAdOptions & { view?: string },
  { x: number; y: number; width: number; height: number }
> {
  async hide() {
    return execAsync(NativeActions.adHide, [{ id: this.id }])
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
