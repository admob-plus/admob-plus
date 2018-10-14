'use strict'

const app = {
  initialize() {
    document.addEventListener(
      'deviceready',
      this.onDeviceReady.bind(this),
      false
    )
  },

  onDeviceReady() {
    this.receivedEvent('deviceready')

    this.showAds()
  },

  showAds() {
    admob.banner.show({ id: 'test' }).catch(console.log)
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
