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
}
