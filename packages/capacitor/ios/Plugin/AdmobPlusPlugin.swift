import Foundation
import Capacitor
import GoogleMobileAds


@objc(AdmobPlusPlugin)
public class AdmobPlusPlugin: CAPPlugin {
    private let implementation = AdmobPlus()

    @objc func start(_ call: CAPPluginCall) {
        GADMobileAds.sharedInstance().start(completionHandler: { status in
            call.resolve()
        })
    }
}
