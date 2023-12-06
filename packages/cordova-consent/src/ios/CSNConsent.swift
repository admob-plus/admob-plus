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

    @objc func ready(_ command: CDVInvokedUrlCommand) {
        readyCallbackId = command.callbackId

        self.emit(eventType: CSNEvents.ready)
    }

    @objc func canRequestAds(_ command: CDVInvokedUrlCommand) {
        let ctx = CSNContext(command)
        ctx.success(UMPConsentInformation.sharedInstance.canRequestAds)
    }

    @objc func privacyOptionsRequirementStatus(_ command: CDVInvokedUrlCommand) {
        let ctx = CSNContext(command)
        ctx.success(UMPConsentInformation.sharedInstance.privacyOptionsRequirementStatus.rawValue)
    }

    @objc func loadAndPresentIfRequired(_ command: CDVInvokedUrlCommand) {
        let ctx = CSNContext(command)
        UMPConsentForm.loadAndPresentIfRequired(from: self.viewController) {
            [weak self] loadAndPresentError in
            guard self != nil else { return ctx.success() }

            if let consentError = loadAndPresentError {
                ctx.error(consentError)
                return
            }
            ctx.success()
        }
    }

    @objc func presentPrivacyOptionsForm(_ command: CDVInvokedUrlCommand) {
        let ctx = CSNContext(command)
        UMPConsentForm.presentPrivacyOptionsForm(from: self.viewController) {
            [weak self] formError in
            guard self != nil, let formError else { return  ctx.success() }
            ctx.error(formError)
        }
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

    @objc func requestInfoUpdate(_ command: CDVInvokedUrlCommand) {
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

    @objc func getFormStatus(_ command: CDVInvokedUrlCommand) {
        let ctx = CSNContext(command)
        ctx.success(UMPConsentInformation.sharedInstance.formStatus.rawValue)
    }

    @objc func getConsentStatus(_ command: CDVInvokedUrlCommand) {
        let ctx = CSNContext(command)
        ctx.success(UMPConsentInformation.sharedInstance.consentStatus.rawValue)
    }

    @objc func loadForm(_ command: CDVInvokedUrlCommand) {
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

    @objc func showForm(_ command: CDVInvokedUrlCommand) {
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

    @objc func reset(_ command: CDVInvokedUrlCommand) {
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
