class AMBInterstitial: AMBAdBase, GADFullScreenContentDelegate {
    var interstitial: GADInterstitialAd?

    deinit {
        interstitial = nil
    }

    func isLoaded() -> Bool {
        return self.interstitial != nil
    }

    func load(_ command: CDVInvokedUrlCommand, request: GADRequest) {
        GADInterstitialAd.load(
            withAdUnitID: adUnitId,
            request: request,
            completionHandler: { ad, error in
                if error != nil {
                    self.plugin.emit(eventType: AMBEvents.interstitialLoadFail, data: error!.localizedDescription)

                    let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: error?.localizedDescription)
                    self.plugin.commandDelegate.send(result, callbackId: command.callbackId)
                    return
                }

                self.interstitial = ad
                ad?.fullScreenContentDelegate = self

                self.plugin.emit(eventType: AMBEvents.interstitialLoad)

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

    func ad(_ ad: GADFullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        plugin.emit(eventType: AMBEvents.interstitialShowFail, data: error.localizedDescription)
    }

    func adDidPresentFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        print("AMBEvents show")
        plugin.emit(eventType: AMBEvents.interstitialShow)
    }

    func adDidDismissFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        plugin.emit(eventType: AMBEvents.interstitialDismiss)
    }
}
