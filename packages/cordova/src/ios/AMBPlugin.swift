#if canImport(AppTrackingTransparency)
    import AppTrackingTransparency
#endif
import AdSupport

@objc(AMBPlugin)
class AMBPlugin: CDVPlugin {
    var readyCallbackId: String!

    override func pluginInitialize() {
        super.pluginInitialize()

        AMBContext.plugin = self

        if let x = self.commandDelegate.settings["disableSDKCrashReporting".lowercased()] as? String, x == "true" {
            GADMobileAds.sharedInstance().disableSDKCrashReporting()
        }
    }

    deinit {
        readyCallbackId = nil
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

        guard let applicationMuted = command.argument(at: 0) as? Bool
        else {
            ctx.error()
            return
        }
        GADMobileAds.sharedInstance().applicationMuted = applicationMuted

        ctx.success()
    }

    @objc(setAppVolume:)
    func setAppVolume(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        guard let applicationVolume = command.argument(at: 0) as? Float
        else {
            ctx.error()
            return
        }
        GADMobileAds.sharedInstance().applicationVolume = applicationVolume

        ctx.success()
    }

    @objc(bannerShow:)
    func bannerShow(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        let ad = ctx.optAd() as? AMBBanner ?? AMBBanner(ctx)
        ad?.show(ctx) ?? ctx.error()
    }

    @objc(bannerHide:)
    func bannerHide(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        if let banner = ctx.optAdOrError() as? AMBBanner {
            banner.hide(ctx)
        }
    }

    @objc(interstitialIsLoaded:)
    func interstitialIsLoaded(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        if let interstitial = ctx.optAdOrError() as? AMBInterstitial {
            ctx.success(interstitial.isLoaded())
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

        if let interstitial = ctx.optAdOrError() as? AMBInterstitial {
            interstitial.show(ctx)
        }
    }

    @objc(rewardedIsLoaded:)
    func rewardedIsLoaded(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        if let rewarded = ctx.optAdOrError() as? AMBRewarded {
            ctx.success(rewarded.isLoaded())
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

        if let rewarded = ctx.optAdOrError() as? AMBRewarded {
            rewarded.show(ctx)
        }
    }

    @objc(rewardedInterstitialIsLoaded:)
    func rewardedInterstitialIsLoaded(command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        if let rewardedInterstitial = ctx.optAdOrError() as? AMBRewardedInterstitial {
            ctx.success(rewardedInterstitial.isLoaded())
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

        if let rewardedInterstitial = ctx.optAdOrError() as? AMBRewardedInterstitial {
            rewardedInterstitial.show(ctx)
        }
    }

    func emit(_ eventName: String, data: Any = NSNull()) {
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: ["type": eventName, "data": data])
        result?.setKeepCallbackAs(true)
        self.commandDelegate.send(result, callbackId: readyCallbackId)
    }
}
