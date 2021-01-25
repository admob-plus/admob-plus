@objc(AMSPlugin)
class AMSPlugin: CDVPlugin {
    var readyCallbackId: String!

    override func pluginInitialize() {
        super.pluginInitialize()

        AMSAdBase.plugin = self
    }

    deinit {
        readyCallbackId = nil
    }

    @objc(ready:)
    func ready(command: CDVInvokedUrlCommand) {
        readyCallbackId = command.callbackId

        self.emit(eventType: AMSEvents.ready, data: [
            "sdkVersion": GADMobileAds.sharedInstance().sdkVersion,
            "isRunningInTestLab": false])
    }

    @objc(start:)
    func start(command: CDVInvokedUrlCommand) {
        GADMobileAds.sharedInstance().start(completionHandler: {
            let result = CDVPluginResult(status: CDVCommandStatus_OK)
            self.commandDelegate.send(result, callbackId: command.callbackId)
        })
    }

    @objc(setAppMuted:)
    func setAppMuted(command: CDVInvokedUrlCommand) {
        guard let applicationMuted = command.argument(at: 0) as? Bool
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: false)
                self.commandDelegate!.send(result, callbackId: command.callbackId)
                return
        }
        GADMobileAds.sharedInstance().applicationMuted = applicationMuted

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc(setAppVolume:)
    func setAppVolume(command: CDVInvokedUrlCommand) {
        guard let applicationVolume = command.argument(at: 0) as? Float
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: false)
                self.commandDelegate!.send(result, callbackId: command.callbackId)
                return
        }
        GADMobileAds.sharedInstance().applicationVolume = applicationVolume

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc(bannerShow:)
    func bannerShow(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary,
            let id = opts.value(forKey: "id") as? Int,
            let adUnitID = opts.value(forKey: "adUnitID") as? String,
            let position = opts.value(forKey: "position") as? String,
            var banner = AMSAdBase.ads[id] as? AMSBanner?
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: false)
                self.commandDelegate!.send(result, callbackId: command.callbackId)
                return
        }
        if banner == nil {
            let adSize = getAdSize(opts)
            banner = AMSBanner(id: id, adUnitID: adUnitID, adSize: adSize, position: position)
        }
        banner!.show(request: createGADRequest(opts))

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc(bannerHide:)
    func bannerHide(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary,
            let id = opts.value(forKey: "id") as? Int,
            let banner = AMSAdBase.ads[id] as? AMSBanner
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: false)
                self.commandDelegate!.send(result, callbackId: command.callbackId)
                return
        }
        banner.hide()

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc(interstitialIsLoaded:)
    func interstitialIsLoaded(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary,
            let id = opts.value(forKey: "id") as? Int,
            let interstitial = AMSAdBase.ads[id] as? AMSInterstitial
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: false)
                self.commandDelegate!.send(result, callbackId: command.callbackId)
                return
        }
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: interstitial.isLoaded())
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc(interstitialLoad:)
    func interstitialLoad(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary,
            let id = opts.value(forKey: "id") as? Int,
            let adUnitID = opts.value(forKey: "adUnitID") as? String,
            var interstitial = AMSAdBase.ads[id] as? AMSInterstitial?
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: false)
                self.commandDelegate!.send(result, callbackId: command.callbackId)
                return
        }
        if interstitial == nil {
            interstitial = AMSInterstitial(id: id, adUnitID: adUnitID)
        }
        interstitial!.load(request: createGADRequest(opts))

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc(interstitialShow:)
    func interstitialShow(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary,
            let id = opts.value(forKey: "id") as? Int,
            let interstitial = AMSAdBase.ads[id] as? AMSInterstitial
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: false)
                self.commandDelegate!.send(result, callbackId: command.callbackId)
                return
        }
        interstitial.show()

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc(rewardedIsLoaded:)
    func rewardedIsLoaded(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary,
            let id = opts.value(forKey: "id") as? Int,
            let rewarded = AMSAdBase.ads[id] as? AMSRewarded
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: false)
                self.commandDelegate!.send(result, callbackId: command.callbackId)
                return
        }
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: rewarded.isReady())
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc(rewardedLoad:)
    func rewardedLoad(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary,
            let id = opts.value(forKey: "id") as? Int,
            let adUnitID = opts.value(forKey: "adUnitID") as? String,
            var rewarded = AMSAdBase.ads[id] as? AMSRewarded?
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: false)
                self.commandDelegate!.send(result, callbackId: command.callbackId)
                return
        }
        if rewarded == nil {
            rewarded = AMSRewarded(id: id, adUnitID: adUnitID)
        }
        rewarded!.load(request: createGADRequest(opts))

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc(rewardedShow:)
    func rewardedShow(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary,
            let id = opts.value(forKey: "id") as? Int,
            let rewarded = AMSAdBase.ads[id] as? AMSRewarded
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: false)
                self.commandDelegate!.send(result, callbackId: command.callbackId)
                return
        }
        rewarded.show()

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    func createGADRequest(_ opts: NSDictionary) -> GADRequest {
        let request = GADRequest()
        if let testDevices = opts["testDevices"] as? [String] {
            GADMobileAds.sharedInstance().requestConfiguration.testDeviceIdentifiers = testDevices
        }
        if let childDirected = opts["childDirected"] as? Bool {
            GADMobileAds.sharedInstance().requestConfiguration.tag(forChildDirectedTreatment: childDirected)
        }
        return request
    }

    func emit(eventType: String, data: Any = NSNull()) {
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: ["type": eventType, "data": data])
        result?.setKeepCallbackAs(true)
        self.commandDelegate!.send(result, callbackId: readyCallbackId)
    }

    func getAdSize(_ opts: NSDictionary) -> GADAdSize {
        if let adSizeType = opts.value(forKey: "size") as? Int {
            switch adSizeType {
            case 0:
                return kGADAdSizeBanner
            case 1:
                return kGADAdSizeLargeBanner
            case 2:
                return kGADAdSizeMediumRectangle
            case 3:
                return kGADAdSizeFullBanner
            case 4:
                return kGADAdSizeLeaderboard
            default: break
            }
        }
        guard let adSizeDict = opts.value(forKey: "size") as? NSDictionary,
            let width = adSizeDict.value(forKey: "width") as? Int,
            let height = adSizeDict.value(forKey: "height") as? Int
            else {
                if UIDevice.current.orientation.isPortrait {
                    return kGADAdSizeSmartBannerPortrait
                } else {
                    return kGADAdSizeSmartBannerLandscape
                }
        }
        return GADAdSizeFromCGSize(CGSize(width: width, height: height))
    }
}
