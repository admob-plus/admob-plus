class AMSRewardVideo: AMSAdBase, GADRewardedAdDelegate {
    var rewardBasedVideo: GADRewardedAd?

    override init(id: Int, adUnitID: String) {
        super.init(id: id, adUnitID: adUnitID)
    }

    deinit {
        rewardBasedVideo = nil
    }

    func isReady() -> Bool {
        return (rewardBasedVideo?.isReady == true)
    }

    func load(request: GADRequest) {
        let rewardBasedVideo = GADRewardedAd(adUnitID: adUnitID)
        self.rewardBasedVideo = rewardBasedVideo

        rewardBasedVideo.load(request) { error in
            if let error = error {
                NSLog("Error while loading the reward based video: %@", error)
                self.plugin.emit(eventType: AMSEvents.rewardVideoLoadFail)
            } else {
                self.plugin.emit(eventType: AMSEvents.rewardVideoLoad)
            }
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
