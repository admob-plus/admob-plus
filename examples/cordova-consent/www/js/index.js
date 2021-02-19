'use strict'

const app = {
  initialize() {
    document.addEventListener(
      'deviceready',
      this.onDeviceReady.bind(this),
      false,
    )
  },
  async onDeviceReady() {
    this.receivedEvent('deviceready')

    const consentStatus = await consent.getConsentStatus()
    console.log('consentStatus:', consentStatus)
    if (consentStatus === consent.ConsentStatus.Required) {
      if (cordova.platformId === 'ios') {
        await consent.requestTrackingAuthorization()
      }
      await consent.requestInfoUpdate()

      if ((await consent.getFormStatus()) === consent.FormStatus.Available) {
        const form = await consent.loadForm()
        form.show()
      }

      if (
        [
          consent.ConsentStatus.NotRequired,
          consent.ConsentStatus.Obtained,
        ].includes(await consent.getConsentStatus())
      ) {
        await admob.start()

        const interstitial = new admob.InterstitialAd({
          adUnitId: 'ca-app-pub-3940256099942544/1033173712',
        })
        await interstitial.load()
        await interstitial.show()
      }
    }
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
