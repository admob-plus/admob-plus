@objc(AMSPlugin)
class AMSPlugin: CDVPlugin {
    var interstitial: AMSInterstitial!

    override func pluginInitialize() {
        super.pluginInitialize()

        interstitial = AMSInterstitial(plugin: self)

        GADMobileAds.configure(withApplicationID: "ca-app-pub-3940256099942544~1458002511")
    }

    deinit {
        interstitial = nil
    }

    @objc(ready:)
    func ready(command: CDVInvokedUrlCommand) {
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        result?.setKeepCallbackAs(true);
        self.commandDelegate!.send(result, callbackId: command.callbackId)
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
}
