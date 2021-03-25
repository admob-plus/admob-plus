import GoogleMobileAds

class AMBAdBase: NSObject {
    static var ads = [Int: AMBAdBase]()

    let id: Int
    let adUnitId: String

    var plugin: AdMobPlusPlugin {
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

        AMBAdBase.ads[id] = self
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
        AMBAdBase.ads.removeValue(forKey: self.id)
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
        plugin.notifyListeners(eventName, data: d)
    }
}
