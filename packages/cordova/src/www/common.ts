export const CordovaService = 'AdMob';

export type CordovaAction =
  | 'adCreate'
  | 'adHide'
  | 'adIsLoaded'
  | 'adLoad'
  | 'adShow'
  | 'configure'
  | 'ready'
  | 'setAppMuted'
  | 'setAppVolume'
  | 'start'
  | 'webviewGoto';

export const enum Platform {
  android = 'android',
  ios = 'ios',
}

export function execAsync<T>(action: CordovaAction, args?: unknown[]) {
  return new Promise<T>((resolve, reject) => {
    cordova.exec(resolve, reject, CordovaService, action, args);
  });
}
