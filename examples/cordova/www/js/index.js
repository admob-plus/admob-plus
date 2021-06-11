'use strict'

const app = {
  initialize() {
    document.addEventListener(
      'deviceready',
      this.onDeviceReady.bind(this),
      false,
    )

    document.addEventListener(
      'admob.ad.load',
      (evt) => {
        const { ad } = evt
        console.log('admob.ad.load', ad.id, ad instanceof admob.AppOpenAd)
      },
      false,
    )
    document.addEventListener(
      'admob.ad.dismiss',
      (evt) => {
        console.log('admob.ad.dismiss', evt.ad.id)
      },
      false,
    )
    document.addEventListener(
      'admob.ad.show',
      (evt) => {
        console.log('admob.ad.show', Object.keys(evt))
      },
      false,
    )
    document.addEventListener(
      'admob.interstitial.dismiss',
      (evt) => {
        console.log('admob.interstitial.dismiss', Object.keys(evt))
      },
      false,
    )
  },

  onDeviceReady() {
    this.receivedEvent('deviceready')

    if (cordova.platformId === 'ios') {
      admob.requestTrackingAuthorization().then(console.log)
    }

    admob
      .start()
      .then(() => this.initAppOpenAd())
      .then(() =>
        admob.BannerAd.config({
          backgroundColor: '#A7A7A7',
          marginTop: 10,
          marginBottom: 10,
        }),
      )
      .catch(alert)

    this.initButton('show-banner-btn', this.showBannerAd)
    this.initButton('show-offset-banner-btn', this.showBannerAdOffset)
    this.initButton('show-top-banner-btn', this.showBannerAdTop)
    this.initButton('show-interstitial-btn', this.showInterstitialAd)
    this.initButton('show-rewarded-btn', this.showRewardedAd)
    this.initButton('show-rewardedi-btn', this.showRewardedInterstitialAd)
    this.initButton('show-native-btn', this.showNativeAd)
  },

  initAppOpenAd() {
    const ad = new admob.AppOpenAd({
      adUnitId: 'ca-app-pub-3940256099942544/5662855259',
      orientation: admob.AppOpenAd.Orientation.Portrait,
      // orientation: admob.AppOpenAd.Orientation.LandscapeLeft,
    })

    document.addEventListener(
      'resume',
      () => {
        ad.isLoaded().then((loaded) => (loaded ? ad.show() : ad.load()))
      },
      false,
    )
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

  showNativeAd() {
    const ad = new admob.NativeAd({
      adUnitId: 'ca-app-pub-3940256099942544/3986624511',
    })

    return ad
      .load()
      .then(() =>
        ad.show({
          x: 0,
          y: 30,
          width: window.screen.width,
          height: 300,
        }),
      )
      .then(
        () =>
          new Promise((resolve) =>
            setTimeout(() => {
              ad.hide()
              resolve()
            }, 5000),
          ),
      )
      .then(() => ad.showWith(document.getElementById('native-ad')))
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
