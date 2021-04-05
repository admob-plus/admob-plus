import GoogleMobileAds

@objc(RNAdMobPlus)
class RNAdMobPlus: NSObject {
    @objc func start(_ resolve: @escaping (RCTPromiseResolveBlock), rejecter reject: RCTPromiseRejectBlock) {
        GADMobileAds.sharedInstance().start(completionHandler: { _ in
            resolve(["version": GADMobileAds.sharedInstance().sdkVersion])
        })
    }
}
