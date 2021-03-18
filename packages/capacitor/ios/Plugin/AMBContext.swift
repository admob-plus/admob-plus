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

    func optAd() -> AMBAdBase? {
        guard let id = call.getInt("id"),
              let ad = AMBAdBase.ads[id]
        else {
            return nil
        }
        return ad
    }

    func optAdOrNotFound() -> AMBAdBase? {
        if let ad = optAd() {
            return ad
        } else {
            call.reject("Ad not found")
            return nil
        }
    }
}
