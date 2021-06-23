import Capacitor
import GoogleMobileAds

class AMBRewardedInterstitial: AMBAdBase, GADFullScreenContentDelegate {
    var rewardedAd: GADRewardedInterstitialAd?

    deinit {
        rewardedAd?.fullScreenContentDelegate = nil
        rewardedAd = nil
    }

    override func isLoaded() -> Bool {
        return self.rewardedAd != nil
    }

    override func load(_ ctx: AMBContext) {
        GADRewardedInterstitialAd.load(withAdUnitID: adUnitId, request: adRequest, completionHandler: { ad, error in
            if error != nil {
                self.emit(AMBEvents.rewardedInterstitialLoadFail, error!)
                ctx.reject(error!)
                return
            }

            self.rewardedAd = ad
            ad?.fullScreenContentDelegate = self

            self.emit(AMBEvents.rewardedInterstitialLoad)
            ctx.resolve()
        })
    }

    override func show(_ ctx: AMBContext) {
        self.rewardedAd?.present(fromRootViewController: AMBContext.rootViewController, userDidEarnRewardHandler: {
            self.emit(AMBEvents.rewardedInterstitialReward, self.rewardedAd!.adReward)
        })
        ctx.resolve()
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
