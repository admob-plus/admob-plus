import UserMessagingPlatform

class CSNContext {
    static var forms = [Int: UMPConsentForm]()
    static weak var plugin: CSNConsent!

    let command: CDVInvokedUrlCommand

    init(_ command: CDVInvokedUrlCommand) {
        self.command = command
    }

    var plugin: CSNConsent {
        return CSNContext.plugin
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

    func optId() -> Int? {
        return opt("id") as? Int
    }

    func optForm() -> UMPConsentForm? {
        if let id = optId() {
            return CSNContext.forms[id]
        }
        return nil
    }

    func optDebugGeography() -> UMPDebugGeography? {
        if let value = opt("debugGeography") as? Int {
            return UMPDebugGeography(rawValue: value)
        }
        return nil
    }

    func optTestDeviceIds() -> [String]? {
        if let testDeviceIds = opt("testDeviceIds") as? [String] {
            return testDeviceIds
        }
        return nil
    }

    func optUMPDebugSettings() -> UMPDebugSettings {
        let debugSettings = UMPDebugSettings()

        if let debugGeography = optDebugGeography() {
            debugSettings.geography = debugGeography
        }

        if let testDeviceIds = optTestDeviceIds() {
            debugSettings.testDeviceIdentifiers = testDeviceIds
        }

        return debugSettings
    }

    func optUMPRequestParameters() -> UMPRequestParameters {
        let parameters = UMPRequestParameters()

        if let tagForUnderAgeOfConsent = opt("tagForUnderAgeOfConsent") as? Bool {
            parameters.tagForUnderAgeOfConsent = tagForUnderAgeOfConsent
        }

        parameters.debugSettings = optUMPDebugSettings()

        return parameters
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

    func success(_ message: Int) {
        self.sendResult(CDVPluginResult(status: CDVCommandStatus_OK, messageAs: message))
    }

    func success(_ message: [String: Any]) {
        self.sendResult(CDVPluginResult(status: CDVCommandStatus_OK, messageAs: message))
    }

    func error() {
        self.sendResult(CDVPluginResult(status: CDVCommandStatus_ERROR))
    }

    func error(_ message: String?) {
        self.sendResult(CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: message))
    }

    func error(_ message: Error?) {
        self.error(message?.localizedDescription)
    }
}
