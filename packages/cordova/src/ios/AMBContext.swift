class AMBContext {
    var plugin: AMBPlugin!
    var command: CDVInvokedUrlCommand!

    var commandDelegate: CDVCommandDelegate {
        return self.plugin.commandDelegate
    }

    init(plugin: AMBPlugin, command: CDVInvokedUrlCommand) {
        self.plugin = plugin
        self.command = command
    }

    deinit {
        plugin = nil
        command = nil
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
