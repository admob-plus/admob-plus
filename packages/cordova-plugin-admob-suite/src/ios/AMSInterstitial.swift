class AMSInterstitial: AMSAdBase, GADInterstitialDelegate {
    var interstitial: GADInterstitial?

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
        if (interstitial?.isReady)! {
            interstitial?.present(fromRootViewController: plugin.viewController)
        }
    }

    @objc
    func interstitialDidReceiveAd(_ adInterstitial: GADInterstitial) {
        plugin.emit(eventType: "admob.interstitial.load")
    }

    @objc
    func interstitialDidFail(toPresentScreen adInterstitial: GADInterstitial) {
        plugin.emit(eventType: "admob.interstitial.load_fail")
    }

    @objc
    func interstitialDidDismissScreen(_ adInterstitial: GADInterstitial) {
        plugin.emit(eventType: "admob.interstitial.close")
    }

    @objc
    func interstitialWillPresentScreen(_ adInterstitial: GADInterstitial) {
        plugin.emit(eventType: "admob.interstitial.open")
    }

    @objc
    func interstitialWillLeaveApplication(_ adInterstitial: GADInterstitial) {
        plugin.emit(eventType: "admob.interstitial.exit_app")
    }
}
