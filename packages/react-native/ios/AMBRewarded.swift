import GoogleMobileAds

class AMBRewarded: AMBAdBase, GADFullScreenContentDelegate {
    var ad: GADRewardedAd?

    deinit {
        clear()
    }

    override func isLoaded() -> Bool {
        return self.ad != nil
    }

    override func load(_ ctx: AMBContext) {
        clear()

        GADRewardedAd.load(withAdUnitID: adUnitId, request: adRequest, completionHandler: { ad, error in
            if error != nil {
                self.emit(AMBEvents.adLoadFail, error!)
                ctx.reject(error!)
                return
            }

            self.ad = ad
            ad?.fullScreenContentDelegate = self
            ad?.serverSideVerificationOptions = ctx.optGADServerSideVerificationOptions()

            self.emit(AMBEvents.adLoad)

            ctx.resolve()
        })
    }

    override func show(_ ctx: AMBContext) {
        ad?.present(fromRootViewController: rootViewController, userDidEarnRewardHandler: {
            let reward = self.ad!.adReward
            self.emit(AMBEvents.adReward, reward)
        })
        ctx.resolve()
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
