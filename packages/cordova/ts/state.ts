class AdMobState {
  public devMode = false
  public platform: string

  constructor() {
    this.platform = typeof cordova !== 'undefined' ? cordova.platformId : ''
  }
}

export default AdMobState
