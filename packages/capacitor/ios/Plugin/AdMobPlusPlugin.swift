#if canImport(AppTrackingTransparency)
    import AppTrackingTransparency
#endif
import Foundation
import Capacitor
import GoogleMobileAds

@objc(AdMobPlusPlugin)
public class AdMobPlusPlugin: CAPPlugin, AMBHelperAdapter {
    var helper: AMBHelper!

    @objc override public func load() {
        helper = AMBHelper(self)
        AMBContext.plugin = self
    }

    @objc func trackingAuthorizationStatus(_ call: CAPPluginCall) {
        let ctx = AMBContext(call)

        if #available(iOS 14, *) {
            ctx.resolve(["status": ATTrackingManager.trackingAuthorizationStatus.rawValue])
        } else {
            ctx.resolve(["status": false])
        }
    }

    @objc func requestTrackingAuthorization(_ call: CAPPluginCall) {
        let ctx = AMBContext(call)

        if #available(iOS 14, *) {
            ATTrackingManager.requestTrackingAuthorization(completionHandler: { status in
                ctx.resolve(["status": status.rawValue])
            })
        } else {
            ctx.resolve(["status": false])
        }
    }

    @objc func start(_ call: CAPPluginCall) {
        GADMobileAds.sharedInstance().start(completionHandler: { _ in
            call.resolve()
        })
    }

    @objc func configure(_ call: CAPPluginCall) {
        let ctx = AMBContext(call)

        if let muted = ctx.optAppMuted() {
            GADMobileAds.sharedInstance().applicationMuted = muted
        }

        if let volume = ctx.optAppVolume() {
            GADMobileAds.sharedInstance().applicationVolume = volume
        }

        ctx.resolve()
    }

    @objc func configRequest(_ call: CAPPluginCall) {
        let ctx = AMBContext(call)
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

        ctx.resolve()
    }

    @objc func adCreate(_ call: CAPPluginCall) {
        let ctx = AMBContext(call)

        if let adClass = ctx.optString("cls") {
            var ad: AMBCoreAd?
            switch adClass {
            case "BannerAd":
                ad = AMBBanner(ctx)
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
                ctx.reject("fail to create ad: \(adClass), \(ctx.optId() ?? -1)")
            }
        } else {
            ctx.reject()
        }
    }

    @objc func adIsLoaded(_ call: CAPPluginCall) {
        let ctx = AMBContext(call)

        DispatchQueue.main.async {
            if let ad = ctx.optAdOrError() as? AMBAdBase {
                ctx.resolve(ad.isLoaded())
            }
        }
    }

    @objc func adLoad(_ call: CAPPluginCall) {
        let ctx = AMBContext(call)

        DispatchQueue.main.async {
            if let ad = ctx.optAdOrError() as? AMBAdBase {
                ad.load(ctx)
            }
        }
    }

    @objc func adShow(_ call: CAPPluginCall) {
        let ctx = AMBContext(call)

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

    @objc func adHide(_ call: CAPPluginCall) {
        let ctx = AMBContext(call)

        DispatchQueue.main.async {
            if let ad = ctx.optAdOrError() as? AMBAdBase {
                ad.hide(ctx)
            }
        }
    }
}
