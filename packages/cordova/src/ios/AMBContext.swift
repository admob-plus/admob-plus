class AMBContext {
    static weak var plugin: AMBPlugin!

    let plugin: AMBPlugin
    let command: CDVInvokedUrlCommand

    init(plugin: AMBPlugin, command: CDVInvokedUrlCommand) {
        self.plugin = plugin
        self.command = command
    }

    var commandDelegate: CDVCommandDelegate {
        return plugin.commandDelegate
    }

    var opts: NSDictionary? {
        return command.argument(at: 0) as? NSDictionary
    }

    func optString(_ key: String) -> String? {
        return opts?.value(forKey: key) as? String
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
        switch opts?["tagForChildDirectedTreatment"] as? Int {
        case 0:
            return false
        case 1:
            return true
        default:
            return nil
        }
    }

    func optUnderAgeOfConsentTag() -> Bool? {
        switch opts?["tagForUnderAgeOfConsent"] as? Int {
        case 0:
            return false
        case 1:
            return true
        default:
            return nil
        }
    }

    func optTestDeviceIds() -> [String]? {
        if let testDeviceIds = opts?["testDeviceIds"] as? [String] {
            return testDeviceIds
        }
        return nil
    }

    func sendResult(_ message: CDVPluginResult?) {
        self.commandDelegate.send(message, callbackId: command.callbackId)
    }

    func success() {
        self.sendResult(CDVPluginResult(status: CDVCommandStatus_OK))
    }

    func success(_ message: Bool) {
        self.sendResult(CDVPluginResult(status: CDVCommandStatus_OK, messageAs: message))
    }

    func success(_ message: UInt) {
        self.sendResult(CDVPluginResult(status: CDVCommandStatus_OK, messageAs: message))
    }

    func success(_ message: [String: Any]) {
        self.sendResult(CDVPluginResult(status: CDVCommandStatus_OK, messageAs: message))
    }

    func error() {
        self.sendResult(CDVPluginResult(status: CDVCommandStatus_ERROR))
    }

    func error(_ message: Error?) {
        self.sendResult(CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: message?.localizedDescription))
    }
}
