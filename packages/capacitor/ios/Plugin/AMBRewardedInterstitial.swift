import Capacitor
import GoogleMobileAds

class AMBRewardedInterstitial: AMBAdBase, GADFullScreenContentDelegate {
    var rewardedAd: GADRewardedInterstitialAd?

    override init(id: Int, adUnitId: String) {
        super.init(id: id, adUnitId: adUnitId)
    }

    deinit {
        rewardedAd?.fullScreenContentDelegate = nil
    }

    func isReady() -> Bool {
        return self.rewardedAd != nil
    }

    func load(_ call: CAPPluginCall, request: GADRequest) {
        GADRewardedInterstitialAd.load(withAdUnitID: adUnitId, request: request, completionHandler: { ad, error in
            if error != nil {
                call.reject(error!.localizedDescription)
                return
            }

            self.rewardedAd = ad

            call.resolve()
        })
    }

    func show() {
        if self.isReady() {
            self.rewardedAd?.present(fromRootViewController: self.rootViewController, userDidEarnRewardHandler: {
                self.emit(AMBEvents.rewardedInterstitialReward, self.rewardedAd!.adReward)
            })
        }
    }

    func adDidRecordImpression(_ ad: GADFullScreenPresentingAd) {
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
