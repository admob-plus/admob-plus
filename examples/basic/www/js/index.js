'use strict'

const app = {
  initialize() {
    document.addEventListener(
      'deviceready',
      this.onDeviceReady.bind(this),
      false,
    )
  },

  onDeviceReady() {
    this.receivedEvent('deviceready')

    this.showAds()
    this.checkIsLoaded()
  },

  checkIsLoaded() {
    return admob.interstitial.isLoaded().then(result => {
      console.log(result)
      return result
    })
  },

  showAds() {
    const bannerTop = new admob.BannerAd({
      adUnitId: 'ca-app-pub-3940256099942544/6300978111',
    })
    bannerTop.show({ position: 'top' })
    const banner = new admob.BannerAd({
      adUnitId: 'ca-app-pub-3940256099942544/2934735716',
    })
    banner.show({ position: 'bottom' })
  },

  showAdsOld() {
    admob.banner.show({ id: 'test', npa: '1' }).catch(console.log)
    admob.interstitial
      .load({ id: 'test' })
      .then(() => admob.interstitial.show())
      .catch(console.log)
    admob.rewardVideo
      .load({ id: 'test' })
      .then(() => admob.rewardVideo.show())
      .catch(console.log)
  },

  receivedEvent(id) {
    const parentElement = document.getElementById(id)
    const listeningElement = parentElement.querySelector('.listening')
    const receivedElement = parentElement.querySelector('.received')

    listeningElement.setAttribute('style', 'display:none;')
    receivedElement.setAttribute('style', 'display:block;')

    console.log(`Received Event: ${id}`)
  },
}

app.initialize()
