import Capacitor
import GoogleMobileAds

class AMSInterstitial: AMSAdBase, GADFullScreenContentDelegate {
    var interstitial: GADInterstitialAd?

    deinit {
        interstitial = nil
    }

    func isLoaded() -> Bool {
        return self.interstitial != nil
    }

    func load(_ call: CAPPluginCall, request: GADRequest) {
        GADInterstitialAd.load(
            withAdUnitID: adUnitID,
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

    func show(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            guard let viewController = UIApplication.shared.keyWindow?.rootViewController else {
                call.reject("Cannot find viewController")
                return
            }

            if self.isLoaded() {
                self.interstitial?.present(fromRootViewController: viewController)
            }

            call.resolve()
        }
    }

    func adDidRecordImpression(_ ad: GADFullScreenPresentingAd) {
        // TODO
    }

    func ad(_ ad: GADFullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        // TODO
    }

    func adDidPresentFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        // TODO
    }

    func adDidDismissFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        // TODO
    }
}
