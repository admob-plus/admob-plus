import GoogleMobileAds

@objc(AdMobPlusRN)
class AdMobPlusRN: RCTEventEmitter {
    var hasListeners = false

    override init() {
        super.init()

        AMBContext.plugin = self
    }

    override func supportedEvents() -> [String] {
        return AMBEvents.allCases.map { $0.rawValue }
    }

    override func startObserving() {
        hasListeners = true
    }

    override func stopObserving() {
        hasListeners = false
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

    @objc func adCreate(_ opts: NSDictionary,
                        resolver resolve: @escaping RCTPromiseResolveBlock,
                        rejecter reject: @escaping RCTPromiseRejectBlock) {
        let ctx = AMBContext(opts, resolve, reject)

        if let adClass = ctx.optString("cls") {
            var ad: AMBCoreAd?
            switch adClass {
            case "InterstitialAd":
                ad = AMBInterstitial(ctx)
            case "RewardedAd":
                ad = AMBRewarded(ctx)
            case "RewardedInterstitialAd":
                ad = AMBRewardedInterstitial(ctx)
            default:
                break
            }
            if ad != nil {
                ctx.resolve()
            } else {
                ctx.reject("fail to create ad: \(ctx.optId() ?? -1)")
            }
        } else {
            ctx.reject()
        }
    }

    @objc func adIsLoaded(_ opts: NSDictionary,
                          resolver resolve: @escaping RCTPromiseResolveBlock,
                          rejecter reject: @escaping RCTPromiseRejectBlock) {
        let ctx = AMBContext(opts, resolve, reject)

        if let ad = ctx.optAdOrError() as? AMBAdBase {
            ctx.resolve(ad.isLoaded())
        }
    }

    @objc func adLoad(_ opts: NSDictionary,
                      resolver resolve: @escaping RCTPromiseResolveBlock,
                      rejecter reject: @escaping RCTPromiseRejectBlock) {
        let ctx = AMBContext(opts, resolve, reject)

        if let ad = ctx.optAdOrError() as? AMBAdBase {
            ad.load(ctx)
        }
    }

    @objc func adShow(_ opts: NSDictionary,
                      resolver resolve: @escaping RCTPromiseResolveBlock,
                      rejecter reject: @escaping RCTPromiseRejectBlock) {
        let ctx = AMBContext(opts, resolve, reject)

        DispatchQueue.main.async {
            if let ad = ctx.optAdOrError() as? AMBAdBase {
                if ad.isLoaded() {
                    ad.show(ctx)
                } else {
                    ctx.reject("Ad is not loaded: \(ctx.optId() ?? -1)")
                }
            }
        }
    }

    func emit(_ name: String, _ data: [String: Any]) {
        if self.hasListeners {
            self.sendEvent(withName: name, body: data)
        }
    }
}
