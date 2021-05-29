import GoogleMobileAds

class AMBInterstitial: AMBAdBase, GADFullScreenContentDelegate {
    var mAd: GADInterstitialAd?

    deinit {
        clear()
    }

    func isLoaded() -> Bool {
        return self.mAd != nil
    }

    func load(_ ctx: AMBContext) {
        clear()

        GADInterstitialAd.load(
            withAdUnitID: adUnitId,
            request: ctx.optGADRequest(),
            completionHandler: { ad, error in
                if error != nil {
                    self.emit(AMBEvents.interstitialLoadFail, error!)
                    ctx.error(error)
                    return
                }

                self.mAd = ad
                ad?.fullScreenContentDelegate = self

                self.emit(AMBEvents.interstitialLoad)

                ctx.success()
         })
    }

    func show(_ ctx: AMBContext) {
        if isLoaded() {
            mAd?.present(fromRootViewController: plugin.viewController)
            ctx.success()
        } else {
            ctx.error("Ad is not loaded")
        }
    }

    func adDidRecordImpression(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.interstitialImpression)
    }

    func ad(_ ad: GADFullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        clear()
        self.emit(AMBEvents.interstitialShowFail, error)
    }

    func adDidPresentFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.interstitialShow)
    }

    func adDidDismissFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        clear()
        self.emit(AMBEvents.interstitialDismiss)
    }

    private func clear() {
        mAd?.fullScreenContentDelegate = nil
        mAd = nil
    }
}
