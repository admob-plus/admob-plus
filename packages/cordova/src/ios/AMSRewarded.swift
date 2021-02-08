class AMSRewarded: AMSAdBase, GADFullScreenContentDelegate {
    var rewardedAd: GADRewardedAd?

    override init(id: Int, adUnitID: String) {
        super.init(id: id, adUnitID: adUnitID)
    }

    deinit {
        rewardedAd = nil
    }

    func isReady() -> Bool {
        return self.rewardedAd != nil
    }

    func load(_ command: CDVInvokedUrlCommand, request: GADRequest) {
        GADRewardedAd.load(withAdUnitID: adUnitID, request: request, completionHandler: { ad, error in
            if error != nil {
                self.plugin.emit(eventType: AMSEvents.rewardedLoadFail)

                let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: error?.localizedDescription)
                self.plugin.commandDelegate.send(result, callbackId: command.callbackId)
                return
            }

            self.rewardedAd = ad

            self.plugin.emit(eventType: AMSEvents.rewardedLoad)

            let result = CDVPluginResult(status: CDVCommandStatus_OK)
            self.commandDelegate.send(result, callbackId: command.callbackId)
        })
    }

    func show(_ command: CDVInvokedUrlCommand) {
        if isReady() {
            rewardedAd?.present(fromRootViewController: plugin.viewController, userDidEarnRewardHandler: {
                // TODO include self.rewardedAd.adReward
                self.plugin.emit(eventType: AMSEvents.rewardedReward)
            })
        }

        let result = CDVPluginResult(status: CDVCommandStatus_OK)
        self.commandDelegate.send(result, callbackId: command.callbackId)
    }

    func adDidRecordImpression(_ ad: GADFullScreenPresentingAd) {
        // TODO
    }

    func ad(_ ad: GADFullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        plugin.emit(eventType: AMSEvents.rewardedShowFail)
    }

    func adDidPresentFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        plugin.emit(eventType: AMSEvents.rewardedOpen)
    }

    func adDidDismissFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        plugin.emit(eventType: AMSEvents.rewardedClose)
    }
}
