class AMBRewarded: AMBAdBase, GADFullScreenContentDelegate {
    var rewardedAd: GADRewardedAd?

    override init(id: Int, adUnitId: String) {
        super.init(id: id, adUnitId: adUnitId)
    }

    deinit {
        rewardedAd = nil
    }

    static func getGADServerSideVerificationOptions(
        _ command: CDVInvokedUrlCommand
    ) -> GADServerSideVerificationOptions? {
        guard let opts = command.argument(at: 0) as? NSDictionary,
              let serverSideVerification = opts.value(forKey: "serverSideVerification") as? NSDictionary,
              let customData = serverSideVerification.value(forKey: "customData") as? String,
              let userId = serverSideVerification.value(forKey: "userId") as? String
        else {
            return nil
        }

        let options = GADServerSideVerificationOptions.init()
        options.customRewardString = customData
        options.userIdentifier = userId
        return options
    }

    func isReady() -> Bool {
        return self.rewardedAd != nil
    }

    func load(_ command: CDVInvokedUrlCommand, request: GADRequest) {
        GADRewardedAd.load(withAdUnitID: adUnitId, request: request, completionHandler: { ad, error in
            if error != nil {
                self.plugin.emit(eventType: AMBEvents.rewardedLoadFail)

                let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: error?.localizedDescription)
                self.plugin.commandDelegate.send(result, callbackId: command.callbackId)
                return
            }

            ad?.serverSideVerificationOptions = AMBRewarded.getGADServerSideVerificationOptions(command)
            self.rewardedAd = ad

            self.plugin.emit(eventType: AMBEvents.rewardedLoad)

            let result = CDVPluginResult(status: CDVCommandStatus_OK)
            self.commandDelegate.send(result, callbackId: command.callbackId)
        })
    }

    func show(_ command: CDVInvokedUrlCommand) {
        if isReady() {
            rewardedAd?.present(fromRootViewController: plugin.viewController, userDidEarnRewardHandler: {
                let reward = self.rewardedAd!.adReward
                self.plugin.emit(eventType: AMBEvents.rewardedReward, data: [
                    "amount": reward.amount,
                    "type": reward.type
                ])
            })
        }

        let result = CDVPluginResult(status: CDVCommandStatus_OK)
        self.commandDelegate.send(result, callbackId: command.callbackId)
    }

    func ad(_ ad: GADFullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        plugin.emit(eventType: AMBEvents.rewardedShowFail, data: error.localizedDescription)
    }

    func adDidPresentFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        plugin.emit(eventType: AMBEvents.rewardedShow)
    }

    func adDidDismissFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        plugin.emit(eventType: AMBEvents.rewardedDismiss)
    }
}
