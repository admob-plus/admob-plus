import Foundation
import GoogleMobileAds

class AMBAppOpenAd: AMBAdBase, GADFullScreenContentDelegate {
    let request: GADRequest
    let orientation: UIInterfaceOrientation = .portrait

    var mAd: GADAppOpenAd?

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

    deinit {
        clear()
    }

    func requestAppOpenAd() {
        clear()

        GADAppOpenAd.load(
            withAdUnitID: self.adUnitId,
            request: self.request,
            orientation: self.orientation,
            completionHandler: { (ad, error) in
                if error != nil {
                    self.emit(AMBEvents.adLoadFail, error!)
                    return
                }
                ad?.fullScreenContentDelegate = self
                self.mAd = ad

                self.emit(AMBEvents.adLoad)
            })
    }

    func showOrLoad() {
        if self.mAd != nil {
            self.mAd?.present(fromRootViewController: AMBContext.plugin.viewController)
        } else {
            self.requestAppOpenAd()
        }
    }

    func adDidRecordImpression(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.adImpression)
    }

    func ad(_ ad: GADFullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        self.requestAppOpenAd()
        self.emit(AMBEvents.adShowFail, error)
    }

    func adDidPresentFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        clear()
        self.emit(AMBEvents.adShow)
    }

    func adDidDismissFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        self.requestAppOpenAd()
        self.emit(AMBEvents.adDismiss)
    }

    private func clear() {
        mAd?.fullScreenContentDelegate = nil
        mAd = nil
    }
}
