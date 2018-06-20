@objc(AMSPlugin)
class AMSPlugin: CDVPlugin {
    override func pluginInitialize() {
        super.pluginInitialize()

        print("initialize plugin")
    }

    @objc(ready:)
    func ready(command: CDVInvokedUrlCommand) {
        print("device ready")

        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: true)
        result?.setKeepCallbackAs(true);
        self.commandDelegate!.send(result, callbackId: command.callbackId)
    }
}
