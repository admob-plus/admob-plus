class AMSInterstitial : NSObject, GADInterstitialDelegate {
    weak var plugin: AMSPlugin!
    var interstitial: GADInterstitial!

    init(plugin: AMSPlugin) {
        super.init()

        self.plugin = plugin
    }

    func prepare() {
        interstitial = GADInterstitial(adUnitID: "ca-app-pub-3940256099942544/4411468910")
        let request = GADRequest()
        request.testDevices = [ kGADSimulatorID ]
        interstitial.load(request)
        interstitial.delegate = self
    }

    @objc
    func interstitialDidReceiveAd(_ ad: GADInterstitial) {
        interstitial.present(fromRootViewController: plugin.viewController)
    }

    @objc
    func interstitialDidFail(toPresentScreen ad: GADInterstitial) {
    }
}
