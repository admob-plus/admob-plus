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

    console.log('isFormAvailable:', await consent.isFormAvailable())
    try {
      await consent.requestInfoUpdate()
    } catch (error) {
      alert(`requestInfoUpdate error: ${error}`)
      return
    }
    console.log(
      'isFormAvailable after update:',
      await consent.isFormAvailable(),
    )
    try {
      const form = await consent.loadForm()
      form.show()
    } catch (error) {
      alert(`form error: ${error}`)
    }
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
