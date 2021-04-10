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

    if (cordova.platformId === 'ios') {
      admob.requestTrackingAuthorization().then(console.log)
    }

    admob.start().catch(alert)

    this.initButton('show-banner-btn', this.showBannerAd)
    this.initButton('show-offset-banner-btn', this.showBannerAdOffset)
    this.initButton('show-top-banner-btn', this.showBannerAdTop)
    this.initButton('show-interstitial-btn', this.showInterstitialAd)
    this.initButton('show-rewarded-btn', this.showRewardedAd)
    this.initButton('show-rewardedi-btn', this.showRewardedInterstitialAd)
  },

  showBannerAd() {
    const banner = new admob.BannerAd({
      adUnitId: 'ca-app-pub-3940256099942544/6300978111',
    })
    return banner.show()
  },

  showBannerAdOffset() {
    const banner = new admob.BannerAd({
      adUnitId: 'ca-app-pub-3940256099942544/6300978111',
      offset: 0,
    })
    return banner.show()
  },

  showBannerAdTop() {
    const banner = new admob.BannerAd({
      adUnitId: 'ca-app-pub-3940256099942544/6300978111',
      position: 'top',
    })
    return banner.show()
  },

  showInterstitialAd() {
    const interstitial = new admob.InterstitialAd({
      adUnitId: 'ca-app-pub-3940256099942544/1033173712',
    })
    return interstitial.load().then(() => interstitial.show())
  },

  showRewardedAd() {
    const rewarded = new admob.RewardedAd({
      adUnitId: 'ca-app-pub-3940256099942544/5224354917',
    })
    return rewarded.load().then(() => rewarded.show())
  },

  showRewardedInterstitialAd() {
    const rewardedInterstitial = new admob.RewardedInterstitialAd({
      adUnitId: 'ca-app-pub-3940256099942544/6978759866',
    })
    return rewardedInterstitial.load().then(() => rewardedInterstitial.show())
  },

  receivedEvent(id) {
    const parentElement = document.getElementById(id)
    const listeningElement = parentElement.querySelector('.listening')
    const receivedElement = parentElement.querySelector('.received')

    listeningElement.setAttribute('style', 'display:none;')
    receivedElement.setAttribute('style', 'display:block;')

    console.log(`Received Event: ${id}`)
  },

  initButton(id, displayAd) {
    /**
     * @type {HTMLButtonElement}
     */
    const btn = document.getElementById(id)
    btn.addEventListener('click', function () {
      btn.disabled = true

      displayAd()
        .catch(alert)
        .then(function () {
          btn.disabled = false
        })
    })
  },
}

app.initialize()
