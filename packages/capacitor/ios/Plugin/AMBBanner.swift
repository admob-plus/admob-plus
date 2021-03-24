import Capacitor
import GoogleMobileAds

class AMBBanner: AMBAdBase, GADAdSizeDelegate, GADBannerViewDelegate {
    static var stackView = UIStackView()

    let adSize: GADAdSize!
    let position: String!
    var bannerView: GADBannerView!

    var stackView: UIStackView {
        return AMBBanner.stackView
    }

    var rootView: UIView {
        return window
    }

    var mainView: UIView {
        return plugin.webView!
    }

    init(id: Int, adUnitId: String, adSize: GADAdSize, position: String) {
        self.adSize = adSize
        self.position = position

        super.init(id: id, adUnitId: adUnitId)
    }

    convenience init?(_ ctx: AMBContext) {
        guard let id = ctx.optId(),
              let adUnitId = ctx.optAdUnitID()
        else {
            return nil
        }

        let adSize = kGADAdSizeBanner
        self.init(id: id,
                  adUnitId: adUnitId,
                  adSize: adSize,
                  position: ctx.optPosition())
    }

    func load(_ ctx: AMBContext) {
        if bannerView == nil {
            bannerView = GADBannerView(adSize: self.adSize)
            bannerView.adSizeDelegate = self
            bannerView.delegate = self
            bannerView.rootViewController = rootViewController
        }

        bannerView.adUnitID = adUnitId
        bannerView.load(ctx.optGADRequest())
    }

    func show(_ ctx: AMBContext) {
        load(ctx)

        prepareStackView()

        let guide = rootView.safeAreaLayoutGuide
        switch position {
        case "top":
            stackView.topAnchor.constraint(equalTo: guide.topAnchor).isActive = true
            stackView.insertArrangedSubview(bannerView, at: 0)
            updateStatusBarStyle()
        default:
            stackView.bottomAnchor.constraint(equalTo: guide.bottomAnchor).isActive = true
            stackView.addArrangedSubview(bannerView)
        }

        bannerView.isHidden = false
        ctx.success()
    }

    func hide(_ ctx: AMBContext) {
        if bannerView != nil {
            bannerView.isHidden = true
            stackView.removeArrangedSubview(bannerView)
        }
        ctx.success()
    }

    func adView(_ bannerView: GADBannerView, willChangeAdSizeTo adSize: GADAdSize) {
        // NOTE not working as expected
    }

    func bannerViewDidReceiveAd(_ bannerView: GADBannerView) {
        self.emit(AMBEvents.bannerLoad)
    }

    func bannerView(_ bannerView: GADBannerView,
                    didFailToReceiveAdWithError error: Error) {
        self.emit(AMBEvents.bannerLoadFail, error)
    }

    func bannerViewDidRecordImpression(_ bannerView: GADBannerView) {
        self.emit(AMBEvents.bannerImpression)
    }

    func bannerViewWillPresentScreen(_ bannerView: GADBannerView) {
        self.emit(AMBEvents.bannerOpen)
    }

    func bannerViewWillDismissScreen(_ bannerView: GADBannerView) {
    }

    func bannerViewDidDismissScreen(_ bannerView: GADBannerView) {
        self.emit(AMBEvents.bannerClose)
    }

    private func prepareStackView() {
        if stackView.arrangedSubviews.isEmpty {
            stackView.axis = .vertical
            stackView.distribution = .fill
            stackView.alignment = .fill
            rootView.addSubview(stackView)
            stackView.addArrangedSubview(mainView)

            if #available(iOS 14.0, *) {
                stackView.backgroundColor = .black
            } else {
                let backgroundView = UIView()
                backgroundView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
                backgroundView.backgroundColor = .black
                stackView.insertSubview(backgroundView, at: 0)
            }

            let constraintTop = stackView.topAnchor.constraint(equalTo: rootView.topAnchor)
            let constraintBottom = stackView.bottomAnchor.constraint(equalTo: rootView.bottomAnchor)
            constraintTop.priority = UILayoutPriority(10)
            constraintBottom.priority = UILayoutPriority(10)
            stackView.translatesAutoresizingMaskIntoConstraints = false
            NSLayoutConstraint.activate([
                stackView.leadingAnchor.constraint(equalTo: rootView.leadingAnchor),
                stackView.trailingAnchor.constraint(equalTo: rootView.trailingAnchor),
                constraintBottom,
                constraintTop
            ])
        }
    }

    private func updateStatusBarStyle() {
        if stackView.arrangedSubviews[0] is GADBannerView {
            plugin.bridge?.statusBarStyle = .lightContent
        }
    }
}
