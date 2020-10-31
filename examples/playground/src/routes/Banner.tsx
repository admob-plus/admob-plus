import * as React from 'react'

export interface BannerProps {}

const Banner: React.FC<BannerProps> = () => {
  React.useEffect(() => {
    // @ts-ignore
    const bannerTop = new admob.BannerAd({
      adUnitId: 'ca-app-pub-3940256099942544/6300978111',
    })
    bannerTop.show({ position: 'top' })
    // @ts-ignore
    const banner = new admob.BannerAd({
      adUnitId: 'ca-app-pub-3940256099942544/2934735716',
    })
    banner.show({ position: 'bottom' })
  }, [])

  return <p>BannerAd</p>
}

export default Banner
