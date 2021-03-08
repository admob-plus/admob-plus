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
                self.emit(AMBEvents.rewardedInterstitialLoadFail)

                ctx.error(error)
                return
            }

            ad?.serverSideVerificationOptions = AMBRewarded.getGADServerSideVerificationOptions(ctx.command)
            self.rewardedInterstitial = ad

            self.emit(AMBEvents.rewardedInterstitialLoad)

            ctx.success()
        })
    }

    func show(_ ctx: AMBContext) {
        if isReady() {
            rewardedInterstitial?.present(fromRootViewController: plugin.viewController, userDidEarnRewardHandler: {
                let reward = self.rewardedInterstitial!.adReward
                self.emit(AMBEvents.rewardedInterstitialReward, [
                    "amount": reward.amount,
                    "type": reward.type
                ])
            })
        }

        ctx.success()
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
