class AMBBanner: AMBAdBase, GADBannerViewDelegate, GADAdSizeDelegate {
    static var stackView = UIStackView()

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

    init(id: Int, adUnitId: String, adSize: GADAdSize, position: String) {
        self.adSize = adSize
        self.position = position

        super.init(id: id, adUnitId: adUnitId)

        initStackView()
    }

    private func initStackView() {
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

    convenience init?(_ ctx: AMBContext) {
        guard let id = ctx.optId(),
              let adUnitId = ctx.optAdUnitID(),
              let position = ctx.optString("position")
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

    func show(_ ctx: AMBContext) {
        let request = ctx.optGADRequest()
        if bannerView == nil {
            bannerView = GADBannerView(adSize: self.adSize)
            bannerView.delegate = self
            bannerView.adSizeDelegate = self
            bannerView.rootViewController = plugin.viewController
        } else {
            bannerView.isHidden = false
        }

        switch position {
        case AMBBannerPosition.top:
            stackView.insertArrangedSubview(bannerView, at: 0)
        default:
            stackView.addArrangedSubview(bannerView)
        }

        bannerView.adUnitID = adUnitId
        bannerView.load(request)

        ctx.success()
    }

    func hide(_ ctx: AMBContext) {
        if bannerView != nil {
            bannerView.isHidden = true
            stackView.removeArrangedSubview(bannerView)
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
}
