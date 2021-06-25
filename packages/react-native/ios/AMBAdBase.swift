import GoogleMobileAds

class AMBAdBase: AMBCoreAd {
    var plugin: AdMobPlusRN {
        return AMBContext.plugin
    }

    var window: UIWindow {
        return UIApplication.shared.keyWindow!
    }

    var rootViewController: UIViewController {
        return window.rootViewController!
    }

    func isLoaded() -> Bool {
        #if targetEnvironment(simulator)
        fatalError(AMBCoreError.notImplemented.localizedDescription)
        #else
        return false
        #endif
    }

    func load(_ ctx: AMBContext) {
        ctx.reject(AMBCoreError.notImplemented)
        #if targetEnvironment(simulator)
        fatalError(AMBCoreError.notImplemented.localizedDescription)
        #endif
    }

    func show(_ ctx: AMBContext) {
        ctx.reject(AMBCoreError.notImplemented)
        #if targetEnvironment(simulator)
        fatalError(AMBCoreError.notImplemented.localizedDescription)
        #endif
    }

    func hide(_ ctx: AMBContext) {
        ctx.reject(AMBCoreError.notImplemented)
        #if targetEnvironment(simulator)
        fatalError(AMBCoreError.notImplemented.localizedDescription)
        #endif
    }

    func emit(_ event: AMBEvents) {
        self.emit(event.rawValue, nil)
    }

    func emit(_ event: AMBEvents, _ error: Error) {
        self.emit(event.rawValue, ["message": error.localizedDescription])
    }

    func emit(_ event: AMBEvents, _ reward: GADAdReward) {
        self.emit(event.rawValue, [
            "reward": [
                "amount": reward.amount,
                "type": reward.type
            ]
        ])
    }

    func emit(_ eventName: String) {
        self.emit(eventName, nil)
    }

    func emit(_ eventName: String, _ error: Error) {
        self.emit(eventName, ["message": error.localizedDescription])
    }

    func emit(_ name: String, _ data: [String: Any]?) {
        var d: [String: Any] = ["adId": self.id]
        if data != nil {
            d.merge(data!) { (current, _) in current }
        }
        plugin.emit(name, d)
    }
}
