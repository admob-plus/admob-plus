class AMSAdBase: NSObject {
    static var ads = [Int: Any]()

    var id: Int!
    var adUnitId: String!

    var window: UIWindow {
        return UIApplication.shared.keyWindow!
    }

    var rootViewController: UIViewController {
        return window.rootViewController!
    }

    init(id: Int, adUnitId: String) {
        super.init()

        self.id = id
        self.adUnitId = adUnitId
        AMSAdBase.ads[id] = self
    }

    deinit {
        if let key = self.id {
            DispatchQueue.main.async {
                AMSAdBase.ads.removeValue(forKey: key)
            }
        }
        self.adUnitId = nil
    }
}
