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
    this.showConsent().catch(console.error)
  },
  async showConsent() {
    // NOTE: update the following to make it works
    const testDeviceId = '33BE2250B43518CCDA7DE426D04EE231'
    const publisherIds = ['pub-0123456789012345']

    await consent.addTestDevice(testDeviceId)
    await consent.setDebugGeography('EEA')
    console.log(await consent.checkConsent(publisherIds))

    const ok = await consent.isRequestLocationInEeaOrUnknown()
    if (!ok) {
      alert('please update testDeviceId and publisherIds')
    }

    const form = new consent.Form({
      privacyUrl: 'https://policies.google.com/privacy',
      adFree: true,
      nonPersonalizedAds: true,
      personalizedAds: true,
    })
    await form.load()
    await form.show()
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
