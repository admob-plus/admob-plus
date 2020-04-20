class AMSBanner: AMSAdBase, GADBannerViewDelegate {
    var bannerView: GADBannerView!
    var adSize: GADAdSize!
    var position: String!
    var constraintsToHide: [NSLayoutConstraint]!
    var constraintsForBanner: [NSLayoutConstraint]!
    var view: UIView {
        return self.plugin.viewController.view
    }

    init(id: Int, adUnitID: String, adSize: GADAdSize, position: String) {
        super.init(id: id, adUnitID: adUnitID)
        let frame = { () -> CGRect in
            // Here safe area is taken into account, hence the view frame is used
            // after the view has been laid out.
            if #available(iOS 11.0, *) {
                return view.frame.inset(by: view.safeAreaInsets)
            } else {
                return view.frame
            }
        }()
        let viewWidth = frame.size.width
        self.adSize = GADCurrentOrientationAnchoredAdaptiveBannerAdSizeWithWidth(viewWidth)
        self.position = position
        self.constraintsToHide = [
            self.plugin.webView.topAnchor.constraint(equalTo: view.topAnchor),
            self.plugin.webView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
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
        self.plugin.webView.translatesAutoresizingMaskIntoConstraints = false
        bannerView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(bannerView)
        if #available(iOS 11.0, *) {
            positionBannerInSafeArea(bannerView)

            let background = UIView()
            background.translatesAutoresizingMaskIntoConstraints = false
            background.backgroundColor = .black
            view.addSubview(background)
            view.sendSubviewToBack(background)
            NSLayoutConstraint.activate([
                background.leadingAnchor.constraint(equalTo: view.leadingAnchor),
                background.trailingAnchor.constraint(equalTo: view.trailingAnchor),
                background.bottomAnchor.constraint(equalTo: view.bottomAnchor),
                background.topAnchor.constraint(equalTo: bannerView.topAnchor)
            ])
        } else {
            positionBanner(bannerView)
        }
    }

    @available (iOS 11, *)
    func positionBannerInSafeArea(_ bannerView: UIView) {
        let guide: UILayoutGuide = view.safeAreaLayoutGuide
        var constraints = [
            bannerView.centerXAnchor.constraint(equalTo: guide.centerXAnchor),
            self.plugin.webView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            self.plugin.webView.trailingAnchor.constraint(equalTo: view.trailingAnchor)
        ]
        if position == "top" {
            constraints += [
                bannerView.topAnchor.constraint(equalTo: guide.topAnchor),
                self.plugin.webView.topAnchor.constraint(equalTo: bannerView.bottomAnchor),
                self.plugin.webView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
            ]
        } else {
            constraints += [
                bannerView.bottomAnchor.constraint(equalTo: guide.bottomAnchor),
                self.plugin.webView.topAnchor.constraint(equalTo: view.topAnchor),
                self.plugin.webView.bottomAnchor.constraint(equalTo: bannerView.topAnchor)
            ]
        }
        NSLayoutConstraint.activate(constraints)
    }

    func positionBanner(_ bannerView: UIView) {
        view.addConstraint(NSLayoutConstraint(item: bannerView,
                                              attribute: .centerX,
                                              relatedBy: .equal,
                                              toItem: view,
                                              attribute: .centerX,
                                              multiplier: 1,
                                              constant: 0))
        if position == "top" {
            view.addConstraint(NSLayoutConstraint(item: bannerView,
                                                  attribute: .top,
                                                  relatedBy: .equal,
                                                  toItem: plugin.viewController.topLayoutGuide,
                                                  attribute: .top,
                                                  multiplier: 1,
                                                  constant: 0))
        } else {
            view.addConstraint(NSLayoutConstraint(item: bannerView,
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