import Foundation
import Capacitor
import GoogleMobileAds

@objc(AdMobPlusPlugin)
public class AdMobPlusPlugin: CAPPlugin {
    @objc func start(_ call: CAPPluginCall) {
        GADMobileAds.sharedInstance().start(completionHandler: { status in
            GADMobileAds.sharedInstance().requestConfiguration.testDeviceIdentifiers = [ kGADSimulatorID ] as? [String]

            call.resolve()
        })
    }
    
    @objc func bannerShow(_ call: CAPPluginCall) {
        let ctx = AMBContext(plugin: self, call: call)

        if let banner = AMBBanner.getOrCreate(ctx) {
            DispatchQueue.main.async {
                banner.show(call, request: self.createGADRequest(call))
            }
        }
    }
    
    @objc func bannerHide(_ call: CAPPluginCall) {
        let ctx = AMBContext(plugin: self, call: call)

        if let banner = ctx.getAd() as? AMBBanner {
            DispatchQueue.main.async {
                banner.hide(call)
            }
        } else {
            call.reject("Ad not found")
        }
    }
    
    @objc func interstitialLoad(_ call: CAPPluginCall) {
        guard let id = call.getInt("id"),
              let adUnitId = call.getString("adUnitId")
        else {
            call.reject("Invalid options")
            return
        }
        var interstitial = AMBAdBase.ads[id] as? AMBInterstitial
        if interstitial == nil {
            interstitial = AMBInterstitial(id: id, adUnitId: adUnitId)
        }
        interstitial!.load(call, request: self.createGADRequest(call))
    }
    
    @objc func interstitialShow(_ call: CAPPluginCall) {
        guard let id = call.getInt("id"),
              let interstitial = AMBAdBase.ads[id] as? AMBInterstitial
        else {
            call.reject("Invalid options")
            return
        }
        interstitial.show(call)
    }
    
    @objc func rewardedLoad(_ call: CAPPluginCall) {
        guard let id = call.getInt("id"),
              let adUnitId = call.getString("adUnitId")
        else {
            call.reject("Invalid options")
            return
        }
        var rewarded = AMBAdBase.ads[id] as? AMBRewarded
        if rewarded == nil {
            rewarded = AMBRewarded(id: id, adUnitId: adUnitId)
        }
        rewarded!.load(call, request: self.createGADRequest(call))
    }
    
    @objc func rewardedShow(_ call: CAPPluginCall) {
        guard let id = call.getInt("id"),
              let rewarded = AMBAdBase.ads[id] as? AMBRewarded
        else {
            call.reject("Invalid options")
            return
        }
        rewarded.show(call)
    }
    
    func createGADRequest(_ call: CAPPluginCall) -> GADRequest {
        let request = GADRequest()
        if let testDevices = call.getArray("testDevices", String.self) {
            GADMobileAds.sharedInstance().requestConfiguration.testDeviceIdentifiers = testDevices
        }
        if let childDirected = call.getBool("childDirected") {
            GADMobileAds.sharedInstance().requestConfiguration.tag(forChildDirectedTreatment: childDirected)
        }
        return request
    }
}
