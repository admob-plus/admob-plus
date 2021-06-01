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
    let mManager: AMBNativeAd
    let mAd: GADNativeAd

    lazy var viewProvider: AMBNativeAdViewProvider = {
        return mManager.viewProvider
    }()

    lazy var view: GADNativeAdView = {
        let nativeAdView = viewProvider.createView(mAd)

        // Associate the native ad view with the native ad object. This is
        // required to make the ad clickable.
        // Note: this should always be done after populating the ad views.
        nativeAdView.nativeAd = mAd

        return nativeAdView
    }()

    init(nativeAd: GADNativeAd, manager: AMBNativeAd) {
        mAd = nativeAd
        mManager = manager

        super.init(id: nativeAd.hashValue, adUnitId: manager.adUnitId)

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

        if let rootView = plugin.viewController.view.superview, view.superview != rootView {
            rootView.addSubview(view)
        }
        view.isHidden = false

        viewProvider.didShow(self)
    }

    func hide(_ ctx: AMBContext) {
        view.isHidden = true
        viewProvider.didHide(self)
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

class AMBNativeAd: AMBAdBase, AMBGenericAd, GADNativeAdLoaderDelegate {
    static var providers = [String: AMBNativeAdViewProvider]()

    var mLoader: GADAdLoader!
    let viewProvider: AMBNativeAdViewProvider
    let mRequest: GADRequest

    init(id: Int, adUnitId: String, request: GADRequest, viewProvider: AMBNativeAdViewProvider) {
        mRequest = request
        self.viewProvider = viewProvider

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
              let adUnitId = ctx.optAdUnitID(),
              let viewProvider = Self.providers["default"]
        else {
            return nil
        }
        self.init(id: id,
                  adUnitId: adUnitId,
                  request: ctx.optGADRequest(),
                  viewProvider: viewProvider)
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
        let ad = AMBManagedNativeAd(nativeAd: nativeAd, manager: self)
        self.emit(AMBEvents.adLoad, ["nativeAdId": ad.id])
    }

    func adLoader(_ adLoader: GADAdLoader, didFailToReceiveAdWithError error: Error) {
        self.emit(AMBEvents.adLoadFail, error)
    }
}
