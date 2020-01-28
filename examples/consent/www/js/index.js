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
    // NOTE: update the following to make it works
    const testDeviceId = '33BE2250B43518CCDA7DE426D04EE231'
    this.showConsent(testDeviceId)
      .then(async ({ consentStatus }) => {
        console.log('consentStatus', consentStatus)
        if (consentStatus === 'PERSONALIZED') {
          await admob.banner.show({
            id: 'test',
            testDevices: [testDeviceId],
          })
        } else {
          await admob.banner.show({
            id: 'test',
            testDevices: [testDeviceId],
            npa: '1',
          })
        }
      })
      .catch(console.error)
  },
  async showConsent(testDeviceId) {
    const publisherIds = ['pub-3940256099942544']

    await consent.addTestDevice(testDeviceId)
    await consent.setDebugGeography('EEA')
    console.log(await consent.checkConsent(publisherIds))

    const ok = await consent.isRequestLocationInEeaOrUnknown()
    if (!ok) {
      alert('please update testDeviceId from logcat')
    }

    const form = new consent.Form({
      privacyUrl: 'https://policies.google.com/privacy',
      adFree: true,
      nonPersonalizedAds: true,
      personalizedAds: true,
    })
    await form.load()
    const result = await form.show()
    return result
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
