class AMSRewarded: AMSAdBase, GADRewardedAdDelegate {
    var rewardedAd: GADRewardedAd?

    override init(id: Int, adUnitID: String) {
        super.init(id: id, adUnitID: adUnitID)
        rewardedAd = GADRewardedAd(adUnitID: adUnitID)
    }

    deinit {
        rewardedAd = nil
    }

    func isReady() -> Bool {
        return (rewardedAd?.isReady == true)
    }

    func load(request: GADRequest) {
        if rewardedAd?.isReady == false {
            rewardedAd?.load(request)
        }
    }

    func show() {
        if isReady() {
            rewardedAd?.present(fromRootViewController: plugin.viewController, delegate: self)
        }
    }

    func rewardedAd(_ rewardedAd: GADRewardedAd, userDidEarn reward: GADAdReward) {
        plugin.emit(eventType: AMSEvents.rewardedReward)
    }

    func rewardedAd(_ rewardedAd: GADRewardedAd, didFailToPresentWithError error: Error) {
        plugin.emit(eventType: AMSEvents.rewardedShowFail)
    }

    func rewardedAdDidPresent(_ rewardedAd: GADRewardedAd) {
        plugin.emit(eventType: AMSEvents.rewardedOpen)
    }

    func rewardedAdDidDismiss(_ rewardedAd: GADRewardedAd) {
        plugin.emit(eventType: AMSEvents.rewardedClose)
    }
}
