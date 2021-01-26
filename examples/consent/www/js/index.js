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
    if (cordova.platformId === 'ios') {
      console.log("requestTrackingAuthorization", await consent.requestTrackingAuthorization())
    }

    try {
      console.log("requestInfoUpdate", await consent.requestInfoUpdate())
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
