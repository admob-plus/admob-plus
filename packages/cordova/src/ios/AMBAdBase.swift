class AMBAdBase: NSObject {
    static var ads = [Int: AMBAdBase]()

    let id: Int
    let adUnitId: String

    var plugin: AMBPlugin {
        return AMBContext.plugin
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
        self.emit(eventName, ["adId": self.id])
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

    func emit(_ eventName: String, _ data: [String: Any]) {
        var d: [String: Any] = ["adId": self.id]
        d.merge(data) { (current, _) in current }
        plugin.emit(eventName, data: d)
    }
}
