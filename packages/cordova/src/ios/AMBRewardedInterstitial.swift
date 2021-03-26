import GoogleMobileAds

class AMBRewardedInterstitial: AMBAdBase, GADFullScreenContentDelegate {
    var rewardedInterstitial: GADRewardedInterstitialAd?

    deinit {
        rewardedInterstitial?.fullScreenContentDelegate = nil
        rewardedInterstitial = nil
    }

    func isLoaded() -> Bool {
        return self.rewardedInterstitial != nil
    }

    func load(_ ctx: AMBContext) {
        GADRewardedInterstitialAd.load(withAdUnitID: adUnitId, request: ctx.optGADRequest(), completionHandler: { ad, error in
            if error != nil {
                self.emit(AMBEvents.rewardedInterstitialLoadFail, error!)

                ctx.error(error)
                return
            }

            self.rewardedInterstitial = ad
            ad?.fullScreenContentDelegate = self
            ad?.serverSideVerificationOptions = ctx.optGADServerSideVerificationOptions()

            self.emit(AMBEvents.rewardedInterstitialLoad)

            ctx.success()
        })
    }

    func show(_ ctx: AMBContext) {
        if isLoaded() {
            rewardedInterstitial?.present(fromRootViewController: plugin.viewController, userDidEarnRewardHandler: {
                let reward = self.rewardedInterstitial!.adReward
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
        self.emit(AMBEvents.rewardedInterstitialShowFail, error)
    }

    func adDidPresentFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.rewardedInterstitialShow)
    }

    func adDidDismissFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.rewardedInterstitialDismiss)
    }
}
