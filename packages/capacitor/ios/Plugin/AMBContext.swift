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
