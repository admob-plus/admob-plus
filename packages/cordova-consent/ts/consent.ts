import { exec } from 'cordova'

const state = {}

const execAsync = (action: string, args?: any[]) => {
  return new Promise((resolve, reject) => {
    exec(resolve, reject, 'Consent', action, args)
  })
}

export default {
  checkConsent(publisherIds: string[]) {
    return execAsync('checkConsent', [publisherIds])
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
