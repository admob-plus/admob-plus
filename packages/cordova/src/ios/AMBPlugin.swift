#if canImport(AppTrackingTransparency)
    import AppTrackingTransparency
#endif
import AdSupport

@objc(AMBPlugin)
class AMBPlugin: CDVPlugin {
    var readyCallbackId: String!

    override func pluginInitialize() {
        super.pluginInitialize()

        AMBAdBase.plugin = self
    }

    deinit {
        readyCallbackId = nil
    }

    @objc(ready:)
    func ready(command: CDVInvokedUrlCommand) {
        readyCallbackId = command.callbackId

        self.emit(eventType: AMBEvents.ready, data: [
            "sdkVersion": GADMobileAds.sharedInstance().sdkVersion,
            "isRunningInTestLab": false])
    }

    @objc(requestTrackingAuthorization:)
    func requestTrackingAuthorization(command: CDVInvokedUrlCommand) {
        if #available(iOS 14, *) {
            ATTrackingManager.requestTrackingAuthorization(completionHandler: { status in
                let result = CDVPluginResult(
                    status: CDVCommandStatus_OK,
                    messageAs: status.rawValue)
                self.commandDelegate.send(result, callbackId: command.callbackId)
            })
        } else {
            let result = CDVPluginResult(status: CDVCommandStatus_OK)
            self.commandDelegate.send(result, callbackId: command.callbackId)
        }
    }

    @objc(start:)
    func start(command: CDVInvokedUrlCommand) {
        GADMobileAds.sharedInstance().start(completionHandler: { status in
            let result = CDVPluginResult(status: CDVCommandStatus_OK)
            self.commandDelegate.send(result, callbackId: command.callbackId)
        })
    }

    @objc(setAppMuted:)
    func setAppMuted(command: CDVInvokedUrlCommand) {
        guard let applicationMuted = command.argument(at: 0) as? Bool
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR)
                self.commandDelegate.send(result, callbackId: command.callbackId)
                return
        }
        GADMobileAds.sharedInstance().applicationMuted = applicationMuted

        let result = CDVPluginResult(status: CDVCommandStatus_OK)
        self.commandDelegate.send(result, callbackId: command.callbackId)
    }

    @objc(setAppVolume:)
    func setAppVolume(command: CDVInvokedUrlCommand) {
        guard let applicationVolume = command.argument(at: 0) as? Float
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR)
                self.commandDelegate.send(result, callbackId: command.callbackId)
                return
        }
        GADMobileAds.sharedInstance().applicationVolume = applicationVolume

        let result = CDVPluginResult(status: CDVCommandStatus_OK)
        self.commandDelegate.send(result, callbackId: command.callbackId)
    }

    @objc(bannerShow:)
    func bannerShow(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary,
            let id = opts.value(forKey: "id") as? Int,
            let adUnitId = opts.value(forKey: "adUnitId") as? String,
            let position = opts.value(forKey: "position") as? String,
            var banner = AMBAdBase.ads[id] as? AMBBanner?
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR)
                self.commandDelegate.send(result, callbackId: command.callbackId)
                return
        }
        if banner == nil {
            let adSize = AMBBanner.getAdSize(opts)
            banner = AMBBanner(id: id, adUnitId: adUnitId, adSize: adSize, position: position)
        }
        banner!.show(request: createGADRequest(opts))

        let result = CDVPluginResult(status: CDVCommandStatus_OK)
        self.commandDelegate.send(result, callbackId: command.callbackId)
    }

    @objc(bannerHide:)
    func bannerHide(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary,
            let id = opts.value(forKey: "id") as? Int,
            let banner = AMBAdBase.ads[id] as? AMBBanner
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR)
                self.commandDelegate.send(result, callbackId: command.callbackId)
                return
        }
        banner.hide()

        let result = CDVPluginResult(status: CDVCommandStatus_OK)
        self.commandDelegate.send(result, callbackId: command.callbackId)
    }

    @objc(interstitialIsLoaded:)
    func interstitialIsLoaded(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary,
            let id = opts.value(forKey: "id") as? Int,
            let interstitial = AMBAdBase.ads[id] as? AMBInterstitial
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR)
                self.commandDelegate.send(result, callbackId: command.callbackId)
                return
        }
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: interstitial.isLoaded())
        self.commandDelegate.send(result, callbackId: command.callbackId)
    }

    @objc(interstitialLoad:)
    func interstitialLoad(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary,
            let id = opts.value(forKey: "id") as? Int,
            let adUnitId = opts.value(forKey: "adUnitId") as? String,
            var interstitial = AMBAdBase.ads[id] as? AMBInterstitial?
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR)
                self.commandDelegate.send(result, callbackId: command.callbackId)
                return
        }
        if interstitial == nil {
            interstitial = AMBInterstitial(id: id, adUnitId: adUnitId)
        }
        interstitial!.load(command, request: createGADRequest(opts))
    }

    @objc(interstitialShow:)
    func interstitialShow(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary,
            let id = opts.value(forKey: "id") as? Int,
            let interstitial = AMBAdBase.ads[id] as? AMBInterstitial
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR)
                self.commandDelegate.send(result, callbackId: command.callbackId)
                return
        }
        interstitial.show(command)
    }

    @objc(rewardedIsLoaded:)
    func rewardedIsLoaded(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary,
            let id = opts.value(forKey: "id") as? Int,
            let rewarded = AMBAdBase.ads[id] as? AMBRewarded
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR)
                self.commandDelegate.send(result, callbackId: command.callbackId)
                return
        }
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: rewarded.isReady())
        self.commandDelegate.send(result, callbackId: command.callbackId)
    }

    @objc(rewardedLoad:)
    func rewardedLoad(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary,
            let id = opts.value(forKey: "id") as? Int,
            let adUnitId = opts.value(forKey: "adUnitId") as? String,
            var rewarded = AMBAdBase.ads[id] as? AMBRewarded?
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR)
                self.commandDelegate.send(result, callbackId: command.callbackId)
                return
        }
        if rewarded == nil {
            rewarded = AMBRewarded(id: id, adUnitId: adUnitId)
        }
        rewarded!.load(command, request: createGADRequest(opts))
    }

    @objc(rewardedShow:)
    func rewardedShow(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary,
            let id = opts.value(forKey: "id") as? Int,
            let rewarded = AMBAdBase.ads[id] as? AMBRewarded
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR)
                self.commandDelegate.send(result, callbackId: command.callbackId)
                return
        }
        rewarded.show(command)
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
        self.commandDelegate.send(result, callbackId: readyCallbackId)
    }
}
