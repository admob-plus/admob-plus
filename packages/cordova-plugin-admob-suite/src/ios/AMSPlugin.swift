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

        self.emit(eventType: AMSEvents.ready, data: "ios")
    }

    @objc(banner_show:)
    func banner_show(command: CDVInvokedUrlCommand) {
        banner.show(adUnitID: (command.argument(at: 0) as? String)!)

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc(interstitial_load:)
    func interstitial_load(command: CDVInvokedUrlCommand) {
        interstitial.load(adUnitID: (command.argument(at: 0) as? String)!)

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    @objc(interstitial_show:)
    func interstitial_show(command: CDVInvokedUrlCommand) {
        interstitial.show()

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }

    func emit(eventType: String, data: Any = false) {
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: ["type": eventType, "data": data])
        result?.setKeepCallbackAs(true)
        self.commandDelegate!.send(result, callbackId: readyCallbackId)
    }

}
