import Capacitor
import GoogleMobileAds

class AMBRewarded: AMBAdBase, AMBGenericAd, GADFullScreenContentDelegate {
    var rewardedAd: GADRewardedAd?

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

    func load(_ ctx: AMBCoreContext) {
        load(ctx as! AMBContext)
    }

    func show(_ ctx: AMBCoreContext) {
        show(ctx as! AMBContext)
    }

    func load(_ ctx: AMBContext) {
        GADRewardedAd.load(withAdUnitID: adUnitId, request: ctx.optGADRequest(), completionHandler: { ad, error in
            if error != nil {
                self.emit(AMBEvents.rewardedLoadFail, error!)
                ctx.reject(error!)
                return
            }

            self.rewardedAd = ad
            ad?.fullScreenContentDelegate = self

            self.emit(AMBEvents.rewardedLoad)
            ctx.resolve()
        })
    }

    func show(_ ctx: AMBContext) {
        if self.isLoaded() {
            self.rewardedAd?.present(fromRootViewController: AMBContext.rootViewController, userDidEarnRewardHandler: {
                self.emit(AMBEvents.rewardedReward, self.rewardedAd!.adReward)
            })
            ctx.resolve()
        } else {
            ctx.reject("Ad is not loaded")
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
