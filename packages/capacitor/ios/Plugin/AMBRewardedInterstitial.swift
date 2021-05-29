import Capacitor
import GoogleMobileAds

class AMBRewardedInterstitial: AMBAdBase, GADFullScreenContentDelegate {
    var rewardedAd: GADRewardedInterstitialAd?

    override init(id: Int, adUnitId: String) {
        super.init(id: id, adUnitId: adUnitId)
    }

    deinit {
        rewardedAd?.fullScreenContentDelegate = nil
        rewardedAd = nil
    }

    func isLoaded() -> Bool {
        return self.rewardedAd != nil
    }

    func load(_ ctx: AMBContext) {
        GADRewardedInterstitialAd.load(withAdUnitID: adUnitId, request: ctx.optGADRequest(), completionHandler: { ad, error in
            if error != nil {
                self.emit(AMBEvents.rewardedInterstitialLoadFail, error!)
                ctx.error(error!)
                return
            }

            self.rewardedAd = ad
            ad?.fullScreenContentDelegate = self

            self.emit(AMBEvents.rewardedInterstitialLoad)
            ctx.success()
        })
    }

    func show(_ ctx: AMBContext) {
        if self.isLoaded() {
            self.rewardedAd?.present(fromRootViewController: AMBContext.rootViewController, userDidEarnRewardHandler: {
                self.emit(AMBEvents.rewardedInterstitialReward, self.rewardedAd!.adReward)
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
