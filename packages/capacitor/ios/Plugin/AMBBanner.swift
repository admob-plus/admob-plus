import Capacitor
import GoogleMobileAds

class AMBBanner: AMBAdBase, GADAdSizeDelegate, GADBannerViewDelegate {
    var bannerView: GADBannerView!
    var adSize: GADAdSize!
    var position: String!
    var constraintsToHide: [NSLayoutConstraint]!

    var rootView: UIView {
        return window.subviews[0]
    }

    init(id: Int, adUnitId: String, adSize: GADAdSize, position: String) {
        super.init(id: id, adUnitId: adUnitId)

        self.adSize = adSize
        self.position = position

        DispatchQueue.main.async {
            self.constraintsToHide = [
                self.rootView.topAnchor.constraint(equalTo: self.window.topAnchor),
                self.rootView.bottomAnchor.constraint(equalTo: self.window.bottomAnchor)
            ]
        }
    }

    deinit {
        removeBannerView()
    }

    static func getOrCreate(_ call: CAPPluginCall) -> AMBBanner? {
        guard let id = call.getInt("id"),
              let adUnitId = call.getString("adUnitId")
        else {
            call.reject("Invalid options")
            return nil
        }
        var banner = AMBAdBase.ads[id] as? AMBBanner
        if banner == nil {
            let adSize = kGADAdSizeBanner
            banner = AMBBanner(id: id, adUnitId: adUnitId, adSize: adSize, position: call.getString("position", "bottom"))
        }
        return banner
    }

    func show(_ call: CAPPluginCall, request: GADRequest) {
        NSLayoutConstraint.deactivate(self.constraintsToHide)
        if bannerView != nil {
            bannerView.isHidden = false
        } else {
            bannerView = GADBannerView(adSize: self.adSize)
            addBannerViewToView(bannerView)
        }

        bannerView.rootViewController = self.rootViewController
        bannerView.adUnitID = adUnitId
        bannerView.adSizeDelegate = self
        bannerView.delegate = self
        bannerView.load(request)

        call.resolve()
    }

    func addBannerViewToView(_ bannerView: GADBannerView) {
        bannerView.translatesAutoresizingMaskIntoConstraints = false
        rootView.translatesAutoresizingMaskIntoConstraints = false

        window.addSubview(bannerView)

        let guide: UILayoutGuide = window.safeAreaLayoutGuide
        var constraints = [
            bannerView.centerXAnchor.constraint(equalTo: guide.centerXAnchor),
            bannerView.heightAnchor.constraint(equalToConstant: bannerView.frame.height),
            rootView.widthAnchor.constraint(equalTo: window.widthAnchor)
        ]

        switch position {
        case "top":
            let c = rootView.bottomAnchor.constraint(equalTo: window.bottomAnchor)
            c.priority = UILayoutPriority(999)
            constraints += [
                bannerView.topAnchor.constraint(equalTo: guide.topAnchor),
                c,
                rootView.topAnchor.constraint(equalTo: bannerView.bottomAnchor)
            ]
        case "bottom":
            let c = rootView.topAnchor.constraint(equalTo: window.topAnchor)
            c.priority = UILayoutPriority(999)
            constraints += [
                bannerView.bottomAnchor.constraint(equalTo: guide.bottomAnchor),
                c,
                rootView.bottomAnchor.constraint(equalTo: bannerView.topAnchor)
            ]
        default:
            break
        }

        NSLayoutConstraint.activate(constraints)
    }

    func hide(_ call: CAPPluginCall) {
        removeBannerView()
        NSLayoutConstraint.activate(self.constraintsToHide)

        call.resolve()
    }

    func removeBannerView() {
        if bannerView != nil {
            bannerView.adSizeDelegate = nil
            bannerView.delegate = nil
            bannerView.rootViewController = nil
        }
        if bannerView?.superview != nil {
            bannerView.removeFromSuperview()
        }
        bannerView = nil
    }

    func adView(_ bannerView: GADBannerView, willChangeAdSizeTo adSize: GADAdSize) {
        // NOTE not working as expected
    }

    func bannerViewDidReceiveAd(_ bannerView: GADBannerView) {
        // TODO
    }

    func bannerView(_ bannerView: GADBannerView,
                    didFailToReceiveAdWithError error: Error) {
        // TODO
    }

    func bannerViewWillPresentScreen(_ bannerView: GADBannerView) {
        // TODO
    }

    func bannerViewWillDismissScreen(_ bannerView: GADBannerView) {
        // TODO
    }

    func bannerViewDidDismissScreen(_ bannerView: GADBannerView) {
        // TODO
    }
}
