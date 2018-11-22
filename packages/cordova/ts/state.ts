type AdId = number

class AdMobState {
  public applicationId: undefined | string
  public devMode = false
  public platform: string

  public nextId: AdId = 100
  public adUnits: {string?: AdId} = {}

  constructor() {
    this.platform = typeof cordova !== 'undefined' ? cordova.platformId : ''
  }

  public getAdId(adUnitId: string) {
    if (this.adUnits[adUnitId]) {
      return this.adUnits[adUnitId]
    }
    this.adUnits[adUnitId] = this.nextId
    this.nextId += 1
    return this.adUnits[adUnitId]
  }
}

export default AdMobState
