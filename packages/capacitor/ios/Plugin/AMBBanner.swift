import Capacitor
import GoogleMobileAds

// Fix for https://github.com/admob-plus/admob-plus/issues/298
private class AMBContainerView: UIView {
    var subview: UIView?

    override func didAddSubview(_ subview: UIView) {
        if self.subview == nil {
            self.subview = subview
        }
        subview.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            subview.leadingAnchor.constraint(equalTo: self.leadingAnchor),
            subview.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            subview.topAnchor.constraint(equalTo: self.topAnchor),
            subview.bottomAnchor.constraint(equalTo: self.bottomAnchor)
        ])
    }

    override func willRemoveSubview(_ subview: UIView) {
        if self.subview != nil {
            // TODO better way to re-add webview
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.0) {
                self.addSubview(self.subview!)
            }
        }
    }
}

class AMBBanner: AMBAdBase, GADAdSizeDelegate, GADBannerViewDelegate {
    static let stackView = UIStackView()

    static var topConstraint = {
        return AMBBanner.stackView.topAnchor.constraint(
            equalTo: UIApplication.shared.keyWindow!.safeAreaLayoutGuide.topAnchor)
    }()

    static var bottomConstraint = {
        return AMBBanner.stackView.bottomAnchor.constraint(
            equalTo: UIApplication.shared.keyWindow!.safeAreaLayoutGuide.bottomAnchor)
    }()

    let adSize: GADAdSize!
    let position: String!
    var bannerView: GADBannerView!

    private let mainView = AMBContainerView()

    let stackView = AMBBanner.stackView
    let rootView = AMBContext.window
    let webView = AMBContext.plugin.webView!

    let topConstraint = AMBBanner.topConstraint
    let bottomConstraint = AMBBanner.bottomConstraint

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
            bannerView.rootViewController = AMBContext.rootViewController
        }

        bannerView.adUnitID = adUnitId
        bannerView.load(ctx.optGADRequest())
    }

    func show(_ ctx: AMBContext) {
        load(ctx)

        prepareStackView()

        switch position {
        case "top":
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

    func adView(_ bannerView: GADBannerView, willChangeAdSizeTo adSize: GADAdSize) {
        self.emit(AMBEvents.bannerSizeChange, adSize)
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
            mainView.addSubview(webView)

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

    private func updateLayout() {
        if stackView.arrangedSubviews.first is GADBannerView {
            AMBContext.plugin.bridge?.statusBarStyle = .lightContent
            topConstraint.isActive = true
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
