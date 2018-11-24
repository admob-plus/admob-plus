class AMSBanner: AMSAdBase, GADBannerViewDelegate {
    var bannerView: GADBannerView!
    var view: UIView {
        return self.plugin.viewController.view
    }

    deinit {
        bannerView = nil
    }

    func show() {
        if bannerView != nil {
            bannerView.isHidden = false
        } else {
            bannerView = GADBannerView(adSize: kGADAdSizeBanner)
            addBannerViewToView(bannerView)
            bannerView.rootViewController = plugin.viewController
        }
        bannerView.delegate = self

        bannerView.adUnitID = adUnitID
        let request = createGADRequest()
        bannerView.load(request)
    }

    func hide() {
        if (bannerView?.superview) != nil {
            bannerView.delegate = nil
            bannerView.rootViewController = nil
            bannerView.removeFromSuperview()
            bannerView = nil
        }
        self.resizeWebView()
    }

    func addBannerViewToView(_ bannerView: UIView) {
        bannerView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(bannerView)
        if #available(iOS 11.0, *) {
            positionBannerAtBottomOfSafeArea(bannerView)
        } else {
            positionBannerAtBottomOfView(bannerView)
        }
        self.resizeWebView()
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

    func resizeWebView() {
        var frame = view.frame
        if bannerView != nil {
            frame.size.height -= bannerView.frame.height
            if #available(iOS 11.0, *) {
                frame.size.height -= self.plugin.webView.safeAreaInsets.bottom
            }
        }
        self.plugin.webView.frame = frame
    }

    func adViewDidReceiveAd(_ bannerView: GADBannerView) {
        plugin.emit(eventType: AMSEvents.bannerLoad)
    }

    func adView(_ bannerView: GADBannerView,
                didFailToReceiveAdWithError error: GADRequestError) {
        plugin.emit(eventType: AMSEvents.bannerLoadFail)
    }

    func adViewWillPresentScreen(_ bannerView: GADBannerView) {
        self.resizeWebView()
        plugin.emit(eventType: AMSEvents.bannerOpen)
    }

    func adViewWillDismissScreen(_ bannerView: GADBannerView) {
        self.resizeWebView()
    }

    func adViewDidDismissScreen(_ bannerView: GADBannerView) {
        plugin.emit(eventType: AMSEvents.bannerClose)
    }

    func adViewWillLeaveApplication(_ bannerView: GADBannerView) {
        plugin.emit(eventType: AMSEvents.bannerExitApp)
    }
}
