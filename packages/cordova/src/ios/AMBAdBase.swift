class AMBAdBase: NSObject {
    static var ads = [Int: Any]()
    static weak var plugin: AMBPlugin!

    var id: Int!
    var adUnitId: String!

    var plugin: AMBPlugin {
        return AMBAdBase.plugin
    }

    init(id: Int, adUnitId: String) {
        super.init()

        self.id = id
        self.adUnitId = adUnitId
        AMBAdBase.ads[id] = self
    }

    deinit {
        AMBAdBase.ads.removeValue(forKey: self.id)
        self.adUnitId = nil
    }

    func emit(_ eventType: String) {
        self.emit(eventType, ["adId": self.id!])
    }

    func emit(_ eventType: String, _ error: Error) {
        self.emit(eventType, ["message": error.localizedDescription])
    }

    func emit(_ eventType: String, _ data: [String: Any]) {
        var d: [String: Any] = ["adId": self.id!]
        d.merge(data) { (current, _) in current }
        plugin.emit(eventType: eventType, data: d)
    }
}
