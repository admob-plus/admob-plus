import GoogleMobileAds

class AMBInterstitial: AMBAdBase, AMBGenericAd, GADFullScreenContentDelegate {
    var interstitial: GADInterstitialAd?

    deinit {
        interstitial?.fullScreenContentDelegate = nil
        interstitial = nil
    }

    func isLoaded() -> Bool {
        return self.interstitial != nil
    }

    func load(_ ctx: AMBContext) {
        GADInterstitialAd.load(
            withAdUnitID: adUnitId,
            request: ctx.optGADRequest(),
            completionHandler: { ad, error in
                if error != nil {
                    self.emit(AMBEvents.adLoadFail, error!)
                    ctx.error(error!)
                    return
                }

                self.interstitial = ad
                ad?.fullScreenContentDelegate = self

                self.emit(AMBEvents.adLoad)

                ctx.success()
            })
    }

    func show(_ ctx: AMBContext) {
        interstitial?.present(fromRootViewController: self.rootViewController)
        ctx.success()
    }

    func adDidRecordImpression(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.adImpression)
    }

    func ad(_ ad: GADFullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        self.emit(AMBEvents.adShowFail, error)
    }

    func adDidPresentFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.adShow)
    }

    func adDidDismissFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.adDismiss)
    }
}
