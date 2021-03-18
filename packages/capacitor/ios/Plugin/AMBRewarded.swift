import Capacitor
import GoogleMobileAds

class AMBRewarded: AMBAdBase, GADFullScreenContentDelegate {
    var rewardedAd: GADRewardedAd?

    override init(id: Int, adUnitId: String) {
        super.init(id: id, adUnitId: adUnitId)
    }

    deinit {
        rewardedAd = nil
    }

    func isReady() -> Bool {
        return self.rewardedAd != nil
    }

    func load(_ call: CAPPluginCall, request: GADRequest) {
        GADRewardedAd.load(withAdUnitID: adUnitId, request: request, completionHandler: { ad, error in
            if error != nil {
                call.reject(error!.localizedDescription)
                return
            }

            self.rewardedAd = ad

            call.resolve()
        })
    }

    func show(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            if self.isReady() {
                self.rewardedAd?.present(fromRootViewController: self.rootViewController, userDidEarnRewardHandler: {
                    self.emit(AMBEvents.rewardedReward, self.rewardedAd!.adReward)
                })
            }

            call.resolve()
        }
    }

    func adDidRecordImpression(_ ad: GADFullScreenPresentingAd) {
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
