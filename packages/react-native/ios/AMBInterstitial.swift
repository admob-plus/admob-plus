import GoogleMobileAds

class AMBInterstitial: AMBAdBase, AMBGenericAd, GADFullScreenContentDelegate {
    var ad: GADInterstitialAd?

    deinit {
        clear()
    }

    func isLoaded() -> Bool {
        return self.ad != nil
    }

    func load(_ ctx: AMBContext) {
        clear()

        GADInterstitialAd.load(
            withAdUnitID: adUnitId,
            request: ctx.optGADRequest(),
            completionHandler: { ad, error in
                if error != nil {
                    self.emit(AMBEvents.adLoadFail, error!)
                    ctx.error(error!)
                    return
                }

                self.ad = ad
                ad?.fullScreenContentDelegate = self

                self.emit(AMBEvents.adLoad)

                ctx.success()
            })
    }

    func show(_ ctx: AMBContext) {
        ad?.present(fromRootViewController: self.rootViewController)
        ctx.success()
    }

    func adDidRecordImpression(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.adImpression)
    }

    func ad(_ ad: GADFullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        clear()
        self.emit(AMBEvents.adShowFail, error)
    }

    func adDidPresentFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.adShow)
    }

    func adDidDismissFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        clear()
        self.emit(AMBEvents.adDismiss)
    }

    private func clear() {
        ad?.fullScreenContentDelegate = nil
        ad = nil
    }
}
