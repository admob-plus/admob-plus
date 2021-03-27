import GoogleMobileAds

class AMBBanner: AMBAdBase, GADBannerViewDelegate, GADAdSizeDelegate {
    static var stackView = UIStackView()

    static var topConstraint = {
        return AMBBanner.stackView.topAnchor.constraint(
            equalTo: AMBContext.plugin.viewController.view.safeAreaLayoutGuide.topAnchor)
    }()

    static var bottomConstraint = {
        return AMBBanner.stackView.bottomAnchor.constraint(
            equalTo: AMBContext.plugin.viewController.view.safeAreaLayoutGuide.bottomAnchor)
    }()

    let adSize: GADAdSize!
    let position: String!
    var bannerView: GADBannerView!

    var stackView: UIStackView {
        return AMBBanner.stackView
    }

    var rootView: UIView {
        return self.plugin.viewController.view
    }

    var mainView: UIView {
        return self.plugin.webView
    }

    var topConstraint: NSLayoutConstraint {
        return AMBBanner.topConstraint
    }

    var bottomConstraint: NSLayoutConstraint {
        return AMBBanner.bottomConstraint
    }

    init(id: Int, adUnitId: String, adSize: GADAdSize, position: String) {
        self.adSize = adSize
        self.position = position

        super.init(id: id, adUnitId: adUnitId)
    }

    convenience init?(_ ctx: AMBContext) {
        guard let id = ctx.optId(),
              let adUnitId = ctx.optAdUnitID(),
              let position = ctx.optPosition()
        else {
            return nil
        }
        self.init(id: id, adUnitId: adUnitId, adSize: ctx.optAdSize(), position: position)
    }

    deinit {
        if bannerView != nil {
            bannerView.delegate = nil
            bannerView.adSizeDelegate = nil
            stackView.removeArrangedSubview(bannerView)
            bannerView.removeFromSuperview()
            bannerView = nil
        }
    }

    func load(_ ctx: AMBContext) {
        let request = ctx.optGADRequest()
        if bannerView == nil {
            bannerView = GADBannerView(adSize: self.adSize)
            bannerView.delegate = self
            bannerView.adSizeDelegate = self
            bannerView.rootViewController = plugin.viewController
        }

        bannerView.adUnitID = adUnitId
        bannerView.load(request)
    }

    func show(_ ctx: AMBContext) {
        load(ctx)

        prepareStackView()

        switch position {
        case AMBBannerPosition.top:
            stackView.insertArrangedSubview(bannerView, at: 0)
        default:
            stackView.addArrangedSubview(bannerView)
        }

        bannerView.isHidden = false
        updateLayout()
        ctx.success()
    }

    func hide(_ ctx: AMBContext) {
        if bannerView != nil {
            bannerView.isHidden = true
            stackView.removeArrangedSubview(bannerView)
            updateLayout()
        }
        ctx.success()
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

    func adView(_ bannerView: GADBannerView, willChangeAdSizeTo size: GADAdSize) {
        self.emit(AMBEvents.bannerSizeChange, size)
    }

    private func prepareStackView() {
        if stackView.arrangedSubviews.isEmpty {
            stackView.axis = .vertical
            stackView.distribution = .fill
            stackView.alignment = .fill
            rootView.addSubview(stackView)
            stackView.addArrangedSubview(mainView)

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

    private func updateLayout() {
        if stackView.arrangedSubviews.first is GADBannerView {
            topConstraint.isActive = true

            if #available(iOS 12.0, *) {
                if plugin.viewController.traitCollection.userInterfaceStyle == .dark {
                    rootView.backgroundColor = .clear
                }
            }
        } else {
            topConstraint.isActive = false
        }

        if stackView.arrangedSubviews.last is GADBannerView {
            bottomConstraint.isActive = true
        } else {
            bottomConstraint.isActive = false
        }
    }

}
