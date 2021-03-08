class AMBRewardedInterstitial: AMBAdBase, GADFullScreenContentDelegate {
    var rewardedInterstitial: GADRewardedInterstitialAd?

    deinit {
        rewardedInterstitial = nil
    }
    func isReady() -> Bool {
        return self.rewardedInterstitial != nil
    }

    func load(_ command: CDVInvokedUrlCommand, request: GADRequest) {
        GADRewardedInterstitialAd.load(withAdUnitID: adUnitId, request: request, completionHandler: { ad, error in
            if error != nil {
                self.plugin.emit(eventType: AMBEvents.rewardedInterstitialLoadFail)

                let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: error?.localizedDescription)
                self.plugin.commandDelegate.send(result, callbackId: command.callbackId)
                return
            }

            ad?.serverSideVerificationOptions = AMBRewarded.getGADServerSideVerificationOptions(command)
            self.rewardedInterstitial = ad

            self.plugin.emit(eventType: AMBEvents.rewardedInterstitialLoad)

            let result = CDVPluginResult(status: CDVCommandStatus_OK)
            self.commandDelegate.send(result, callbackId: command.callbackId)
        })
    }

    func show(_ command: CDVInvokedUrlCommand) {
        if isReady() {
            rewardedInterstitial?.present(fromRootViewController: plugin.viewController, userDidEarnRewardHandler: {
                let reward = self.rewardedInterstitial!.adReward
                self.plugin.emit(eventType: AMBEvents.rewardedInterstitialReward, data: [
                    "amount": reward.amount,
                    "type": reward.type
                ])
            })
        }

        let result = CDVPluginResult(status: CDVCommandStatus_OK)
        self.commandDelegate.send(result, callbackId: command.callbackId)
    }

    func ad(_ ad: GADFullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        plugin.emit(eventType: AMBEvents.rewardedInterstitialShowFail, data: error.localizedDescription)
    }

    func adDidPresentFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        plugin.emit(eventType: AMBEvents.rewardedInterstitialShow)
    }

    func adDidDismissFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        plugin.emit(eventType: AMBEvents.rewardedInterstitialDismiss)
    }
}
