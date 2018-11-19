class AMSInterstitial: AMSAdBase, GADInterstitialDelegate {
    var interstitial: GADInterstitial?

    deinit {
        interstitial = nil
    }

    func load(adUnitID: String) {
        let interstitial = GADInterstitial(adUnitID: adUnitID)
        self.interstitial = interstitial

        let request = createGADRequest()
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
        plugin.emit(eventType: AMSEvents.interstitialLoad)
    }

    @objc
    func interstitialDidFail(toPresentScreen adInterstitial: GADInterstitial) {
        plugin.emit(eventType: AMSEvents.interstitialLoadFail)
    }

    @objc
    func interstitialDidDismissScreen(_ adInterstitial: GADInterstitial) {
        plugin.emit(eventType: AMSEvents.interstitialClose)
    }

    @objc
    func interstitialWillPresentScreen(_ adInterstitial: GADInterstitial) {
        plugin.emit(eventType: AMSEvents.interstitialOpen)
    }

    @objc
    func interstitialWillLeaveApplication(_ adInterstitial: GADInterstitial) {
        plugin.emit(eventType: AMSEvents.interstitialExitApp)
    }
}
