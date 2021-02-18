import AppTrackingTransparency
import AdSupport

@objc(CSNConsent)
class CSNConsent: CDVPlugin {
    static var forms = Dictionary<Int, UMPConsentForm>()

    var readyCallbackId: String!

    override func pluginInitialize() {
        super.pluginInitialize()
    }

    deinit {
        readyCallbackId = nil
    }

    @objc(ready:)
    func ready(command: CDVInvokedUrlCommand) {
        readyCallbackId = command.callbackId

        self.emit(eventType: CSNEvents.ready)
    }

    @objc(requestTrackingAuthorization:)
    func requestTrackingAuthorization(command: CDVInvokedUrlCommand) {
        if #available(iOS 14, *) {
            ATTrackingManager.requestTrackingAuthorization(completionHandler: { status in
                let result = CDVPluginResult(
                    status: CDVCommandStatus_OK,
                    messageAs: status.rawValue)
                self.commandDelegate.send(result, callbackId: command.callbackId)
            })
        } else {
            let result = CDVPluginResult(status: CDVCommandStatus_OK)
            self.commandDelegate.send(result, callbackId: command.callbackId)
        }
    }

    @objc(requestInfoUpdate:)
    func requestInfoUpdate(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary
        else {
            let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: false)
            self.commandDelegate.send(result, callbackId: command.callbackId)
            return
        }

        let parameters = UMPRequestParameters()

        if let tagForUnderAgeOfConsent = opts.value(forKey: "tagForUnderAgeOfConsent") as? Bool {
            parameters.tagForUnderAgeOfConsent = tagForUnderAgeOfConsent
        }

        UMPConsentInformation.sharedInstance.requestConsentInfoUpdate(
            with: parameters,
            completionHandler: { error in
              if error != nil {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: error?.localizedDescription)
                self.commandDelegate.send(result, callbackId: command.callbackId)
              } else {
                let result = CDVPluginResult(status: CDVCommandStatus_OK)
                self.commandDelegate.send(result, callbackId: command.callbackId)
              }
            })
    }

    @objc(getFormStatus:)
    func getFormStatus(command: CDVInvokedUrlCommand) {
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: UMPConsentInformation.sharedInstance.formStatus.rawValue)
        self.commandDelegate.send(result, callbackId: command.callbackId)
    }

    @objc(getConsentStatus:)
    func getConsentStatus(command: CDVInvokedUrlCommand) {
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: UMPConsentInformation.sharedInstance.consentStatus.rawValue)
        self.commandDelegate.send(result, callbackId: command.callbackId)
    }

    @objc(getConsentType:)
    func getConsentType(command: CDVInvokedUrlCommand) {
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: UMPConsentInformation.sharedInstance.consentType.rawValue)
        self.commandDelegate.send(result, callbackId: command.callbackId)
    }

    @objc(loadForm:)
    func loadForm(command: CDVInvokedUrlCommand) {
        UMPConsentForm.load(
            completionHandler: { form, loadError in
              if loadError != nil {
                let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: loadError?.localizedDescription)
                self.commandDelegate.send(result, callbackId: command.callbackId)
              } else {
                CSNConsent.forms[form.hashValue] = form
                let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: form.hashValue)
                self.commandDelegate.send(result, callbackId: command.callbackId)
              }
            })
    }

    @objc(showForm:)
    func showForm(command: CDVInvokedUrlCommand) {
        guard let opts = command.argument(at: 0) as? NSDictionary,
              let id = opts.value(forKey: "id") as? Int,
              let form = CSNConsent.forms[id]
        else {
            let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: false)
            self.commandDelegate.send(result, callbackId: command.callbackId)
            return
        }

        form.present(
            from: self.viewController,
            completionHandler: { dismissError in
                if dismissError != nil {
                    let result = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: dismissError?.localizedDescription)
                    self.commandDelegate.send(result, callbackId: command.callbackId)
                } else {
                    let result = CDVPluginResult(status: CDVCommandStatus_OK)
                    self.commandDelegate.send(result, callbackId: command.callbackId)
                }
           })
    }

    @objc(reset:)
    func reset(command: CDVInvokedUrlCommand) {
        UMPConsentInformation.sharedInstance.reset()

        let result = CDVPluginResult(status: CDVCommandStatus_OK)
        self.commandDelegate.send(result, callbackId: command.callbackId)
    }

    func emit(eventType: String, data: Any = NSNull()) {
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: ["type": eventType, "data": data])
        result?.setKeepCallbackAs(true)
        self.commandDelegate.send(result, callbackId: readyCallbackId)
    }
}
