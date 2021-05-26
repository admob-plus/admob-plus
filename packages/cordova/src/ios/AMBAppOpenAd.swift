import Foundation
import GoogleMobileAds

class AMBAppOpenAd: AMBAdBase, GADFullScreenContentDelegate {
    let request: GADRequest
    let orientation: UIInterfaceOrientation = .portrait

    init(id: Int, adUnitId: String, request: GADRequest) {
        self.request = request

        super.init(id: id, adUnitId: adUnitId)
    }

    convenience init?(_ ctx: AMBContext) {
        guard let id = ctx.optId(),
              let adUnitId = ctx.optAdUnitID()
        else {
            return nil
        }
        self.init(id: id,
                  adUnitId: adUnitId,
                  request: ctx.optGADRequest())
    }

    var appOpenAd: GADAppOpenAd?

    func requestAppOpenAd() {
        self.appOpenAd = nil

        GADAppOpenAd.load(
            withAdUnitID: self.adUnitId,
            request: self.request,
            orientation: self.orientation,
            completionHandler: { (appOpenAd, error) in
                if error != nil {
                    return
                }
                appOpenAd?.fullScreenContentDelegate = self
                self.appOpenAd = appOpenAd
            })
    }

    func tryToPresentAd() {
        if self.appOpenAd != nil {
            self.appOpenAd?.present(fromRootViewController: AMBContext.plugin.viewController)
        } else {
            self.requestAppOpenAd()
        }
    }

    func adDidRecordImpression(_ ad: GADFullScreenPresentingAd) {
    }

    func ad(_ ad: GADFullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        self.requestAppOpenAd()
    }

    func adDidPresentFullScreenContent(_ ad: GADFullScreenPresentingAd) {
    }

    func adDidDismissFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        self.requestAppOpenAd()
    }
}
