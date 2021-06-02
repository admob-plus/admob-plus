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
                self.emit(AMBEvents.adLoadFail, error!)

                ctx.error(error)
                return
            }

            self.rewardedInterstitial = ad
            ad?.fullScreenContentDelegate = self
            ad?.serverSideVerificationOptions = ctx.optGADServerSideVerificationOptions()

            self.emit(AMBEvents.adLoad)

            ctx.success()
        })
    }

    func show(_ ctx: AMBContext) {
        rewardedInterstitial?.present(fromRootViewController: rootViewController, userDidEarnRewardHandler: {
            let reward = self.rewardedInterstitial!.adReward
            self.emit(AMBEvents.rewardedInterstitialReward, reward)
        })
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
        self.emit(AMBEvents.rewardedInterstitialDismiss)
    }
}
