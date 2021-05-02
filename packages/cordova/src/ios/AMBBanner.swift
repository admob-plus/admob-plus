import GoogleMobileAds
import UIKit

class AMBBanner: AMBAdBase, GADBannerViewDelegate, GADAdSizeDelegate {
    static let stackView = UIStackView(frame: rootView.frame)
    static let placeholderView = UIView(frame: stackView.frame)

    static let priortyLeast = UILayoutPriority(10)

    static var rootObservation: NSKeyValueObservation?
    static var marginTop: CGFloat?

    static var rootView: UIView {
        return AMBContext.plugin.viewController.view!
    }

    static var mainView: UIView {
        return AMBContext.plugin.webView
    }

    static var statusBarBackgroundView: UIView? {
        let statusBarFrame = UIApplication.shared.statusBarFrame
        return rootView.subviews.first(where: { $0.frame.equalTo(statusBarFrame) })
    }

    static var topAnchor: NSLayoutYAxisAnchor {
        if #available(iOS 11.0, *) {
            return rootView.safeAreaLayoutGuide.topAnchor
        } else {
            return rootView.topAnchor
        }
    }

    static var bottomAnchor: NSLayoutYAxisAnchor {
        if #available(iOS 11.0, *) {
            return rootView.safeAreaLayoutGuide.bottomAnchor
        } else {
            return rootView.bottomAnchor
        }
    }

    static let topConstraint = stackView.topAnchor.constraint(equalTo: topAnchor, constant: 0)

    static let bottomConstraint = stackView.bottomAnchor.constraint(equalTo: bottomAnchor, constant: 0)

    static func config(_ ctx: AMBContext) {
        if let bgColor = ctx.optBackgroundColor() {
            Self.rootView.backgroundColor = bgColor
        }
        Self.marginTop = ctx.optMarginTop()
        if Self.marginTop != nil {
            Self.topConstraint.constant = Self.marginTop!
        }
        if let marginBottom = ctx.optMarginBottom() {
            Self.bottomConstraint.constant = marginBottom * -1
        }
        ctx.success()
    }

    private static func prepareStackView() {
        if stackView.arrangedSubviews.isEmpty {
            var constraints: [NSLayoutConstraint] = []

            stackView.axis = .vertical
            stackView.distribution = .fill
            stackView.alignment = .fill
            rootView.addSubview(stackView)
            rootView.bringSubviewToFront(mainView)
            stackView.translatesAutoresizingMaskIntoConstraints = false
            constraints += [
                stackView.leadingAnchor.constraint(equalTo: rootView.leadingAnchor),
                stackView.trailingAnchor.constraint(equalTo: rootView.trailingAnchor)
            ]

            placeholderView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
            stackView.addArrangedSubview(placeholderView)
            mainView.translatesAutoresizingMaskIntoConstraints = false
            constraints += [
                mainView.leadingAnchor.constraint(equalTo: placeholderView.leadingAnchor),
                mainView.trailingAnchor.constraint(equalTo: placeholderView.trailingAnchor),
                mainView.topAnchor.constraint(equalTo: placeholderView.topAnchor),
                mainView.bottomAnchor.constraint(equalTo: placeholderView.bottomAnchor)
            ]

            let constraintTop = stackView.topAnchor.constraint(equalTo: rootView.topAnchor)
            let constraintBottom = stackView.bottomAnchor.constraint(equalTo: rootView.bottomAnchor)
            constraintTop.priority = priortyLeast
            constraintBottom.priority = priortyLeast
            constraints += [
                constraintBottom,
                constraintTop
            ]
            NSLayoutConstraint.activate(constraints)

            rootObservation = rootView.observe(\.subviews, options: [.old, .new]) { (_, _) in
                updateLayout()
            }
        }
    }

    private static func updateLayout() {
        if let barView = Self.statusBarBackgroundView,
           !barView.isHidden && rootView.subviews.contains(stackView) {
            NSLayoutConstraint.activate([
                stackView.topAnchor.constraint(equalTo: barView.bottomAnchor, constant: Self.marginTop ?? 0)
            ])
        } else if stackView.arrangedSubviews.first is GADBannerView {
            NSLayoutConstraint.activate([
                topConstraint
            ])
        } else {
            topConstraint.isActive = false
        }

        if stackView.arrangedSubviews.last is GADBannerView {
            NSLayoutConstraint.activate([
                bottomConstraint
            ])
        } else {
            bottomConstraint.isActive = false
        }
    }

    let adSize: GADAdSize!
    let position: String!
    let offset: CGFloat?
    var bannerView: GADBannerView!

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
            Self.stackView.removeArrangedSubview(bannerView)
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
        if let offset = self.offset {
            addBannerView(offset)
        } else {
            Self.prepareStackView()

            switch position {
            case AMBBannerPosition.top:
                Self.stackView.insertArrangedSubview(bannerView, at: 0)
            default:
                Self.stackView.addArrangedSubview(bannerView)
            }
        }

        if bannerView.isHidden {
            bannerView.isHidden = false
        }

        Self.updateLayout()
        ctx.success()
    }

    func hide(_ ctx: AMBContext) {
        if bannerView != nil {
            bannerView.isHidden = true
            Self.stackView.removeArrangedSubview(bannerView)
            Self.updateLayout()
        }
        ctx.success()
    }

    func bannerViewDidReceiveAd(_ bannerView: GADBannerView) {
        self.emit(AMBEvents.bannerLoad)
        self.emit(AMBEvents.bannerSize, [
            "size": [
                "width": bannerView.frame.size.width,
                "height": bannerView.frame.size.height,
                "widthInPixels": round(bannerView.frame.size.width * UIScreen.main.scale),
                "heightInPixels": round(bannerView.frame.size.height * UIScreen.main.scale)
            ]
        ])
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

    private func addBannerView(_ offset: CGFloat) {
        let rootView = Self.rootView
        bannerView.translatesAutoresizingMaskIntoConstraints = false
        rootView.addSubview(bannerView)
        rootView.bringSubviewToFront(bannerView)
        var constraints = [
            bannerView.centerXAnchor.constraint(equalTo: rootView.centerXAnchor)
        ]
        switch position {
        case AMBBannerPosition.top:
            constraints += [
                bannerView.topAnchor.constraint(equalTo: rootView.topAnchor,
                                                constant: offset)
            ]
        default:
            constraints += [
                bannerView.bottomAnchor.constraint(equalTo: rootView.bottomAnchor,
                                                   constant: offset * -1)
            ]
        }
        NSLayoutConstraint.activate(constraints)
    }
}
