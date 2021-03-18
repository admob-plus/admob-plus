import Capacitor
import GoogleMobileAds

class AMBInterstitial: AMBAdBase, GADFullScreenContentDelegate {
    var interstitial: GADInterstitialAd?

    deinit {
        interstitial = nil
    }

    func isLoaded() -> Bool {
        return self.interstitial != nil
    }

    func load(_ call: CAPPluginCall, request: GADRequest) {
        GADInterstitialAd.load(
            withAdUnitID: adUnitId,
            request: request,
            completionHandler: { ad, error in
                if error != nil {
                    call.reject(error!.localizedDescription)
                    return
                }

                self.interstitial = ad
                ad?.fullScreenContentDelegate = self

                call.resolve()
         })
    }

    func show() {
        if self.isLoaded() {
            self.interstitial?.present(fromRootViewController: self.rootViewController)
        }
    }

    func adDidRecordImpression(_ ad: GADFullScreenPresentingAd) {
    }

    func ad(_ ad: GADFullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        self.emit(AMBEvents.interstitialShowFail, error)
    }

    func adDidPresentFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.interstitialShow)
    }

    func adDidDismissFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.interstitialDismiss)
    }
}
