import { exec } from 'cordova'

const state = {}

const execAsync = (action: string, args?: any[]) => {
  return new Promise((resolve, reject) => {
    exec(resolve, reject, 'Consent', action, args)
  })
}

type ConsentStatus = 'PERSONALIZED' | 'NON_PERSONALIZED' | 'UNKNOWN'

export default {
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
}
