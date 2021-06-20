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

    @objc func ready(_ command: CDVInvokedUrlCommand) {
        readyCallbackId = command.callbackId

        DispatchQueue.global(qos: .background).async {
            self.emit(AMBEvents.ready, data: ["isRunningInTestLab": false])
        }
    }

    @objc func configRequest(_ command: CDVInvokedUrlCommand) {
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

    @objc func requestTrackingAuthorization(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        if #available(iOS 14, *) {
            ATTrackingManager.requestTrackingAuthorization(completionHandler: { status in
                ctx.success(status.rawValue)
            })
        } else {
            ctx.success(false)
        }
    }

    @objc func start(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        GADMobileAds.sharedInstance().start(completionHandler: { _ in
            ctx.success(["version": GADMobileAds.sharedInstance().sdkVersion])
        })
    }

    @objc func setAppMuted(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        if let muted = ctx.opt0() as? Bool {
            GADMobileAds.sharedInstance().applicationMuted = muted
            ctx.success()
        } else {
            ctx.error()
        }
    }

    @objc func setAppVolume(_ command: CDVInvokedUrlCommand) {
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
            var ad: AMBCoreAd?
            switch adClass {
            case "AppOpenAd":
                ad = AMBAppOpenAd(ctx)
            case "BannerAd":
                ad = AMBBanner(ctx)
            case "InterstitialAd":
                ad = AMBInterstitial(ctx)
            case "NativeAd":
                ad = AMBNativeAd(ctx)
            case "RewardedAd":
                ad = AMBRewarded(ctx)
            case "RewardedInterstitialAd":
                ad = AMBRewardedInterstitial(ctx)
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

        if let ad = ctx.optAdOrError() as? AMBAdBase {
            ctx.success(ad.isLoaded())
        }
    }

    @objc func adLoad(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        DispatchQueue.main.async {
            if let ad = ctx.optAdOrError() as? AMBAdBase {
                ad.load(ctx)
            }
        }
    }

    @objc func adShow(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        DispatchQueue.main.async {
            if let ad = ctx.optAdOrError() as? AMBAdBase {
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
            if let ad = ctx.optAdOrError() as? AMBAdBase {
                ad.hide(ctx)
            }
        }
    }

    @objc func bannerConfig(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        DispatchQueue.main.async {
            AMBBanner.config(ctx)
        }
    }

    func emit(_ eventName: String, data: Any = NSNull()) {
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: ["type": eventName, "data": data])
        result?.setKeepCallbackAs(true)
        self.commandDelegate.send(result, callbackId: readyCallbackId)
    }
}
