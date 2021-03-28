'use strict'

const initConsentStatus = async () => {
  /**
   * @type {HTMLButtonElement}
   */
  const btn = document.getElementById('consent-status-btn')
  btn.addEventListener('click', async () => {
    btn.disabled = true
    try {
      btn.innerHTML = `${await consent.getConsentStatus()}`
    } catch (err) {
      alert(`getConsentStatus() error: ${err}`)
    } finally {
      btn.disabled = false
    }
  })
  btn.click()
}

const initRequestTrackingAuthorization = async () => {
  /**
   * @type {HTMLButtonElement}
   */
  const btn = document.getElementById('request-btn')
  btn.addEventListener('click', async () => {
    try {
      btn.innerHTML = `${await admob.requestTrackingAuthorization()}`
    } catch (err) {
      alert(`requestTrackingAuthorization() error: ${err}`)
    } finally {
      btn.disabled = false
    }
  })
}
const initRequestInfoUpdate = async () => {
  /**
   * @type {HTMLButtonElement}
   */
  const btn = document.getElementById('request-info-btn')
  btn.addEventListener('click', async () => {
    try {
      btn.innerHTML = `${await consent.requestInfoUpdate({
        debugGeography: consent.DebugGeography.EEA,
        // NOTE put your test device id herer
        testDeviceIds: ["TEST-DEVICE-HASHED-ID"],
      })}`
    } catch (err) {
      alert(`requestInfoUpdate() error: ${err}`)
    } finally {
      btn.disabled = false
    }
  })
}

const initFormStatus = async () => {
  /**
   * @type {HTMLButtonElement}
   */
  const btn = document.getElementById('form-status-btn')
  btn.addEventListener('click', async () => {
    btn.disabled = true
    try {
      btn.innerHTML = `${await consent.getFormStatus()}`
    } catch (err) {
      alert(`getFormStatus() error: ${err}`)
    } finally {
      btn.disabled = false
    }
  })
  btn.click()
}

const initFormButtons = async () => {
  let form

  const btnShow = document.getElementById('show-form-btn')
  btnShow.addEventListener('click', async () => {
    try {
      btnShow.innerHTML = `${await form.show()}`
    } catch (err) {
      alert(`form.show() error: ${err}`)
    }
  })
  btnShow.disabled = !form

  /**
   * @type {HTMLButtonElement}
   */
  const btn = document.getElementById('load-form-btn')
  btn.addEventListener('click', async () => {
    btn.disabled = true
    try {
      form = await consent.loadForm()
      btn.innerHTML = `${form.id}`
    } catch (err) {
      alert(`loadForm() error: ${err}`)
    } finally {
      btn.disabled = false
      btnShow.disabled = !form
    }
  })
}

const app = {
  initialize() {
    document.addEventListener(
      'deviceready',
      this.onDeviceReady.bind(this),
      false,
    )
  },
  async onDeviceReady() {
    await initConsentStatus()
    await initRequestTrackingAuthorization()
    await initRequestInfoUpdate()
    await initFormStatus()
    await initFormButtons()

    this.receivedEvent('deviceready')
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
