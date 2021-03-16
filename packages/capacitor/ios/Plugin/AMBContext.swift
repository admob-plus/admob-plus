import Capacitor

class AMBContext {
    let plugin: AdMobPlusPlugin
    let call: CAPPluginCall

    init(plugin: AdMobPlusPlugin, call: CAPPluginCall) {
        self.plugin = plugin
        self.call = call
    }

    func getAd() -> AMBAdBase? {
        guard let id = call.getInt("id"),
              let ad = AMBAdBase.ads[id]
        else {
            return nil
        }
        return ad
    }
}
