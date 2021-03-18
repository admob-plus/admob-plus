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

    func emit(_ eventType: String) {
        self.emit(eventType, ["adId": self.id])
    }

    func emit(_ eventType: String, _ error: Error) {
        self.emit(eventType, ["message": error.localizedDescription])
    }

    func emit(_ eventType: String, _ reward: GADAdReward) {
        self.emit(eventType, [
            "reward": [
                "amount": reward.amount,
                "type": reward.type
            ]
        ])
    }

    func emit(_ eventType: String, _ adSize: GADAdSize) {
        self.emit(eventType, [
            "size": [
                "width": adSize.size.width,
                "height": adSize.size.height
            ]
        ])
    }

    func emit(_ eventType: String, _ data: [String: Any]) {
        var d: [String: Any] = ["adId": self.id]
        d.merge(data) { (current, _) in current }
        plugin.emit(eventType: eventType, data: d)
    }
}
