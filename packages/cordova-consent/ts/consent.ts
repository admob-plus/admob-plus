/// <reference path="../../../index.d.ts" />
import { exec, fireDocumentEvent } from 'cordova'

type ConsentStatus = 'PERSONALIZED' | 'NON_PERSONALIZED' | 'UNKNOWN'

const state = {
  nextFormId: 0,
  forms: new Map<number, ConsentForm>(),
}

const execAsync = (action: string, args?: any[]) => {
  return new Promise((resolve, reject) => {
    exec(resolve, reject, 'Consent', action, args)
  })
}

const waitEvent = (
  successEvent: string,
  failEvent = '',
): Promise<CustomEvent> => {
  return new Promise((resolve, reject) => {
    document.addEventListener(
      successEvent as any,
      (event: CustomEvent) => {
        resolve(event)
      },
      false,
    )

    if (failEvent) {
      document.addEventListener(
        failEvent as any,
        (failedEvent: CustomEvent) => {
          reject(failedEvent)
        },
        false,
      )
    }
  })
}

interface ConsentFormOptions {
  privacyUrl: string
  adFree?: boolean
  nonPersonalizedAds?: boolean
  personalizedAds?: boolean
}

class ConsentForm {
  private id: number
  private opts: ConsentFormOptions

  constructor(opts: ConsentFormOptions) {
    this.id = state.nextFormId
    state.forms.set(this.id, this)
    state.nextFormId += 1

    this.opts = opts
  }

  async load() {
    await execAsync('loadConsentForm', [
      {
        id: this.id,
        privacyUrl: this.opts.privacyUrl,
        adFree: this.opts.adFree,
        nonPersonalizedAds: this.opts.nonPersonalizedAds,
        personalizedAds: this.opts.personalizedAds,
      },
    ])
    await waitEvent('consent.form.loaded', 'consent.form.error')
  }

  async show() {
    await execAsync('showConsentForm', [{ id: this.id }])
    const result = await waitEvent('consent.form.closed', 'consent.form.error')
    return (result as any) as {
      consentStatus: ConsentStatus;
      userPrefersAdFree: boolean;
    }
  }


}

document.addEventListener(
  'deviceready',
  () => {
    exec(
      event => {
        fireDocumentEvent(event.type, event.data)
      },
      err => {
        console.log(err)
      },
      'Consent',
      'ready',
    )
  },
  false,
)

export default {
  Form: ConsentForm,
  async checkConsent(publisherIds: string[]) {
    const result = await execAsync('checkConsent', [publisherIds])
    return result as ConsentStatus
  },
  isRequestLocationInEeaOrUnknown() {
    return execAsync('isRequestLocationInEeaOrUnknown')
  },
  addTestDevice(deviceId: string) {
    return execAsync('addTestDevice', [deviceId])
  },
  setDebugGeography(geography: 'EEA' | 'NOT_EEA') {
    return execAsync('setDebugGeography', [geography])
  },
  requestTrackingAuthorization(){
    return execAsync('requestTrackingAuthorization')
  }

}
