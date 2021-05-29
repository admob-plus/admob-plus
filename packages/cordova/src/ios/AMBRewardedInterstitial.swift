import GoogleMobileAds

class AMBRewardedInterstitial: AMBAdBase, GADFullScreenContentDelegate {
    var mAd: GADRewardedInterstitialAd?

    deinit {
        clear()
    }

    func isLoaded() -> Bool {
        return self.mAd != nil
    }

    func load(_ ctx: AMBContext) {
        clear()

        GADRewardedInterstitialAd.load(withAdUnitID: adUnitId, request: ctx.optGADRequest(), completionHandler: { ad, error in
            if error != nil {
                self.emit(AMBEvents.rewardedInterstitialLoadFail, error!)

                ctx.error(error)
                return
            }

            self.mAd = ad
            ad?.fullScreenContentDelegate = self
            ad?.serverSideVerificationOptions = ctx.optGADServerSideVerificationOptions()

            self.emit(AMBEvents.rewardedInterstitialLoad)

            ctx.success()
        })
    }

    func show(_ ctx: AMBContext) {
        if isLoaded() {
            mAd?.present(fromRootViewController: plugin.viewController, userDidEarnRewardHandler: {
                let reward = self.mAd!.adReward
                self.emit(AMBEvents.rewardedInterstitialReward, reward)
            })
            ctx.success()
        } else {
            ctx.error("Ad is not loaded")
        }
    }

    func adDidRecordImpression(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.rewardedInterstitialImpression)
    }

    func ad(_ ad: GADFullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        clear()
        self.emit(AMBEvents.rewardedInterstitialShowFail, error)
    }

    func adDidPresentFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.rewardedInterstitialShow)
    }

    func adDidDismissFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        clear()
        self.emit(AMBEvents.rewardedInterstitialDismiss)
    }

    private func clear() {
        mAd?.fullScreenContentDelegate = nil
        mAd = nil
    }
}
