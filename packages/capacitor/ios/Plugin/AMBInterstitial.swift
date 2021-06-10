import Capacitor
import GoogleMobileAds

class AMBInterstitial: AMBAdBase, AMBGenericAd, GADFullScreenContentDelegate {
    var interstitial: GADInterstitialAd?

    deinit {
        interstitial?.fullScreenContentDelegate = nil
    }

    func isLoaded() -> Bool {
        return self.interstitial != nil
    }

    func load(_ ctx: AMBCoreContext) {
        load(ctx as! AMBContext)
    }

    func show(_ ctx: AMBCoreContext) {
        show(ctx as! AMBContext)
    }

    func load(_ ctx: AMBContext) {
        GADInterstitialAd.load(
            withAdUnitID: adUnitId,
            request: ctx.optGADRequest(),
            completionHandler: { ad, error in
                if error != nil {
                    self.emit(AMBEvents.rewardedInterstitialLoadFail, error!)
                    ctx.reject(error!)
                    return
                }

                self.interstitial = ad
                ad?.fullScreenContentDelegate = self

                self.emit(AMBEvents.interstitialLoad)
                ctx.resolve()
         })
    }

    func show(_ ctx: AMBContext) {
        self.interstitial?.present(fromRootViewController: AMBContext.rootViewController)
        ctx.resolve()
    }

    func adDidRecordImpression(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.interstitialImpression)
    }

    func ad(_ ad: GADFullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        self.emit(AMBEvents.interstitialShowFail, error)
    }

    func adDidPresentFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.interstitialShow)
    }

    func adDidDismissFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.interstitialDismiss)
    }
}
