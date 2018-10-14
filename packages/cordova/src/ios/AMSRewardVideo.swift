class AMSRewardVideo: AMSAdBase, GADRewardBasedVideoAdDelegate {
    var rewardBasedVideo: GADRewardBasedVideoAd?

    deinit {
        rewardBasedVideo = nil
    }

    func load(adUnitID: String) {
        rewardBasedVideo = GADRewardBasedVideoAd.sharedInstance()
        rewardBasedVideo?.delegate = self

        if rewardBasedVideo?.isReady == false {
            rewardBasedVideo?.load(GADRequest(), withAdUnitID: adUnitID)
        }
    }

    func show() {
        if rewardBasedVideo?.isReady == true {
            rewardBasedVideo?.present(fromRootViewController: plugin.viewController)
        }
    }

    func rewardBasedVideoAd(_ rewardBasedVideoAd: GADRewardBasedVideoAd, didRewardUserWith reward: GADAdReward) {
        plugin.emit(eventType: AMSEvents.rewardVideoReward)
    }

    func rewardBasedVideoAdDidReceive(_ rewardBasedVideoAd: GADRewardBasedVideoAd) {
        plugin.emit(eventType: AMSEvents.rewardVideoLoad)
    }

    func rewardBasedVideoAdDidOpen(_ rewardBasedVideoAd: GADRewardBasedVideoAd) {
        plugin.emit(eventType: AMSEvents.rewardVideoOpen)
    }

    func rewardBasedVideoAdDidClose(_ rewardBasedVideoAd: GADRewardBasedVideoAd) {
        plugin.emit(eventType: AMSEvents.rewardVideoClose)
    }

    func rewardBasedVideoAdDidStartPlaying(_ rewardBasedVideoAd: GADRewardBasedVideoAd) {
        plugin.emit(eventType: AMSEvents.rewardVideoStart)
    }

    func rewardBasedVideoAdDidCompletePlaying(_ rewardBasedVideoAd: GADRewardBasedVideoAd) {
        plugin.emit(eventType: AMSEvents.rewardVideoComplete)
    }

    func rewardBasedVideoAdWillLeaveApplication(_ rewardBasedVideoAd: GADRewardBasedVideoAd) {
        plugin.emit(eventType: AMSEvents.rewardVideoExitApp)
    }
}
