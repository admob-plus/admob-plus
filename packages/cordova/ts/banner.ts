import {
  AdSizeType,
  execAsync,
  MobileAd,
  MobileAdOptions,
  NativeActions,
  Platforms,
} from './shared'

type Position = 'top' | 'bottom'

const canvasBanners: { id: number, this: BannerAd, element: HTMLCanvasElement, adViewImage: string, autoDestroy: boolean | undefined }[] = [];
var canvasSetInterval: NodeJS.Timeout | null = null;
var currentDrawInterval = 250;//500;
var preciseDrawInterval = false;

function loadImage(url) {
  return new Promise<HTMLImageElement>(r => { let i: HTMLImageElement = new Image(); i.onload = (() => r(i)); i.src = url; });
}

const getBoundingClientRects = {};

function getBoundingClientRect(canvas) {

  if(!getBoundingClientRects[canvas])
    getBoundingClientRects[canvas] = canvas.getBoundingClientRect();

  return getBoundingClientRects[canvas];

}

async function canvasClick(e) {

  let id = +e.target.dataset.bannerId;

  let x = 0;
  let y = 0;

  if(typeof e.offsetX !== 'undefined' && typeof e.offsetY !== 'undefined' && false) {
    x = e.offsetX;
    y = e.offsetY;
  } else {
    let rect = e.target.getBoundingClientRect();
    x = e.clientX - rect.x;
    y = e.clientY - rect.y;
  }

  let _canvas;

  for(let i = 0, len = canvasBanners.length; i < len; i++) {
    let canvas = canvasBanners[i];
    if(canvas.id == id) {
      _canvas = canvas;
      break;
    }
  }

  if(_canvas) {
    _canvas.this.simulateClickEvent({
      x: x,
      y: y,
    });
  }
}

async function updateCanvas() {

  const startTime = performance.now();

  const width = window.screen.width;
  const height = window.screen.height;

  for(let i = 0, len = canvasBanners.length; i < len; i++) {

    let canvas = canvasBanners[i];

    if(!canvas.element.isConnected && canvas.autoDestroy) { // The canvas element is no longer in the dom
      canvas.this.destroy();
      i--;
    } else {
      let rect = canvas.element.getBoundingClientRect();
      if(rect.width === 0 && rect.height === 0) { // The canvas is not current visible (display: none), hide adView
        canvas.this.hide();
      } else {
        canvas.this.show({
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
          canvas: null,
        });

        if((rect.y + rect.height > 0 && rect.y < height) && (rect.x + rect.width > 0 && rect.x < width)) { // Check if canvas is inside of screen
          let adViewImage = await canvas.this.getAdViewImage();
          if(adViewImage) {
            canvas.adViewImage = String(adViewImage);
            let dpr = window.devicePixelRatio || 1;
            canvas.element.width = rect.width * dpr;
            canvas.element.height = rect.height * dpr;
            let image: HTMLImageElement = await loadImage('data:image/jpeg;base64,'+adViewImage);
            let ctx = <CanvasRenderingContext2D> canvas.element.getContext('2d');
            ctx.drawImage(image, 0, 0, image.width, image.height);
          }
        }
      }
    }
  }

  const elapsed = performance.now() - startTime;

  canvasSetInterval = setTimeout(updateCanvas, preciseDrawInterval ? (elapsed < currentDrawInterval ? currentDrawInterval - elapsed : 0) : currentDrawInterval);
}

async function setCanvasInterval(drawInterval) {
  
  if(drawInterval) {
    currentDrawInterval = drawInterval;
  }

  if(canvasSetInterval === null) {
    canvasSetInterval = setTimeout(updateCanvas, currentDrawInterval);
  }
}

const colorToRGBA = (function () {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 1
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => undefined

  return function (
    col: string,
  ): { r: number; g: number; b: number; a: number } | undefined {
    ctx.clearRect(0, 0, 1, 1)
    // In order to detect invalid values,
    // we can't rely on col being in the same format as what fillStyle is computed as,
    // but we can ask it to implicitly compute a normalized value twice and compare.
    ctx.fillStyle = '#000'
    ctx.fillStyle = col
    const computed = ctx.fillStyle
    ctx.fillStyle = '#fff'
    ctx.fillStyle = col
    if (computed !== ctx.fillStyle) {
      return // invalid color
    }
    ctx.fillRect(0, 0, 1, 1)
    const { data } = ctx.getImageData(0, 0, 1, 1)
    return { r: data[0], g: data[1], b: data[2], a: data[3] }
  }
})()

