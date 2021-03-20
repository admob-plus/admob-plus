import Capacitor
import GoogleMobileAds

class AMBContext {
    static weak var plugin: AdMobPlusPlugin!

    let call: CAPPluginCall

    var plugin: AdMobPlusPlugin {
        return AMBContext.plugin
    }

    init(_ call: CAPPluginCall) {
        self.call = call
    }

    func optId() -> Int? {
        return call.getInt("id")
    }

    func optAdUnitID() -> String? {
        return call.getString("adUnitId")
    }

    func optAd() -> AMBAdBase? {
        guard let id = optId(),
              let ad = AMBAdBase.ads[id]
        else {
            return nil
        }
        return ad
    }

    func optAdOrError() -> AMBAdBase? {
        if let ad = optAd() {
            return ad
        } else {
            call.reject("Ad not found")
            return nil
        }
    }

    func optMaxAdContentRating() -> GADMaxAdContentRating? {
        switch call.getString("maxAdContentRating") {
        case "G":
            return GADMaxAdContentRating.general
        case "MA":
            return GADMaxAdContentRating.matureAudience
        case "PG":
            return GADMaxAdContentRating.parentalGuidance
        case "T":
            return GADMaxAdContentRating.teen
        default:
            return nil
        }
    }

    func optChildDirectedTreatmentTag() -> Bool? {
        return call.getBool("tagForChildDirectedTreatment")
    }

    func optUnderAgeOfConsentTag() -> Bool? {
        return call.getBool("tagForUnderAgeOfConsent")
    }

    func optTestDeviceIds() -> [String]? {
        if let testDeviceIds = call.getArray("testDeviceIds", String.self) {
            return testDeviceIds
        }
        return nil
    }

    func optGADRequest() -> GADRequest {
        let request = GADRequest()
        return request
    }

    func success() {
        call.resolve()
    }

    func error() {
        self.error("Unknown error")
    }

    func error(_ message: String) {
        call.reject(message)
    }

    func error(_ error: Error) {
        self.error(error.localizedDescription)
    }
}
