class AMSInterstitial: AMSAdBase, GADFullScreenContentDelegate {
    var interstitial: GADInterstitialAd?

    deinit {
        interstitial = nil
    }

    func isLoaded() -> Bool {
        return self.interstitial != nil
    }

    func load(_ command: CDVInvokedUrlCommand, request: GADRequest) {
        GADInterstitialAd.load(
            withAdUnitID: adUnitID,
            request: request,
            completionHandler: { ad, error in
                if error != nil {
                    self.plugin.emit(eventType: AMSEvents.interstitialLoadFail)

                    let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: error?.localizedDescription)
                    self.plugin.commandDelegate.send(result, callbackId: command.callbackId)
                    return
                }

                self.interstitial = ad
                ad?.fullScreenContentDelegate = self

                self.plugin.emit(eventType: AMSEvents.interstitialLoad)

                let result = CDVPluginResult(status: CDVCommandStatus_OK)
                self.commandDelegate.send(result, callbackId: command.callbackId)
         })
    }

    func show(_ command: CDVInvokedUrlCommand) {
        if isLoaded() {
            interstitial?.present(fromRootViewController: plugin.viewController)
        }

        let result = CDVPluginResult(status: CDVCommandStatus_OK)
        self.commandDelegate.send(result, callbackId: command.callbackId)
    }

    func adDidRecordImpression(_ ad: GADFullScreenPresentingAd) {
        self.plugin.emit(eventType: AMSEvents.interstitialImpression)
    }

    func ad(_ ad: GADFullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        // TODO
    }

    func adDidPresentFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        plugin.emit(eventType: AMSEvents.interstitialOpen)
    }

    func adDidDismissFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        plugin.emit(eventType: AMSEvents.interstitialClose)
    }
}
