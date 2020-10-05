class AMSBanner: AMSAdBase, GADBannerViewDelegate {
    var bannerView: GADBannerView!
    var adSize: GADAdSize!
    var position: String!
    var constraintsToHide: [NSLayoutConstraint]!

    var rootView: UIView {
        return self.plugin.viewController.view
    }

    var mainView: UIView {
        return self.plugin.webView
    }

    init(id: Int, adUnitID: String, adSize: GADAdSize, position: String) {
        super.init(id: id, adUnitID: adUnitID)

        self.adSize = adSize
        self.position = position
        self.constraintsToHide = [
            mainView.topAnchor.constraint(equalTo: rootView.topAnchor),
            mainView.bottomAnchor.constraint(equalTo: rootView.bottomAnchor)
        ]
    }

    deinit {
        bannerView = nil
    }

    func show(request: GADRequest) {
        NSLayoutConstraint.deactivate(self.constraintsToHide)
        if bannerView != nil {
            bannerView.isHidden = false
        } else {
            bannerView = GADBannerView(adSize: self.adSize)
            addBannerViewToView(bannerView)
            bannerView.rootViewController = plugin.viewController
        }
        bannerView.delegate = self

        bannerView.adUnitID = adUnitID
        bannerView.load(request)
    }

    func hide() {
        if (bannerView?.superview) != nil {
            bannerView.delegate = nil
            bannerView.rootViewController = nil
            bannerView.removeFromSuperview()
            bannerView = nil
            NSLayoutConstraint.activate(self.constraintsToHide)
        }
    }

    func addBannerViewToView(_ bannerView: UIView) {
        mainView.translatesAutoresizingMaskIntoConstraints = false
        bannerView.translatesAutoresizingMaskIntoConstraints = false
        rootView.addSubview(bannerView)
        if #available(iOS 11.0, *) {
            positionBannerInSafeArea(bannerView)

            let background = UIView()
            background.translatesAutoresizingMaskIntoConstraints = false
            background.backgroundColor = .black
            rootView.addSubview(background)
            rootView.sendSubviewToBack(background)
            NSLayoutConstraint.activate([
                background.leadingAnchor.constraint(equalTo: rootView.leadingAnchor),
                background.trailingAnchor.constraint(equalTo: rootView.trailingAnchor),
                background.bottomAnchor.constraint(equalTo: rootView.bottomAnchor),
                background.topAnchor.constraint(equalTo: bannerView.topAnchor)
            ])
        } else {
            positionBanner(bannerView)
        }
    }

    @available (iOS 11, *)
    func positionBannerInSafeArea(_ bannerView: UIView) {
        let guide: UILayoutGuide = rootView.safeAreaLayoutGuide
        var constraints = [
            bannerView.centerXAnchor.constraint(equalTo: guide.centerXAnchor),
            bannerView.heightAnchor.constraint(equalToConstant: bannerView.frame.height),
            mainView.leadingAnchor.constraint(equalTo: rootView.leadingAnchor),
            mainView.trailingAnchor.constraint(equalTo: rootView.trailingAnchor)
        ]
        if position == "top" {
            constraints += [
                bannerView.topAnchor.constraint(equalTo: guide.topAnchor),
                mainView.topAnchor.constraint(equalTo: bannerView.bottomAnchor),
                mainView.bottomAnchor.constraint(equalTo: rootView.bottomAnchor)
            ]
        } else {
            constraints += [
                bannerView.bottomAnchor.constraint(equalTo: guide.bottomAnchor),
                mainView.topAnchor.constraint(equalTo: rootView.topAnchor),
                mainView.bottomAnchor.constraint(equalTo: bannerView.topAnchor)
            ]
        }
        NSLayoutConstraint.activate(constraints)
    }

    func positionBanner(_ bannerView: UIView) {
        rootView.addConstraint(NSLayoutConstraint(item: bannerView,
                                              attribute: .centerX,
                                              relatedBy: .equal,
                                              toItem: rootView,
                                              attribute: .centerX,
                                              multiplier: 1,
                                              constant: 0))
        if position == "top" {
            rootView.addConstraint(NSLayoutConstraint(item: bannerView,
                                                  attribute: .top,
                                                  relatedBy: .equal,
                                                  toItem: plugin.viewController.topLayoutGuide,
                                                  attribute: .top,
                                                  multiplier: 1,
                                                  constant: 0))
        } else {
            rootView.addConstraint(NSLayoutConstraint(item: bannerView,
                                                  attribute: .bottom,
                                                  relatedBy: .equal,
                                                  toItem: plugin.viewController.bottomLayoutGuide,
                                                  attribute: .top,
                                                  multiplier: 1,
                                                  constant: 0))
        }
    }

    func adViewDidReceiveAd(_ bannerView: GADBannerView) {
        plugin.emit(eventType: AMSEvents.bannerLoad)
    }

    func adView(_ bannerView: GADBannerView,
                didFailToReceiveAdWithError error: GADRequestError) {
        plugin.emit(eventType: AMSEvents.bannerLoadFail)
    }

    func adViewWillPresentScreen(_ bannerView: GADBannerView) {
        plugin.emit(eventType: AMSEvents.bannerOpen)
    }

    func adViewWillDismissScreen(_ bannerView: GADBannerView) {
    }

    func adViewDidDismissScreen(_ bannerView: GADBannerView) {
        plugin.emit(eventType: AMSEvents.bannerClose)
    }

    func adViewWillLeaveApplication(_ bannerView: GADBannerView) {
        plugin.emit(eventType: AMSEvents.bannerExitApp)
    }
}
