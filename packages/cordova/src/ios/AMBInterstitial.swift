class AMBInterstitial: AMBAdBase, GADFullScreenContentDelegate {
    var interstitial: GADInterstitialAd?

    deinit {
        interstitial = nil
    }

    func isLoaded() -> Bool {
        return self.interstitial != nil
    }

    func load(_ ctx: AMBContext, request: GADRequest) {
        GADInterstitialAd.load(
            withAdUnitID: adUnitId,
            request: request,
            completionHandler: { ad, error in
                if error != nil {
                    self.plugin.emit(eventType: AMBEvents.interstitialLoadFail, data: error!.localizedDescription)

                    ctx.error(error)
                    return
                }

                self.interstitial = ad
                ad?.fullScreenContentDelegate = self

                self.plugin.emit(eventType: AMBEvents.interstitialLoad)

                ctx.success()
         })
    }

    func show(_ ctx: AMBContext) {
        if isLoaded() {
            interstitial?.present(fromRootViewController: plugin.viewController)
        }

        ctx.success()
    }

    func ad(_ ad: GADFullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        plugin.emit(eventType: AMBEvents.interstitialShowFail, data: error.localizedDescription)
    }

    func adDidPresentFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        plugin.emit(eventType: AMBEvents.interstitialShow)
    }

    func adDidDismissFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        plugin.emit(eventType: AMBEvents.interstitialDismiss)
    }
}
