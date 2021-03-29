import GoogleMobileAds

class AMBRewarded: AMBAdBase, GADFullScreenContentDelegate {
    var rewardedAd: GADRewardedAd?

    deinit {
        rewardedAd?.fullScreenContentDelegate = nil
        rewardedAd = nil
    }

    func isLoaded() -> Bool {
        return self.rewardedAd != nil
    }

    func load(_ ctx: AMBContext) {
        GADRewardedAd.load(withAdUnitID: adUnitId, request: ctx.optGADRequest(), completionHandler: { ad, error in
            if error != nil {
                self.emit(AMBEvents.rewardedLoadFail, error!)

                ctx.error(error)
                return
            }

            self.rewardedAd = ad
            ad?.fullScreenContentDelegate = self
            ad?.serverSideVerificationOptions = ctx.optGADServerSideVerificationOptions()

            self.emit(AMBEvents.rewardedLoad)

            ctx.success()
        })
    }

    func show(_ ctx: AMBContext) {
        if isLoaded() {
            rewardedAd?.present(fromRootViewController: plugin.viewController, userDidEarnRewardHandler: {
                let reward = self.rewardedAd!.adReward
                self.emit(AMBEvents.rewardedReward, reward)
            })
            ctx.success()
        } else {
            ctx.error("Ad is not loaded")
        }
    }

    func adDidRecordImpression(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.rewardedImpression)
    }

    func ad(_ ad: GADFullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        self.emit(AMBEvents.rewardedShowFail, error)
    }

    func adDidPresentFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.rewardedShow)
    }

    func adDidDismissFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.rewardedDismiss)
    }
}
