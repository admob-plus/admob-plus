import GoogleMobileAds

class AMBBanner: AMBAdBase, GADBannerViewDelegate, GADAdSizeDelegate {
    static var placeholderView = UIView()
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
    let offset: CGFloat?
    var bannerView: GADBannerView!

    var stackView: UIStackView {
        return AMBBanner.stackView
    }

    var placeholderView: UIView {
        return AMBBanner.placeholderView
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

    init(id: Int, adUnitId: String, adSize: GADAdSize, position: String, offset: CGFloat?) {
        self.adSize = adSize
        self.position = position
        self.offset = offset

        super.init(id: id, adUnitId: adUnitId)
    }

    convenience init?(_ ctx: AMBContext) {
        guard let id = ctx.optId(),
              let adUnitId = ctx.optAdUnitID(),
              let position = ctx.optPosition()
        else {
            return nil
        }
        self.init(id: id,
                  adUnitId: adUnitId,
                  adSize: ctx.optAdSize(),
                  position: position,
                  offset: ctx.optOffset())
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

        ctx.success()
    }

    func show(_ ctx: AMBContext) {
        prepareStackView()

        if let offset = self.offset {
            addBannerView(offset)
        } else {
            switch position {
            case AMBBannerPosition.top:
                stackView.insertArrangedSubview(bannerView, at: 0)
            default:
                stackView.addArrangedSubview(bannerView)
            }
        }

        if bannerView.isHidden {
            bannerView.isHidden = false
        }

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

    @objc private func prepareStackView() {
        if stackView.arrangedSubviews.isEmpty {
            stackView.axis = .vertical
            stackView.distribution = .fill
            stackView.alignment = .fill
            rootView.addSubview(stackView)
            rootView.sendSubviewToBack(stackView)
            rootView.backgroundColor = .clear

            placeholderView.frame = mainView.frame
            placeholderView.backgroundColor = .clear
            let placeholderTop = placeholderView.topAnchor.constraint(equalTo: mainView.topAnchor)
            let placeholderBottom = placeholderView.bottomAnchor.constraint(equalTo: mainView.bottomAnchor)
            placeholderTop.priority = UILayoutPriority(10)
            placeholderBottom.priority = UILayoutPriority(10)
            stackView.addArrangedSubview(placeholderView)

            let constraintTop = stackView.topAnchor.constraint(equalTo: rootView.topAnchor)
            let constraintBottom = stackView.bottomAnchor.constraint(equalTo: rootView.bottomAnchor)
            constraintTop.priority = UILayoutPriority(10)
            constraintBottom.priority = UILayoutPriority(10)
            mainView.translatesAutoresizingMaskIntoConstraints = false
            placeholderView.translatesAutoresizingMaskIntoConstraints = false
            stackView.translatesAutoresizingMaskIntoConstraints = false
            NSLayoutConstraint.activate([
                stackView.leadingAnchor.constraint(equalTo: rootView.leadingAnchor),
                stackView.trailingAnchor.constraint(equalTo: rootView.trailingAnchor),
                constraintBottom,
                constraintTop,
                mainView.leadingAnchor.constraint(equalTo: placeholderView.leadingAnchor),
                mainView.trailingAnchor.constraint(equalTo: placeholderView.trailingAnchor),
                placeholderTop,
                placeholderBottom
            ])
        }
    }

    private func addBannerView(_ offset: CGFloat) {
        bannerView.translatesAutoresizingMaskIntoConstraints = false
        stackView.addSubview(bannerView)
        stackView.bringSubviewToFront(bannerView)
        var constraints = [
            bannerView.centerXAnchor.constraint(equalTo: stackView.centerXAnchor)
        ]
        switch position {
        case AMBBannerPosition.top:
            constraints += [
                bannerView.topAnchor.constraint(equalTo: stackView.topAnchor,
                                                constant: offset)
            ]
        default:
            constraints += [
                bannerView.bottomAnchor.constraint(equalTo: stackView.bottomAnchor,
                                                   constant: offset * -1)
            ]
        }
        NSLayoutConstraint.activate(constraints)
    }

    private func updateLayout() {
        if stackView.arrangedSubviews.first is GADBannerView {
            NSLayoutConstraint.activate([
                topConstraint,
                mainView.topAnchor.constraint(equalTo: placeholderView.topAnchor)
            ])

            if #available(iOS 12.0, *) {
                if plugin.viewController.traitCollection.userInterfaceStyle == .dark {
                    rootView.backgroundColor = .clear
                }
            }
        } else {
            topConstraint.isActive = false
        }

        if stackView.arrangedSubviews.last is GADBannerView {
            NSLayoutConstraint.activate([
                bottomConstraint,
                mainView.bottomAnchor.constraint(equalTo: placeholderView.bottomAnchor)
            ])
        } else {
            bottomConstraint.isActive = false
        }
    }

}
