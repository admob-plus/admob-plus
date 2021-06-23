import GoogleMobileAds

class AMBAdBase: AMBCoreAd {
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

    func emit(_ eventName: String) {
        self.emit(eventName, nil)
    }

    func emit(_ eventName: String, _ error: Error) {
        self.emit(eventName, ["message": error.localizedDescription])
    }

    func emit(_ eventName: String, _ reward: GADAdReward) {
        self.emit(eventName, [
            "reward": [
                "amount": reward.amount,
                "type": reward.type
            ]
        ])
    }

    func emit(_ eventName: String, _ adSize: GADAdSize) {
        self.emit(eventName, [
            "size": [
                "width": adSize.size.width,
                "height": adSize.size.height
            ]
        ])
    }

    func emit(_ eventName: String, _ data: [String: Any]?) {
        var d: [String: Any] = ["adId": self.id]
        if data != nil {
            d.merge(data!) { (current, _) in current }
        }
        AMBContext.plugin.notifyListeners(eventName, data: d)
    }
}
