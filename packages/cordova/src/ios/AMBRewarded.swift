import GoogleMobileAds

class AMBRewarded: AMBAdBase, GADFullScreenContentDelegate {
    var mAd: GADRewardedAd?

    deinit {
        clear()
    }

    func isLoaded() -> Bool {
        return self.mAd != nil
    }

    func load(_ ctx: AMBContext) {
        clear()

        GADRewardedAd.load(withAdUnitID: adUnitId, request: ctx.optGADRequest(), completionHandler: { ad, error in
            if error != nil {
                self.emit(AMBEvents.rewardedLoadFail, error!)

                ctx.error(error)
                return
            }

            self.mAd = ad
            ad?.fullScreenContentDelegate = self
            ad?.serverSideVerificationOptions = ctx.optGADServerSideVerificationOptions()

            self.emit(AMBEvents.rewardedLoad)

            ctx.success()
        })
    }

    func show(_ ctx: AMBContext) {
        if isLoaded() {
            mAd?.present(fromRootViewController: plugin.viewController, userDidEarnRewardHandler: {
                let reward = self.mAd!.adReward
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
        clear()
        self.emit(AMBEvents.rewardedShowFail, error)
    }

    func adDidPresentFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.rewardedShow)
    }

    func adDidDismissFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        clear()
        self.emit(AMBEvents.rewardedDismiss)
    }

    private func clear() {
        mAd?.fullScreenContentDelegate = nil
        mAd = nil
    }
}
