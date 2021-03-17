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

    deinit {
        AMBAdBase.ads.removeValue(forKey: self.id)
    }

    func emit(_ eventName: String) {
        self.emit(eventName, nil)
    }

    func emit(_ eventName: String, _ data: [String: Any]?) {
        var d: [String: Any] = ["adId": self.id]
        if data != nil {
            d.merge(data!) { (current, _) in current }
        }
        plugin.notifyListeners(eventName, data: d)
    }
}
