import GoogleMobileAds

@objc(RNAdMobPlus)
class RNAdMobPlus: RCTEventEmitter {
    override init() {
        super.init()

        AMBContext.plugin = self
    }

    override func supportedEvents() -> [String] {
        return AMBEvents.allCases.map { $0.rawValue }
    }

    @objc func start(_ resolve: @escaping RCTPromiseResolveBlock,
                     rejecter reject: RCTPromiseRejectBlock) {
        GADMobileAds.sharedInstance().start(completionHandler: { _ in
            resolve(["version": GADMobileAds.sharedInstance().sdkVersion])
        })
    }

    @objc func configure(_ opts: NSDictionary,
                         resolver resolve: @escaping RCTPromiseResolveBlock,
                         rejecter reject: @escaping RCTPromiseRejectBlock) {
        let ctx = AMBContext(opts, resolve, reject)

        if let muted = ctx.optAppMuted() {
            GADMobileAds.sharedInstance().applicationMuted = muted
        }

        if let volume = ctx.optAppVolume() {
            GADMobileAds.sharedInstance().applicationVolume = volume
        }

        let requestConfiguration = GADMobileAds.sharedInstance().requestConfiguration

        if let maxAdContentRating = ctx.optMaxAdContentRating() {
            requestConfiguration.maxAdContentRating = maxAdContentRating
        }

        if let tag = ctx.optChildDirectedTreatmentTag() {
            requestConfiguration.tag(forChildDirectedTreatment: tag)
        }

        if let tag = ctx.optUnderAgeOfConsentTag() {
            requestConfiguration.tagForUnderAge(ofConsent: tag)
        }

        if let testDevices = ctx.optTestDeviceIds() {
            requestConfiguration.testDeviceIdentifiers = testDevices
        }

        resolve(nil)
    }

    @objc func interstitialIsLoaded(_ opts: NSDictionary,
                                    resolver resolve: @escaping RCTPromiseResolveBlock,
                                    rejecter reject: @escaping RCTPromiseRejectBlock) {
        let ctx = AMBContext(opts, resolve, reject)

        if let ad = ctx.optAdOrError() as? AMBInterstitial {
            ctx.success(ad.isLoaded())
        }
    }

    @objc func interstitialLoad(_ opts: NSDictionary,
                                resolver resolve: @escaping RCTPromiseResolveBlock,
                                rejecter reject: @escaping RCTPromiseRejectBlock) {
        let ctx = AMBContext(opts, resolve, reject)

        let ad = ctx.optAd() as? AMBInterstitial ?? AMBInterstitial(ctx)
        ad?.load(ctx) ?? ctx.error()
    }

    @objc func interstitialShow(_ opts: NSDictionary,
                                resolver resolve: @escaping RCTPromiseResolveBlock,
                                rejecter reject: @escaping RCTPromiseRejectBlock) {
        let ctx = AMBContext(opts, resolve, reject)

        DispatchQueue.main.async {
            if let ad = ctx.optAdOrError() as? AMBInterstitial {
                ad.show(ctx)
            }
        }
    }
}
