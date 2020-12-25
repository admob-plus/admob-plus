class AMSRewardVideo: AMSAdBase, GADRewardedAdDelegate {
    var rewardBasedVideo: GADRewardedAd?

    override init(id: Int, adUnitID: String) {
        super.init(id: id, adUnitID: adUnitID)
        rewardBasedVideo = GADRewardedAd(adUnitID: adUnitID)
    }

    deinit {
        rewardBasedVideo = nil
    }

    func isReady() -> Bool {
        return (rewardBasedVideo?.isReady == true)
    }

    func load(request: GADRequest) {
        if rewardBasedVideo?.isReady == false {
            rewardBasedVideo?.load(request)
        }
    }

    func show() {
        if isReady() {
            rewardBasedVideo?.present(fromRootViewController: plugin.viewController, delegate: self)
        }
    }

    func rewardedAd(_ rewardedAd: GADRewardedAd, userDidEarn reward: GADAdReward) {
        plugin.emit(eventType: AMSEvents.rewardVideoReward)
    }

    func rewardedAd(_ rewardedAd: GADRewardedAd, didFailToPresentWithError error: Error) {
        plugin.emit(eventType: AMSEvents.rewardVideoLoadFail)
    }

    func rewardedAdDidPresent(_ rewardedAd: GADRewardedAd) {
        plugin.emit(eventType: AMSEvents.rewardVideoOpen)
    }

    func rewardedAdDidDismiss(_ rewardedAd: GADRewardedAd) {
        plugin.emit(eventType: AMSEvents.rewardVideoClose)
    }
}
