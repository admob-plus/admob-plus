type AdId = number

class AdMobState {
  public devMode = false

  public nextId: AdId = 100
  public adUnits: { [key: string]: AdId } = {}

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
