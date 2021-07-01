import GoogleMobileAds

class AMBContext: AMBCoreContext {
    func resolve() {
        self.sendResult(CDVPluginResult(status: CDVCommandStatus_OK))
    }

    func resolve(_ msg: Bool) {
        self.sendResult(CDVPluginResult(status: CDVCommandStatus_OK, messageAs: msg))
    }

    func resolve(_ msg: UInt) {
        self.sendResult(CDVPluginResult(status: CDVCommandStatus_OK, messageAs: msg))
    }

    func resolve(_ data: [String: Any]) {
        self.sendResult(CDVPluginResult(status: CDVCommandStatus_OK, messageAs: data))
    }

    func reject(_ msg: String) {
        self.sendResult(CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: msg))
    }

    static weak var plugin: AMBPlugin!

    let command: CDVInvokedUrlCommand

    init(_ command: CDVInvokedUrlCommand) {
        self.command = command
    }

    var plugin: AMBPlugin {
        return AMBContext.plugin
    }

    var commandDelegate: CDVCommandDelegate {
        return plugin.commandDelegate
    }

    func opt0() -> Any? {
        return command.argument(at: 0)
    }

    lazy var opts: NSDictionary? = {
        return opt0() as? NSDictionary
    }()

    func opt(_ key: String) -> Any? {
        return opts?.value(forKey: key)
    }

    func optString(_ key: String) -> String? {
        return opt(key) as? String
    }

    func optId() -> Int? {
        return opt("id") as? Int
    }

    func optAdUnitID() -> String? {
        return optString("adUnitId")
    }

    func optPosition() -> String? {
        return optString("position")
    }

    func optOffset() -> CGFloat? {
        return opt("offset") as? CGFloat
    }

    func optBackgroundColor() -> UIColor? {
        if let bgColor = opt("backgroundColor") as? NSDictionary,
           let r = bgColor["r"] as? CGFloat,
           let g = bgColor["g"] as? CGFloat,
           let b = bgColor["b"] as? CGFloat,
           let a = bgColor["a"] as? CGFloat {
            return UIColor(red: r / 255, green: g / 255, blue: b / 255, alpha: a / 255)
        }
        return nil
    }

    func optMarginTop() -> CGFloat? {
        return opt("marginTop") as? CGFloat
    }

    func optMarginBottom() -> CGFloat? {
        return opt("marginBottom") as? CGFloat
    }

    func optMaxAdContentRating() -> GADMaxAdContentRating? {
        switch optString("maxAdContentRating") {
        case "G":
            return GADMaxAdContentRating.general
        case "MA":
            return GADMaxAdContentRating.matureAudience
        case "PG":
            return GADMaxAdContentRating.parentalGuidance
        case "T":
            return GADMaxAdContentRating.teen
        default:
            return nil
        }
    }

    func optChildDirectedTreatmentTag() -> Bool? {
        return opt("tagForChildDirectedTreatment") as? Bool
    }

    func optUnderAgeOfConsentTag() -> Bool? {
        return opt("tagForUnderAgeOfConsent") as? Bool
    }

    func optTestDeviceIds() -> [String]? {
        if let testDeviceIds = opt("testDeviceIds") as? [String] {
            return testDeviceIds
        }
        return nil
    }

    func optGADRequest() -> GADRequest {
        let request = GADRequest()
        if let contentURL = optString("contentUrl") {
            request.contentURL = contentURL
        }
        let extras = GADExtras()
        if let npa = optString("npa") {
            extras.additionalParameters = ["npa": npa]
        }
        request.register(extras)
        return request
    }

    func optAdSize() -> GADAdSize {
        if let adSizeType = opt("size") as? Int {
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
        guard let adSizeDict = opt("size") as? NSDictionary,
              let width = adSizeDict.value(forKey: "width") as? Int,
              let height = adSizeDict.value(forKey: "height") as? Int
        else {
            return kGADAdSizeBanner
        }
        return GADAdSizeFromCGSize(CGSize(width: width, height: height))
    }

    func optGADServerSideVerificationOptions() -> GADServerSideVerificationOptions? {
        guard let ssv = opt("serverSideVerification") as? NSDictionary
        else {
            return nil
        }

        let options = GADServerSideVerificationOptions.init()
        if let customData = ssv.value(forKey: "customData") as? String {
            options.customRewardString = customData
        }
        if let userId = ssv.value(forKey: "userId") as? String {
            options.userIdentifier = userId
        }
        return options
    }

    func sendResult(_ message: CDVPluginResult?) {
        self.commandDelegate.send(message, callbackId: command.callbackId)
    }
}
