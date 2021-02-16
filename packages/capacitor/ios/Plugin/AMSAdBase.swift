class AMSAdBase: NSObject {
    static var ads = [Int: Any]()

    var id: Int!
    var adUnitID: String!

    init(id: Int, adUnitID: String) {
        super.init()

        self.id = id
        self.adUnitID = adUnitID
        AMSAdBase.ads[id] = self
    }

    deinit {
        AMSAdBase.ads.removeValue(forKey: self.id)
        self.adUnitID = nil
    }
}
