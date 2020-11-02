import * as React from 'react'

export interface BannerProps {}

let bannerTop: any
let banner: any

const Banner: React.FC<BannerProps> = () => {
  React.useEffect(() => {
    // @ts-ignore
    bannerTop = new admob.BannerAd({
      adUnitId: 'ca-app-pub-3940256099942544/6300978111',
    })
    // @ts-ignore
    banner = new admob.BannerAd({
      adUnitId: 'ca-app-pub-3940256099942544/2934735716',
    })
  }, [])

  return (
    <div>
      <button
        onClick={() => {
          bannerTop.show({ position: 'top' })
        }}
      >
        show top
      </button>
      <button
        onClick={() => {
          bannerTop.hide()
        }}
      >
        hide top
      </button>
      <button
        onClick={() => {
          banner.show({ position: 'bottom' })
        }}
      >
        show bottom
      </button>
      <button
        onClick={() => {
          banner.hide()
        }}
      >
        hide bottom
      </button>
    </div>
  )
}

export default Banner
