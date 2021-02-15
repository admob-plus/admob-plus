import Foundation
import Capacitor
import GoogleMobileAds

@objc(AdMobPlusPlugin)
public class AdMobPlusPlugin: CAPPlugin {
    private let implementation = AdMobPlus()

    @objc func start(_ call: CAPPluginCall) {
        GADMobileAds.sharedInstance().start(completionHandler: { status in
            call.resolve()
        })
    }
}
