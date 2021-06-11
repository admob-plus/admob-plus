import Foundation
import GoogleMobileAds

class AMBAppOpenAd: AMBAdBase, AMBGenericAd, GADFullScreenContentDelegate {

    let request: GADRequest
    let orientation: UIInterfaceOrientation

    var mAd: GADAppOpenAd?

    init(id: Int, adUnitId: String, request: GADRequest, orientation: UIInterfaceOrientation) {
        self.request = request
        self.orientation = orientation

        super.init(id: id, adUnitId: adUnitId)
    }

    convenience init?(_ ctx: AMBContext) {
        guard let id = ctx.optId(),
              let adUnitId = ctx.optAdUnitID()
        else {
            return nil
        }
        var orientation = UIInterfaceOrientation.portrait
        if let v = ctx.opts?.value(forKey: "orientation") as? Int {
            orientation = UIInterfaceOrientation(rawValue: v)!
        }
        self.init(id: id,
                  adUnitId: adUnitId,
                  request: ctx.optGADRequest(),
                  orientation: orientation)
    }

    deinit {
        clear()
    }

    func isLoaded() -> Bool {
        return mAd != nil
    }

    func load(_ ctx: AMBContext) {
        clear()

        GADAppOpenAd.load(
            withAdUnitID: self.adUnitId,
            request: self.request,
            orientation: self.orientation,
            completionHandler: { (ad, error) in
                if error != nil {
                    self.emit(AMBEvents.adLoadFail, error!)
                    ctx.error(error)
                    return
                }
                ad?.fullScreenContentDelegate = self
                self.mAd = ad

                self.emit(AMBEvents.adLoad)
                ctx.success()
            })
    }

    func show(_ ctx: AMBContext) {
        mAd?.present(fromRootViewController: AMBContext.plugin.viewController)
    }

    func adDidRecordImpression(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.adImpression)
    }

    func ad(_ ad: GADFullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        clear()
        self.emit(AMBEvents.adShowFail, error)
    }

    func adDidPresentFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        self.emit(AMBEvents.adShow)
    }

    func adDidDismissFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        clear()
        self.emit(AMBEvents.adDismiss)
    }

    private func clear() {
        mAd?.fullScreenContentDelegate = nil
        mAd = nil
    }
}
