import { exec } from 'cordova'
import { NativeActions } from './api'

export * from './api'

export function execAsync(action: NativeActions, args?: any[]) {
  return new Promise((resolve, reject) => {
    exec(resolve, reject, NativeActions.Service, action, args)
  })
}

export function waitEvent(
  successEvent: string,
  failEvent = '',
): Promise<CustomEvent> {
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
