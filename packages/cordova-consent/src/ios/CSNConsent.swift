import UserMessagingPlatform

@objc(CSNConsent)
class CSNConsent: CDVPlugin {
    static var forms = [Int: UMPConsentForm]()

    var readyCallbackId: String!

    override func pluginInitialize() {
        super.pluginInitialize()

        CSNContext.plugin = self
    }

    deinit {
        readyCallbackId = nil
        CSNContext.plugin = nil
    }

    @objc(ready:)
    func ready(command: CDVInvokedUrlCommand) {
        readyCallbackId = command.callbackId

        self.emit(eventType: CSNEvents.ready)
    }

    @objc(requestInfoUpdate:)
    func requestInfoUpdate(command: CDVInvokedUrlCommand) {
        let ctx = CSNContext(command)
        let parameters = UMPRequestParameters()

        if let tagForUnderAgeOfConsent = ctx.opt("tagForUnderAgeOfConsent") as? Bool {
            parameters.tagForUnderAgeOfConsent = tagForUnderAgeOfConsent
        }

        UMPConsentInformation.sharedInstance.requestConsentInfoUpdate(
            with: parameters,
            completionHandler: { error in
              if error != nil {
                ctx.error(error!)
              } else {
                ctx.success()
              }
            })
    }

    @objc(getFormStatus:)
    func getFormStatus(command: CDVInvokedUrlCommand) {
        let ctx = CSNContext(command)
        ctx.success(UMPConsentInformation.sharedInstance.formStatus.rawValue)
    }

    @objc(getConsentStatus:)
    func getConsentStatus(command: CDVInvokedUrlCommand) {
        let ctx = CSNContext(command)
        ctx.success(UMPConsentInformation.sharedInstance.consentStatus.rawValue)
    }

    @objc(getConsentType:)
    func getConsentType(command: CDVInvokedUrlCommand) {
        let ctx = CSNContext(command)
        ctx.success(UMPConsentInformation.sharedInstance.consentType.rawValue)
    }

    @objc(loadForm:)
    func loadForm(command: CDVInvokedUrlCommand) {
        let ctx = CSNContext(command)

        UMPConsentForm.load(
            completionHandler: { form, loadError in
              if loadError != nil {
                ctx.error(loadError!)
              } else {
                CSNConsent.forms[form.hashValue] = form
                ctx.success(form.hashValue)
              }
            })
    }

    @objc(showForm:)
    func showForm(command: CDVInvokedUrlCommand) {
        let ctx = CSNContext(command)

        guard let id = ctx.optId(),
              let form = CSNConsent.forms[id]
        else {
            ctx.error()
            return
        }

        form.present(
            from: self.viewController,
            completionHandler: { dismissError in
                if dismissError != nil {
                    ctx.error(dismissError!)
                } else {
                    ctx.success()
                }
           })
    }

    @objc(reset:)
    func reset(command: CDVInvokedUrlCommand) {
        let ctx = CSNContext(command)
        UMPConsentInformation.sharedInstance.reset()
        ctx.success()
    }

    func emit(eventType: String, data: Any = NSNull()) {
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: ["type": eventType, "data": data])
        result?.setKeepCallbackAs(true)
        self.commandDelegate.send(result, callbackId: readyCallbackId)
    }
}
