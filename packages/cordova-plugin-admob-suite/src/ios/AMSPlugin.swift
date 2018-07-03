@objc(AMSPlugin)
class AMSPlugin: CDVPlugin {
    let testApplicationID = "ca-app-pub-3940256099942544~1458002511"

    var banner: AMSBanner!
    var interstitial: AMSInterstitial!
    var readyCallbackId: String!

    override func pluginInitialize() {
        super.pluginInitialize()

        banner = AMSBanner(plugin: self)
        interstitial = AMSInterstitial(plugin: self)

        var applicationID = commandDelegate.settings["ADMOB_APPLICATOIN_ID".lowercased()] as? String
        if applicationID == nil || applicationID == "test" {
            applicationID = testApplicationID
            NSLog("admob is using testApplicationID")
        }
        GADMobileAds.configure(withApplicationID: applicationID!)
    }

    deinit {
        interstitial = nil
        readyCallbackId = nil
    }

    @objc(ready:)
    func ready(command: CDVInvokedUrlCommand) {
        readyCallbackId = command.callbackId

        self.emit(eventType: "admob.ready")

        banner.show()
    }

    @objc(interstitial_prepare:)
    func interstitial_prepare(command: CDVInvokedUrlCommand) {
        interstitial.prepare()

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc(interstitial_show:)
    func interstitial_show(command: CDVInvokedUrlCommand) {
        interstitial.show()

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    func emit(eventType: String) {
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: ["type": eventType])
        result?.setKeepCallbackAs(true)
        self.commandDelegate!.send(result, callbackId: readyCallbackId)
    }
}
