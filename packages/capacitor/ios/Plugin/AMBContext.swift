import Capacitor
import GoogleMobileAds

class AMBContext: AMBCoreContext {
    func optString(_ name: String) -> String? {
        return call.getString(name)
    }

    func resolve() {
        call.resolve()
    }

    func resolve(_ data: PluginCallResultData = [:]) {
        call.resolve(data)
    }

    func reject(_ msg: String) {
        call.reject(msg)
    }

    static weak var plugin: AdMobPlusPlugin!

    static let rootViewController = plugin.bridge!.viewController!

    let call: CAPPluginCall

    let plugin = AMBContext.plugin

    init(_ call: CAPPluginCall) {
        self.call = call
    }

    func optAppMuted() -> Bool? {
        return call.getBool("appMuted")
    }

    func optAppVolume() -> Float? {
        return call.getFloat("appVolume")
    }

    func optId() -> Int? {
        return call.getInt("id")
    }

    func optAdUnitID() -> String? {
        return call.getString("adUnitId")
    }

    func optPosition() -> String {
        return call.getString("position", "bottom")
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
}
