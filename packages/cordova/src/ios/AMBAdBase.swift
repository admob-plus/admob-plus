class AMBAdBase: NSObject {
    static var ads = [Int: Any]()
    static weak var plugin: AMBPlugin!

    var id: Int!
    var adUnitId: String!

    var plugin: AMBPlugin {
        return AMBAdBase.plugin
    }

    var commandDelegate: CDVCommandDelegate {
        return self.plugin.commandDelegate
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
}
