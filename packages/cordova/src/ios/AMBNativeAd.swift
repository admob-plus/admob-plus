import Foundation
import GoogleMobileAds

protocol AMBNativeAdViewProvider: NSObjectProtocol {
    func createView(_ nativeAd: GADNativeAd) -> GADNativeAdView
    // delegate
    func didShow(_ ad: AMBManagedNativeAd)
    func didHide(_ ad: AMBManagedNativeAd)
}

extension AMBNativeAdViewProvider {
    func didShow(_ ad: AMBManagedNativeAd) {}
    func didHide(_ ad: AMBManagedNativeAd) {}
}

class AMBManagedNativeAd: AMBAdBase, AMBGenericAd, GADNativeAdDelegate {
    let mAd: GADNativeAd
    let mProvider: AMBNativeAdViewProvider

    lazy var view: GADNativeAdView = {
        let nativeAdView = mProvider.createView(mAd)

        // Associate the native ad view with the native ad object. This is
        // required to make the ad clickable.
        // Note: this should always be done after populating the ad views.
        nativeAdView.nativeAd = mAd

        return nativeAdView
    }()

    init(id: Int, adUnitId: String, nativeAd: GADNativeAd, provider: AMBNativeAdViewProvider) {
        mAd = nativeAd
        mProvider = provider

        super.init(id: id, adUnitId: adUnitId)

        mAd.delegate = self
    }

    func isLoaded() -> Bool {
        return true
    }

    func load(_ ctx: AMBContext) {
        ctx.success()
    }

    func show(_ ctx: AMBContext) {
        if let x = ctx.opt("x") as? Double,
           let y = ctx.opt("y") as? Double,
           let w = ctx.opt("width") as? Double,
           let h = ctx.opt("height") as? Double {
            view.frame = CGRect(x: x, y: y, width: w, height: h)
        }

        view.isHidden = false
        mProvider.didShow(self)
    }

    func hide(_ ctx: AMBContext) {
        view.isHidden = true
        mProvider.didHide(self)
        ctx.success()
    }

    func nativeAdDidRecordImpression(_ nativeAd: GADNativeAd) {
        self.emit(AMBEvents.adImpression, nativeAd)
    }

    func nativeAdDidRecordClick(_ nativeAd: GADNativeAd) {
        self.emit(AMBEvents.adClick, nativeAd)
    }

    func nativeAdWillPresentScreen(_ nativeAd: GADNativeAd) {
        self.emit(AMBEvents.adShow, nativeAd)
    }

    func nativeAdWillDismissScreen(_ nativeAd: GADNativeAd) {
        // The native ad will dismiss a full screen view.
    }

    func nativeAdDidDismissScreen(_ nativeAd: GADNativeAd) {
        self.emit(AMBEvents.adDismiss, nativeAd)
    }

    func nativeAdWillLeaveApplication(_ nativeAd: GADNativeAd) {
        // The native ad will cause the application to become inactive and
        // open a new application.
    }
}

class AMBNativeAd: AMBAdBase, AMBGenericAd, GADNativeAdLoaderDelegate, AMBNativeAdViewProvider {
    var mLoader: GADAdLoader!
    var mRequest: GADRequest

    init(id: Int, adUnitId: String, request: GADRequest) {
        mRequest = request

        super.init(id: id, adUnitId: adUnitId)

        let multipleAdsOptions = GADMultipleAdsAdLoaderOptions()
        multipleAdsOptions.numberOfAds = 1

        mLoader = GADAdLoader(adUnitID: adUnitId, rootViewController: plugin.viewController,
                              adTypes: [.native],
                              options: [multipleAdsOptions])
        mLoader.delegate = self
    }

    convenience init?(_ ctx: AMBContext) {
        guard let id = ctx.optId(),
              let adUnitId = ctx.optAdUnitID()
        else {
            return nil
        }
        self.init(id: id,
                  adUnitId: adUnitId,
                  request: ctx.optGADRequest())
    }

    func load(_ ctx: AMBContext) {
        mLoader.load(mRequest)
        ctx.success()
    }

    func isLoaded() -> Bool {
        return true
    }

    func show(_ ctx: AMBContext) {
    }

    func adLoader(_ adLoader: GADAdLoader, didReceive nativeAd: GADNativeAd) {
        let ad = AMBManagedNativeAd(id: nativeAd.hashValue, adUnitId: adUnitId, nativeAd: nativeAd, provider: self)
        self.emit(AMBEvents.adLoad, ["nativeAdId": ad.id])
    }

    func adLoader(_ adLoader: GADAdLoader, didFailToReceiveAdWithError error: Error) {
        self.emit(AMBEvents.adLoadFail, error)
    }

    func createView(_ ad: GADNativeAd) -> GADNativeAdView {
        let nativeAd = ad
        let nibView = Bundle.main.loadNibNamed("NativeAdView", owner: nil, options: nil)?.first
        guard let nativeAdView = nibView as? GADNativeAdView else {
            fatalError("cannot load NativeAdView")
        }
        plugin.viewController.view.superview?.addSubview(nativeAdView)

        (nativeAdView.headlineView as? UILabel)?.text = nativeAd.headline
        nativeAdView.mediaView?.mediaContent = nativeAd.mediaContent

        if let mediaView = nativeAdView.mediaView, nativeAd.mediaContent.aspectRatio > 0 {
            let heightConstraint = NSLayoutConstraint(
                item: mediaView,
                attribute: .height,
                relatedBy: .equal,
                toItem: mediaView,
                attribute: .width,
                multiplier: CGFloat(1 / nativeAd.mediaContent.aspectRatio),
                constant: 0)
            heightConstraint.isActive = true
        }

        // These assets are not guaranteed to be present. Check that they are before
        // showing or hiding them.
        (nativeAdView.bodyView as? UILabel)?.text = nativeAd.body
        nativeAdView.bodyView?.isHidden = nativeAd.body == nil

        (nativeAdView.callToActionView as? UIButton)?.setTitle(nativeAd.callToAction, for: .normal)
        nativeAdView.callToActionView?.isHidden = nativeAd.callToAction == nil

        (nativeAdView.iconView as? UIImageView)?.image = nativeAd.icon?.image
        nativeAdView.iconView?.isHidden = nativeAd.icon == nil

        //        (nativeAdView.starRatingView as? UIImageView)?.image = imageOfStars(
        //            fromStarRating: nativeAd.starRating)
        //        nativeAdView.starRatingView?.isHidden = nativeAd.starRating == nil

        (nativeAdView.storeView as? UILabel)?.text = nativeAd.store
        nativeAdView.storeView?.isHidden = nativeAd.store == nil

        (nativeAdView.priceView as? UILabel)?.text = nativeAd.price
        nativeAdView.priceView?.isHidden = nativeAd.price == nil

        (nativeAdView.advertiserView as? UILabel)?.text = nativeAd.advertiser
        nativeAdView.advertiserView?.isHidden = nativeAd.advertiser == nil

        // In order for the SDK to process touch events properly, user interaction should be disabled.
        nativeAdView.callToActionView?.isUserInteractionEnabled = false

        return nativeAdView
    }
}