export interface BannerAdOptions extends MobileAdOptions {
  position?: Position
  size?: AdSizeType
  offset?: number
  canvas?: HTMLCanvasElement
  canvasDrawInterval?: number
  adViewImage?: string
  autoDestroy?: boolean
  x?: number
  y?: number
  height?: number
  width?: number
}

export default class BannerAd extends MobileAd<BannerAdOptions> {
  private _loaded = false

  constructor(opts: BannerAdOptions) {
    super({
      position: 'bottom',
      size: AdSizeType.SMART_BANNER,
      ...opts,
      ...opts.canvas ? {
        x: getBoundingClientRect(opts.canvas).left,
        y: getBoundingClientRect(opts.canvas).right,
        width: opts.width ? opts.width : getBoundingClientRect(opts.canvas).width,
        height: opts.height ? opts.height : getBoundingClientRect(opts.canvas).height,
        offset: opts.offset ? opts.offset : 0,
      } : {},
    })

    if(opts.autoDestroy === undefined) {
      opts.autoDestroy = true;
    }
  }

  public static config(opts: {
    backgroundColor?: string
    marginTop?: number
    marginBottom?: number
    canvasDrawInterval?: number
    preciseDrawInterval?: boolean
  }) {
    if (cordova.platformId === Platforms.ios) {
      const { backgroundColor: bgColor } = opts
      return execAsync(NativeActions.bannerConfig, [
        { ...opts, backgroundColor: bgColor ? colorToRGBA(bgColor) : bgColor },
      ])
    }

    if(opts.canvasDrawInterval)
      setCanvasInterval(opts.canvasDrawInterval);

    if(opts.preciseDrawInterval !== undefined)
      preciseDrawInterval = opts.preciseDrawInterval;

    return false
  }

  public async load() {
    const result = await execAsync(NativeActions.bannerLoad, [
      { ...this.opts, id: this.id },
    ])
    this._loaded = true
    return result
  }

  public async show(opts = {}) {
    if (!this._loaded) {
      await this.load()
    }

    if(this.opts.canvas) {

      let isset = false;

      for(let i = 0, len = canvasBanners.length; i < len; i++) {
        let canvas = canvasBanners[i];

        if(canvas.id == this.id) {
          isset = true;
          break;
        }
      }

      if(!isset) {

        canvasBanners.push({
          id: this.id,
          this: this,
          element: this.opts.canvas,
          adViewImage: '',
          autoDestroy: this.opts.autoDestroy,
        });

        this.opts.canvas.dataset.bannerId = String(this.id);
        this.opts.canvas.addEventListener('click', canvasClick);

        setCanvasInterval(this.opts.canvasDrawInterval);
      }
    }

    return execAsync(NativeActions.bannerShow, [{ ...opts, id: this.id }])
  }

  public hide() {
    return execAsync(NativeActions.bannerHide, [{ id: this.id }])
  }

  public destroy() {

    for(let i = 0, len = canvasBanners.length; i < len; i++) {
      let canvas = canvasBanners[i];

      if(canvas.id == this.id) {
        canvasBanners.splice(i, 1);
        i--;
        len--;
      }
    }

    return execAsync(NativeActions.bannerDestroy, [{ id: this.id }])
  }

  public async getAdViewImage() {
    return execAsync(NativeActions.bannerGetAdViewImage, [{ id: this.id }])
  }

  public async simulateClickEvent(opts = {}) {
    return execAsync(NativeActions.bannerSimulateClickEvent, [{ ...opts, id: this.id }])
  }

  public async changeCanvas(newCanvas: HTMLCanvasElement) {

    if(this.opts.canvas) {

      if(this.opts.canvas.isConnected) {
        let ctx = <CanvasRenderingContext2D> this.opts.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.opts.canvas.width, this.opts.canvas.height);
      }

      this.opts.canvas = newCanvas;
      this.opts.canvas.addEventListener('click', canvasClick);

      let adViewImage;

      for(let i = 0, len = canvasBanners.length; i < len; i++) {
        let canvas = canvasBanners[i];

        if(canvas.id == this.id) {
          adViewImage = canvas.adViewImage;
          canvas.element = newCanvas;
          break;
        }
      }

      if(adViewImage) {
        let rect = newCanvas.getBoundingClientRect();
        let dpr = window.devicePixelRatio || 1;
        newCanvas.width = rect.width * dpr;
        newCanvas.height = rect.height * dpr;
        let image: HTMLImageElement = await loadImage('data:image/jpeg;base64,'+adViewImage);
        let ctx = <CanvasRenderingContext2D> newCanvas.getContext('2d');
        ctx.drawImage(image, 0, 0, image.width, image.height);
      }
    }

    return true;
  }
}
