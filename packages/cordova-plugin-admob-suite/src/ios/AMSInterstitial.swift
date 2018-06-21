class AMSInterstitial : NSObject, GADInterstitialDelegate {
    weak var plugin: AMSPlugin!
    var interstitial: GADInterstitial?

    init(plugin: AMSPlugin) {
        super.init()

        self.plugin = plugin
    }

    deinit {
        interstitial = nil
    }

    func prepare() {
        let interstitial = GADInterstitial(adUnitID: "ca-app-pub-3940256099942544/4411468910")
        self.interstitial = interstitial

        let request = GADRequest()
        request.testDevices = [ kGADSimulatorID ]
        interstitial.load(request)
        interstitial.delegate = self
    }

    func show() {
        if ((interstitial?.isReady)!) {
            interstitial?.present(fromRootViewController: plugin.viewController)
        }
    }

    @objc
    func interstitialDidReceiveAd(_ ad: GADInterstitial) {
        self.show()
    }

    @objc
    func interstitialDidFail(toPresentScreen ad: GADInterstitial) {
    }
}
