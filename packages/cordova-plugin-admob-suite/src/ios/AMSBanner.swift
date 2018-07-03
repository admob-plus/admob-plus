class AMSBanner: AMSAdBase {
    var bannerView: GADBannerView!
    var view: UIView {
        get {
            return plugin.viewController.view
        }
    }

    deinit {
        bannerView = nil
    }

    func show() {
        bannerView = GADBannerView(adSize: kGADAdSizeBanner)
        addBannerViewToView(bannerView)
        bannerView.rootViewController = plugin.viewController
        bannerView.adUnitID = "ca-app-pub-3940256099942544/2934735716"
        bannerView.load(GADRequest())
    }

    func addBannerViewToView(_ bannerView: UIView) {
        bannerView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(bannerView)
        if #available(iOS 11.0, *) {
            positionBannerAtBottomOfSafeArea(bannerView)
        }
        else {
            positionBannerAtBottomOfView(bannerView)
        }
    }

    @available (iOS 11, *)
    func positionBannerAtBottomOfSafeArea(_ bannerView: UIView) {
        // Position the banner. Stick it to the bottom of the Safe Area.
        // Centered horizontally.
        let guide: UILayoutGuide = view.safeAreaLayoutGuide

        NSLayoutConstraint.activate(
            [bannerView.centerXAnchor.constraint(equalTo: guide.centerXAnchor),
             bannerView.bottomAnchor.constraint(equalTo: guide.bottomAnchor)]
        )
    }

    func positionBannerAtBottomOfView(_ bannerView: UIView) {
        // Center the banner horizontally.
        view.addConstraint(NSLayoutConstraint(item: bannerView,
                                              attribute: .centerX,
                                              relatedBy: .equal,
                                              toItem: view,
                                              attribute: .centerX,
                                              multiplier: 1,
                                              constant: 0))
        // Lock the banner to the top of the bottom layout guide.
        view.addConstraint(NSLayoutConstraint(item: bannerView,
                                              attribute: .bottom,
                                              relatedBy: .equal,
                                              toItem: plugin.viewController.bottomLayoutGuide,
                                              attribute: .top,
                                              multiplier: 1,
                                              constant: 0))
    }
}
