@objc(AMSPlugin)
class AMSPlugin: CDVPlugin {
    static let testApplicationID = "ca-app-pub-3940256099942544~1458002511"

    var readyCallbackId: String!

    override func pluginInitialize() {
        super.pluginInitialize()

        AMSAdBase.plugin = self
        GADMobileAds.configure(withApplicationID: getApplicationID())
    }

    deinit {
        readyCallbackId = nil
    }

    func getApplicationID() -> String {
        let applicationID = commandDelegate.settings["APP_ID_IOS".lowercased()] as? String
        if applicationID == nil || applicationID == "" || applicationID == "test" {
            NSLog("admob is using testApplicationID")
            return AMSPlugin.testApplicationID
        }
        return applicationID!
    }

    @objc(ready:)
    func ready(command: CDVInvokedUrlCommand) {
        readyCallbackId = command.callbackId

        self.emit(eventType: AMSEvents.ready, data: [
            "platform": "ios",
            "applicationID": getApplicationID(),
            "sdkVersion": GADRequest.sdkVersion(),
            "isRunningInTestLab": false])
    }

    @objc(set_app_muted:)
    func set_app_muted(command: CDVInvokedUrlCommand) {
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

    @objc(set_app_volume:)
    func set_app_volume(command: CDVInvokedUrlCommand) {
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

    @objc(banner_show:)
    func banner_show(command: CDVInvokedUrlCommand) {
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

    @objc(banner_hide:)
    func banner_hide(command: CDVInvokedUrlCommand) {
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

    @objc(interstitial_load:)
    func interstitial_load(command: CDVInvokedUrlCommand) {
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

    @objc(interstitial_show:)
    func interstitial_show(command: CDVInvokedUrlCommand) {
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

    @objc(reward_video_is_ready:)
    func reward_video_is_ready(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary,
            let id = opts.value(forKey: "id") as? Int,
            let rewardVideo = AMSAdBase.ads[id] as? AMSRewardVideo
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: false)
                self.commandDelegate!.send(result, callbackId: command.callbackId)
                return
        }
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: rewardVideo.isReady())
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc(reward_video_load:)
    func reward_video_load(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary,
            let id = opts.value(forKey: "id") as? Int,
            let adUnitID = opts.value(forKey: "adUnitID") as? String,
            var rewardVideo = AMSAdBase.ads[id] as? AMSRewardVideo?
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: false)
                self.commandDelegate!.send(result, callbackId: command.callbackId)
                return
        }
        if rewardVideo == nil {
            rewardVideo = AMSRewardVideo(id: id, adUnitID: adUnitID)
        }
        rewardVideo!.load(request: createGADRequest(opts))

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc(reward_video_show:)
    func reward_video_show(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary,
            let id = opts.value(forKey: "id") as? Int,
            let rewardVideo = AMSAdBase.ads[id] as? AMSRewardVideo
            else {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: false)
                self.commandDelegate!.send(result, callbackId: command.callbackId)
                return
        }
        rewardVideo.show()

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    func createGADRequest(_ opts: NSDictionary) -> GADRequest {
        let request = GADRequest()
        if let testDevices = opts["testDevices"] as? [String] {
            request.testDevices = testDevices
        }
        if let childDirected = opts["childDirected"] as? Bool {
            request.tag(forChildDirectedTreatment: childDirected)
        }
        return request
    }

    func emit(eventType: String, data: Any = false) {
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: ["type": eventType, "data": data])
        result?.setKeepCallbackAs(true)
        self.commandDelegate!.send(result, callbackId: readyCallbackId)
    }

    func getAdSize(_ opts: NSDictionary) -> GADAdSize {
        if let adSizeType = opts.value(forKey: "adSize") as? Int {
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
