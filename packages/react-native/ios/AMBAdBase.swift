import GoogleMobileAds

protocol AMBGenericAd {
    func isLoaded() -> Bool
    func load(_ ctx: AMBContext)
    func show(_ ctx: AMBContext)
    func hide(_ ctx: AMBContext)
}

extension AMBGenericAd {
    func isLoaded() -> Bool {
        return false
    }

    func load(_ ctx: AMBContext) {
        ctx.error("Not implemented")
    }

    func show(_ ctx: AMBContext) {
        ctx.error("Not implemented")
    }

    func hide(_ ctx: AMBContext) {
        ctx.error("Not implemented")
    }
}

class AMBAdBase: NSObject {
    let id: Int
    let adUnitId: String

    var plugin: AdMobPlusRN {
        return AMBContext.plugin
    }

    var window: UIWindow {
        return UIApplication.shared.keyWindow!
    }

    var rootViewController: UIViewController {
        return window.rootViewController!
    }

    init(id: Int, adUnitId: String) {
        self.id = id
        self.adUnitId = adUnitId

        super.init()

        DispatchQueue.main.sync {
            AMBContext.ads[id] = self
        }
    }

    convenience init?(_ ctx: AMBContext) {
        guard let id = ctx.optId(),
              let adUnitId = ctx.optAdUnitID()
        else {
            return nil
        }
        self.init(id: id, adUnitId: adUnitId)
    }

    deinit {
        let id = self.id
        DispatchQueue.main.async {
            AMBContext.ads.removeValue(forKey: id)
        }
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
