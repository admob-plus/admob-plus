#if canImport(AppTrackingTransparency)
    import AppTrackingTransparency
#endif
import Foundation
import Capacitor
import GoogleMobileAds

@objc(AdMobPlusPlugin)
public class AdMobPlusPlugin: CAPPlugin {
    @objc override public func load() {
        AMBContext.plugin = self
    }

    @objc func requestTrackingAuthorization(_ call: CAPPluginCall) {
        let ctx = AMBContext(call)

        if #available(iOS 14, *) {
            ATTrackingManager.requestTrackingAuthorization(completionHandler: { status in
                ctx.success(["status": status.rawValue])
            })
        } else {
            ctx.success(["status": false])
        }
    }

    @objc func start(_ call: CAPPluginCall) {
        GADMobileAds.sharedInstance().start(completionHandler: { status in
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

        ctx.success()
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

        ctx.success()
    }

    @objc func bannerShow(_ call: CAPPluginCall) {
        let ctx = AMBContext(call)

        DispatchQueue.main.async {
            let banner = ctx.optAd() as? AMBBanner ?? AMBBanner(ctx)
            banner?.show(ctx) ?? ctx.error()
        }
    }

    @objc func bannerHide(_ call: CAPPluginCall) {
        let ctx = AMBContext(call)

        DispatchQueue.main.async {
            if let banner = ctx.optAdOrError() as? AMBBanner {
                banner.hide(ctx)
            }
        }
    }

    @objc func interstitialLoad(_ call: CAPPluginCall) {
        let ctx = AMBContext(call)

        let ad = ctx.optAd() as? AMBInterstitial ?? AMBInterstitial(ctx)
        ad?.load(ctx) ?? ctx.error()
    }

    @objc func interstitialShow(_ call: CAPPluginCall) {
        let ctx = AMBContext(call)

        if let interstitial = ctx.optAdOrError() as? AMBInterstitial {
            DispatchQueue.main.async {
                interstitial.show(ctx)
            }
        }
    }

    @objc func rewardedLoad(_ call: CAPPluginCall) {
        let ctx = AMBContext(call)

        let ad = ctx.optAd() as? AMBRewarded ?? AMBRewarded(ctx)
        ad?.load(ctx) ?? ctx.error()
    }

    @objc func rewardedShow(_ call: CAPPluginCall) {
        let ctx = AMBContext(call)

        DispatchQueue.main.async {
            if let rewarded = ctx.optAdOrError() as? AMBRewarded {
                rewarded.show(ctx)
            }
        }
    }

    @objc func rewardedInterstitialLoad(_ call: CAPPluginCall) {
        let ctx = AMBContext(call)

        let ad = ctx.optAd() as? AMBRewardedInterstitial ?? AMBRewardedInterstitial(ctx)
        ad?.load(ctx) ?? ctx.error()
    }

    @objc func rewardedInterstitialShow(_ call: CAPPluginCall) {
        let ctx = AMBContext(call)

        DispatchQueue.main.async {
            if let rewarded = ctx.optAdOrError() as? AMBRewardedInterstitial {
                rewarded.show(ctx)
            }
        }
    }
}
