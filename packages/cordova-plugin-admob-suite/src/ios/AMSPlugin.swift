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
        print("device ready")

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        result?.setKeepCallbackAs(true);
        self.commandDelegate!.send(result, callbackId: command.callbackId)

        interstitial.prepare()
    }
}
