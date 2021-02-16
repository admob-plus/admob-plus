import Foundation
import Capacitor
import GoogleMobileAds

@objc(AdMobPlusPlugin)
public class AdMobPlusPlugin: CAPPlugin {
    @objc func start(_ call: CAPPluginCall) {
        GADMobileAds.sharedInstance().start(completionHandler: { status in
            call.resolve()
        })
    }

    @objc func interstitialLoad(_ call: CAPPluginCall) {
        guard let id = call.getInt("id"),
              let adUnitId = call.getString("adUnitId")
        else {
            call.reject("Invalid options")
            return
        }
        var interstitial = AMSAdBase.ads[id] as? AMSInterstitial
        if interstitial == nil {
            interstitial = AMSInterstitial(id: id, adUnitId: adUnitId)
        }
        interstitial!.load(call, request: createGADRequest(call))
    }

    @objc func interstitialShow(_ call: CAPPluginCall) {
        guard let id = call.getInt("id"),
              let interstitial = AMSAdBase.ads[id] as? AMSInterstitial
        else {
            call.reject("Invalid options")
            return
        }
        interstitial.show(call)
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
