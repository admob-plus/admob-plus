class AMBBanner: AMBAdBase, GADBannerViewDelegate {
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

    init(id: Int, adUnitId: String, adSize: GADAdSize, position: String) {
        super.init(id: id, adUnitId: adUnitId)

        self.adSize = adSize
        self.position = position
        self.constraintsToHide = [
            mainView.topAnchor.constraint(equalTo: rootView.topAnchor),
            mainView.bottomAnchor.constraint(equalTo: rootView.bottomAnchor)
        ]
    }

    deinit {
        bannerView = nil
        adSize = nil
        position = nil
        constraintsToHide = nil
    }

    static func getAdSize(_ opts: NSDictionary) -> GADAdSize {
        if let adSizeType = opts.value(forKey: "size") as? Int {
            switch adSizeType {
            case 0:
                return kGADAdSizeBanner
            case 1:
                return kGADAdSizeLargeBanner
            case 2:
                return kGADAdSizeMediumRectangle
            case 3:
                return kGADAdSizeFullBanner
            case 4:
                return kGADAdSizeLeaderboard
            default: break
            }
        }
        guard let adSizeDict = opts.value(forKey: "size") as? NSDictionary,
              let width = adSizeDict.value(forKey: "width") as? Int,
              let height = adSizeDict.value(forKey: "height") as? Int
        else {
            return kGADAdSizeBanner
        }
        return GADAdSizeFromCGSize(CGSize(width: width, height: height))
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

        bannerView.adUnitID = adUnitId
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
        DispatchQueue.main.async { [unowned self] in
            self.addBannerViewToViewUnsafe(bannerView)
        }
    }

    func addBannerViewToViewUnsafe(_ bannerView: UIView) {
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
            mainView.widthAnchor.constraint(equalTo: rootView.widthAnchor)
        ]
        if position == AMBBannerPosition.top {
            let c = mainView.bottomAnchor.constraint(equalTo: rootView.bottomAnchor)
            c.priority = UILayoutPriority(999)
            constraints += [
                bannerView.topAnchor.constraint(equalTo: guide.topAnchor),
                c,
                mainView.topAnchor.constraint(equalTo: bannerView.bottomAnchor)
            ]
        } else {
            let c = mainView.topAnchor.constraint(equalTo: rootView.topAnchor)
            c.priority = UILayoutPriority(999)
            constraints += [
                bannerView.bottomAnchor.constraint(equalTo: guide.bottomAnchor),
                c,
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
        if position == AMBBannerPosition.top {
            rootView.addConstraint(NSLayoutConstraint(item: bannerView,
                                                      attribute: .top,
                                                      relatedBy: .equal,
                                                      toItem: rootView.safeAreaLayoutGuide.topAnchor,
                                                      attribute: .top,
                                                      multiplier: 1,
                                                      constant: 0))
        } else {
            rootView.addConstraint(NSLayoutConstraint(item: bannerView,
                                                      attribute: .bottom,
                                                      relatedBy: .equal,
                                                      toItem: rootView.safeAreaLayoutGuide.bottomAnchor,
                                                      attribute: .top,
                                                      multiplier: 1,
                                                      constant: 0))
        }
    }

    func bannerViewDidReceiveAd(_ bannerView: GADBannerView) {
        self.emit(AMBEvents.bannerLoad)
    }

    func bannerView(_ bannerView: GADBannerView,
                    didFailToReceiveAdWithError error: Error) {
        self.emit(AMBEvents.bannerLoadFail, error)
    }

    func bannerViewWillPresentScreen(_ bannerView: GADBannerView) {
        self.emit(AMBEvents.bannerOpen)
    }

    func bannerViewWillDismissScreen(_ bannerView: GADBannerView) {
    }

    func bannerViewDidDismissScreen(_ bannerView: GADBannerView) {
        self.emit(AMBEvents.bannerClose)
    }
}
