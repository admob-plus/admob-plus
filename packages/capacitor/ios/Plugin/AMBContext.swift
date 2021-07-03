import Capacitor
import GoogleMobileAds

class AMBContext: AMBCoreContext {
    func has(_ name: String) -> Bool {
        return call.options.keys.contains(name)
    }

    func optBool(_ name: String) -> Bool? {
        return call.getBool(name)
    }

    func optFloat(_ name: String) -> Float? {
        return call.getFloat(name)
    }

    func optInt(_ name: String) -> Int? {
        return call.getInt(name)
    }

    func optString(_ name: String, _ defaultValue: String) -> String {
        return call.getString(name, defaultValue)
    }

    func optStringArray(_ name: String) -> [String]? {
        return call.getArray(name, String.self)
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
}
