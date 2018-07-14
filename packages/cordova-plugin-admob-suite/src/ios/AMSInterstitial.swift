class AMSInterstitial: AMSAdBase, GADInterstitialDelegate {
    var interstitial: GADInterstitial?

    deinit {
        interstitial = nil
    }

    func load(adUnitID: String) {
        let interstitial = GADInterstitial(adUnitID: adUnitID)
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
        plugin.emit(eventType: AMSEvents.interstitial_load)
    }

    @objc
    func interstitialDidFail(toPresentScreen adInterstitial: GADInterstitial) {
        plugin.emit(eventType: AMSEvents.interstitial_load_fail)
    }

    @objc
    func interstitialDidDismissScreen(_ adInterstitial: GADInterstitial) {
        plugin.emit(eventType: AMSEvents.interstitial_close)
    }

    @objc
    func interstitialWillPresentScreen(_ adInterstitial: GADInterstitial) {
        plugin.emit(eventType: AMSEvents.interstitial_open)
    }

    @objc
    func interstitialWillLeaveApplication(_ adInterstitial: GADInterstitial) {
        plugin.emit(eventType: AMSEvents.interstitial_exit_app)
    }
}
