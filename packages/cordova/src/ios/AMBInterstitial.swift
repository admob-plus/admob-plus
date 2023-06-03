import GoogleMobileAds

class AMBInterstitial: AMBAdBase, GADFullScreenContentDelegate {
    var mAd: GADInterstitialAd?

    deinit {
        clear()
    }

    override func isLoaded() -> Bool {
        return self.mAd != nil
    }

    override func load(_ ctx: AMBContext) {
        clear()

        GADInterstitialAd.load(
            withAdUnitID: adUnitId,
            request: adRequest,
            completionHandler: { ad, error in
                if error != nil {
                    self.emit(AMBEvents.adLoadFail, error!)
                    ctx.reject(error!)
                    return
                }

                self.mAd = ad
                ad?.fullScreenContentDelegate = self

                self.emit(AMBEvents.adLoad)

                ctx.resolve()
         })
    }

    override func show(_ ctx: AMBContext) {
        mAd?.present(fromRootViewController: plugin.viewController)
        ctx.resolve()
    }

    func adDidRecordImpression(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.adImpression)
    }

    func ad(_ ad: GADFullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        clear()
        self.emit(AMBEvents.adShowFail, error)
    }

    func adWillPresentFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.adShow)
    }

    func adDidDismissFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        clear()
        self.emit(AMBEvents.adDismiss)
    }

    private func clear() {
        mAd?.fullScreenContentDelegate = nil
        mAd = nil
    }
}
