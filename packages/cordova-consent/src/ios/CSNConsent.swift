#if canImport(AppTrackingTransparency)
    import AppTrackingTransparency
#endif
import UserMessagingPlatform

@objc(CSNConsent)
class CSNConsent: CDVPlugin {
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

    @objc func trackingAuthorizationStatus(_ command: CDVInvokedUrlCommand) {
        let ctx = CSNContext(command)

        if #available(iOS 14, *) {
            ctx.success(ATTrackingManager.trackingAuthorizationStatus.rawValue)
        } else {
            ctx.success(false)
        }
    }

    @objc func requestTrackingAuthorization(_ command: CDVInvokedUrlCommand) {
        let ctx = CSNContext(command)

        if #available(iOS 14, *) {
            ATTrackingManager.requestTrackingAuthorization(completionHandler: { status in
                ctx.success(status.rawValue)
            })
        } else {
            ctx.success(false)
        }
    }

    @objc(requestInfoUpdate:)
    func requestInfoUpdate(command: CDVInvokedUrlCommand) {
        let ctx = CSNContext(command)

        UMPConsentInformation.sharedInstance.requestConsentInfoUpdate(
            with: ctx.optUMPRequestParameters(),
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

    @objc(loadForm:)
    func loadForm(command: CDVInvokedUrlCommand) {
        let ctx = CSNContext(command)

        UMPConsentForm.load(
            completionHandler: { form, loadError in
              if loadError != nil {
                ctx.error(loadError!)
              } else {
                let id = form.hashValue % (2 << 30)
                CSNContext.forms[id] = form
                ctx.success(id)
              }
            })
    }

    @objc(showForm:)
    func showForm(command: CDVInvokedUrlCommand) {
        let ctx = CSNContext(command)

        if let form = ctx.optForm() {
            form.present(
                from: self.viewController,
                completionHandler: { dismissError in
                    if dismissError != nil {
                        ctx.error(dismissError!)
                    } else {
                        ctx.success()
                    }
                })
        } else {
            ctx.error("Form not found")
        }
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
