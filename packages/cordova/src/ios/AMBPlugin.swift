#if canImport(AppTrackingTransparency)
    import AppTrackingTransparency
#endif
import AdSupport
import GoogleMobileAds

@objc(AMBPlugin)
class AMBPlugin: CDVPlugin {
    static func registerNativeAdViewProviders(_ providers: [String: AMBNativeAdViewProvider]) {
        AMBNativeAd.providers.merge(providers) {(_, new) in new}
    }

    var readyCallbackId: String!

    deinit {
        readyCallbackId = nil
    }

    override func pluginInitialize() {
        super.pluginInitialize()

        AMBContext.plugin = self

        if let x = self.commandDelegate.settings["disableSDKCrashReporting".lowercased()] as? String,
           x == "true" {
            GADMobileAds.sharedInstance().disableSDKCrashReporting()
        }
    }

    @objc(ready:)
    func ready(command: CDVInvokedUrlCommand) {
        readyCallbackId = command.callbackId

        DispatchQueue.global(qos: .background).async {
            self.emit(AMBEvents.ready, data: ["isRunningInTestLab": false])
        }
    }

    @objc(configRequest:)
    func configRequest(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)
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

        ctx.success()
    }

    @objc(requestTrackingAuthorization:)
    func requestTrackingAuthorization(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        if #available(iOS 14, *) {
            ATTrackingManager.requestTrackingAuthorization(completionHandler: { status in
                ctx.success(status.rawValue)
            })
        } else {
            ctx.success(false)
        }
    }

    @objc(start:)
    func start(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        GADMobileAds.sharedInstance().start(completionHandler: { _ in
            ctx.success(["version": GADMobileAds.sharedInstance().sdkVersion])
        })
    }

    @objc(setAppMuted:)
    func setAppMuted(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        if let muted = ctx.opt0() as? Bool {
            GADMobileAds.sharedInstance().applicationMuted = muted
            ctx.success()
        } else {
            ctx.error()
        }
    }

    @objc(setAppVolume:)
    func setAppVolume(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        if let volume = ctx.opt0() as? Float {
            GADMobileAds.sharedInstance().applicationVolume = volume
            ctx.success()
        } else {
            ctx.error()
        }
    }

    @objc func adCreate(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        if let adClass = ctx.optString("cls") {
            var ad: AMBGenericAd?
            switch adClass {
            case "AppOpenAd":
                ad = AMBAppOpenAd(ctx)
            case "NativeAd":
                ad = AMBNativeAd(ctx)
            default:
                break
            }
            if ad != nil {
                ctx.success()
            } else {
                ctx.error("fail to create ad: \(ctx.optId() ?? -1)")
            }
        } else {
            ctx.error()
        }
    }

    @objc func adIsLoaded(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        if let ad = ctx.optAdOrError() as? AMBGenericAd {
            ctx.success(ad.isLoaded())
        }
    }

    @objc func adLoad(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        DispatchQueue.main.async {
            if let ad = ctx.optAdOrError() as? AMBGenericAd {
                ad.load(ctx)
            }
        }
    }

    @objc func adShow(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        DispatchQueue.main.async {
            if let ad = ctx.optAdOrError() as? AMBGenericAd {
                if ad.isLoaded() {
                    ad.show(ctx)
                    ctx.success(true)
                } else {
                    ctx.success(false)
                }
            }
        }
    }

    @objc func adHide(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        DispatchQueue.main.async {
            if let ad = ctx.optAdOrError() as? AMBGenericAd {
                ad.hide(ctx)
            }
        }
    }

    @objc(bannerConfig:)
    func bannerConfig(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        DispatchQueue.main.async {
            AMBBanner.config(ctx)
        }
    }

    @objc(bannerLoad:)
    func bannerLoad(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        DispatchQueue.main.async {
            let ad = ctx.optAd() as? AMBBanner ?? AMBBanner(ctx)
            ad?.load(ctx) ?? ctx.error()
        }
    }

    @objc(bannerShow:)
    func bannerShow(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        DispatchQueue.main.async {
            if let ad = ctx.optAdOrError() as? AMBBanner {
                ad.show(ctx)
            }
        }
    }

    @objc(bannerHide:)
    func bannerHide(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        DispatchQueue.main.async {
            if let ad = ctx.optAdOrError() as? AMBBanner {
                ad.hide(ctx)
            }
        }
    }

    @objc(interstitialIsLoaded:)
    func interstitialIsLoaded(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        if let ad = ctx.optAdOrError() as? AMBInterstitial {
            ctx.success(ad.isLoaded())
        }
    }

    @objc(interstitialLoad:)
    func interstitialLoad(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        let ad = ctx.optAd() as? AMBInterstitial ?? AMBInterstitial(ctx)
        ad?.load(ctx) ?? ctx.error()
    }

    @objc(interstitialShow:)
    func interstitialShow(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        DispatchQueue.main.async {
            if let ad = ctx.optAdOrError() as? AMBInterstitial {
                ad.show(ctx)
            }
        }
    }

    @objc(rewardedIsLoaded:)
    func rewardedIsLoaded(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        if let ad = ctx.optAdOrError() as? AMBRewarded {
            ctx.success(ad.isLoaded())
        }
    }

    @objc(rewardedLoad:)
    func rewardedLoad(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        let ad = ctx.optAd() as? AMBRewarded ?? AMBRewarded(ctx)
        ad?.load(ctx) ?? ctx.error()
    }

    @objc(rewardedShow:)
    func rewardedShow(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        DispatchQueue.main.async {
            if let ad = ctx.optAdOrError() as? AMBRewarded {
                ad.show(ctx)
            }
        }
    }

    @objc(rewardedInterstitialIsLoaded:)
    func rewardedInterstitialIsLoaded(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        if let ad = ctx.optAdOrError() as? AMBRewardedInterstitial {
            ctx.success(ad.isLoaded())
        }
    }

    @objc(rewardedInterstitialLoad:)
    func rewardedInterstitialLoad(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        let ad = ctx.optAd() as? AMBRewardedInterstitial ?? AMBRewardedInterstitial(ctx)
        ad?.load(ctx) ?? ctx.error()
    }

    @objc(rewardedInterstitialShow:)
    func rewardedInterstitialShow(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        DispatchQueue.main.async {
            if let ad = ctx.optAdOrError() as? AMBRewardedInterstitial {
                ad.show(ctx)
            }
        }
    }

    func emit(_ eventName: String, data: Any = NSNull()) {
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: ["type": eventName, "data": data])
        result?.setKeepCallbackAs(true)
        self.commandDelegate.send(result, callbackId: readyCallbackId)
    }
}
