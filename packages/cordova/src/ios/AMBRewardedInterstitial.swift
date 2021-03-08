class AMBRewardedInterstitial: AMBAdBase, GADFullScreenContentDelegate {
    var rewardedInterstitial: GADRewardedInterstitialAd?

    deinit {
        rewardedInterstitial = nil
    }
    func isReady() -> Bool {
        return self.rewardedInterstitial != nil
    }

    func load(_ ctx: AMBContext, request: GADRequest) {
        GADRewardedInterstitialAd.load(withAdUnitID: adUnitId, request: request, completionHandler: { ad, error in
            if error != nil {
                self.plugin.emit(eventType: AMBEvents.rewardedInterstitialLoadFail)

                ctx.error(error)
                return
            }

            ad?.serverSideVerificationOptions = AMBRewarded.getGADServerSideVerificationOptions(ctx.command)
            self.rewardedInterstitial = ad

            self.plugin.emit(eventType: AMBEvents.rewardedInterstitialLoad)

            ctx.success()
        })
    }

    func show(_ ctx: AMBContext) {
        if isReady() {
            rewardedInterstitial?.present(fromRootViewController: plugin.viewController, userDidEarnRewardHandler: {
                let reward = self.rewardedInterstitial!.adReward
                self.plugin.emit(eventType: AMBEvents.rewardedInterstitialReward, data: [
                    "amount": reward.amount,
                    "type": reward.type
                ])
            })
        }

        ctx.success()
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
