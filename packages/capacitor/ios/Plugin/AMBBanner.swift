import Capacitor
import GoogleMobileAds

class AMBBanner: AMBAdBase, GADAdSizeDelegate, GADBannerViewDelegate {
    static var stackView = UIStackView()

    var bannerView: GADBannerView!
    var adSize: GADAdSize!
    var position: String!

    var stackView: UIStackView {
        return AMBBanner.stackView
    }

    var rootView: UIView {
        return window
    }

    var mainView: UIView {
        return window.subviews[0]
    }

    init(id: Int, adUnitId: String, adSize: GADAdSize, position: String) {
        super.init(id: id, adUnitId: adUnitId)

        self.adSize = adSize
        self.position = position

        if stackView.arrangedSubviews.isEmpty {
            stackView.axis = .vertical
            stackView.distribution = .fill
            stackView.alignment = .fill
            rootView.addSubview(stackView)
            stackView.addArrangedSubview(mainView)

            let backgroundView = UIView()
            backgroundView.backgroundColor = .black
            backgroundView.translatesAutoresizingMaskIntoConstraints = false
            stackView.insertSubview(backgroundView, at: 0)
            NSLayoutConstraint.activate([
                backgroundView.leadingAnchor.constraint(equalTo: stackView.leadingAnchor),
                backgroundView.trailingAnchor.constraint(equalTo: stackView.trailingAnchor),
                backgroundView.topAnchor.constraint(equalTo: stackView.topAnchor),
                backgroundView.bottomAnchor.constraint(equalTo: rootView.bottomAnchor)
            ])

            let guide = rootView.safeAreaLayoutGuide
            stackView.translatesAutoresizingMaskIntoConstraints = false
            NSLayoutConstraint.activate([
                stackView.leadingAnchor.constraint(equalTo: rootView.leadingAnchor),
                stackView.trailingAnchor.constraint(equalTo: rootView.trailingAnchor),
                stackView.bottomAnchor.constraint(equalTo: rootView.bottomAnchor),
                stackView.topAnchor.constraint(equalTo: guide.topAnchor)
            ])
        }
    }

    static func getOrCreate(_ ctx: AMBContext) -> AMBBanner? {
        if let banner = ctx.optAd() as? AMBBanner {
            return banner
        }

        guard let id = ctx.call.getInt("id"),
              let adUnitId = ctx.call.getString("adUnitId")
        else {
            ctx.call.reject("Invalid options")
            return nil
        }

        let adSize = kGADAdSizeBanner
        return AMBBanner(
            id: id,
            adUnitId: adUnitId,
            adSize: adSize,
            position: ctx.call.getString("position", "bottom"))
    }

    func show(request: GADRequest) {
        if bannerView == nil {
            bannerView = GADBannerView(adSize: self.adSize)
            bannerView.adSizeDelegate = self
            bannerView.delegate = self
            bannerView.rootViewController = rootViewController
        } else {
            bannerView.isHidden = false
        }

        switch position {
        case "top":
            stackView.insertArrangedSubview(bannerView, at: 0)
        default:
            stackView.addArrangedSubview(bannerView)
        }

        bannerView.adUnitID = adUnitId
        bannerView.load(request)
    }

    func hide() {
        if bannerView != nil {
            bannerView.isHidden = true
            stackView.removeArrangedSubview(bannerView)
        }
    }

    func adView(_ bannerView: GADBannerView, willChangeAdSizeTo adSize: GADAdSize) {
        // NOTE not working as expected
    }

    func bannerViewDidReceiveAd(_ bannerView: GADBannerView) {
    }

    func bannerView(_ bannerView: GADBannerView,
                    didFailToReceiveAdWithError error: Error) {
    }

    func bannerViewWillPresentScreen(_ bannerView: GADBannerView) {
    }

    func bannerViewWillDismissScreen(_ bannerView: GADBannerView) {
    }

    func bannerViewDidDismissScreen(_ bannerView: GADBannerView) {
    }
}
