class AdMobState {
  public devMode = false
  public platform: string

  constructor() {
    this.platform = cordova.platformId
  }
}

export default AdMobState
