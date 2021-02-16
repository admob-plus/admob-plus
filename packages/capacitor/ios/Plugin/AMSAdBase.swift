class AMSAdBase: NSObject {
    static var ads = [Int: Any]()

    var id: Int!
    var adUnitId: String!

    init(id: Int, adUnitId: String) {
        super.init()

        self.id = id
        self.adUnitId = adUnitId
        AMSAdBase.ads[id] = self
    }

    deinit {
        AMSAdBase.ads.removeValue(forKey: self.id)
        self.adUnitId = nil
    }
}
