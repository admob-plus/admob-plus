import { exec } from 'cordova'

import { Events, NativeActions } from './constants'
import AdMobState from './state'

export { Events, NativeActions }

export function execAsync(action: NativeActions, args?: any[]) {
  return new Promise((resolve, reject) => {
    exec(resolve, reject, NativeActions.Service, action, args)
  })
}

export function fireDocumentEvent(eventName: string, data = null) {
  const event = new CustomEvent(eventName, { detail: data })
  document.dispatchEvent(event)
}

export class AdBase {
  private state: AdMobState

  constructor(state: AdMobState) {
    this.state = state
  }
}
