#if canImport(AppTrackingTransparency)
    import AppTrackingTransparency
#endif
import GoogleMobileAds

@objc(AMBPlugin)
class AMBPlugin: CDVPlugin, WKNavigationDelegate {
    static func registerNativeAdViewProviders(_ providers: [String: AMBNativeAdViewProvider]) {
        AMBNativeAd.providers.merge(providers) {(_, new) in new}
    }

    var readyCallbackId: String!

    deinit {
        readyCallbackId = nil
    }

    var navigationDelegate: WKNavigationDelegate?
    var overrideUrlLoading: Bool = true

    override func pluginInitialize() {
        super.pluginInitialize()

        AMBContext.plugin = self

        if let x = self.commandDelegate.settings["AdMobPlusWebViewAd".lowercased()] as? String,
           x == "true" {
            let webView = self.webViewEngine.engineWebView as! WKWebView
            GADMobileAds.sharedInstance().register(webView)
            // webView.reload()
        }

        if let x = self.commandDelegate.settings["AdMobPlusOverrideUrlLoading".lowercased()] as? String,
           x == "true" {
            let webView = self.webViewEngine.engineWebView as! WKWebView
            self.navigationDelegate = webView.navigationDelegate
            webView.navigationDelegate = self
        }

        if let x = self.commandDelegate.settings["disableSDKCrashReporting".lowercased()] as? String,
           x == "true" {
            GADMobileAds.sharedInstance().disableSDKCrashReporting()
        }
    }

    /*
        Correct way of OverrideLoadWithRequest, but cannot currently be used due to a limitation, use the webView.navigationDelegate for now
        See also: https://github.com/apache/cordova-ios/pull/1333
    */
    /*
    @objc func shouldOverrideLoadWithRequest(_ request: URLRequest, navigationAction: WKNavigationAction) -> Bool {

        var allowNavigationsPass = true

        if overrideUrlLoading {
            if let url = navigationAction.request.url, url.scheme == "http" || url.scheme == "https" {

                if navigationAction.sourceFrame == nil {
                    allowNavigationsPass = false
                }

                switch navigationAction.navigationType {
                    case .linkActivated:
                        allowNavigationsPass = false
                    case .other:
                        let range = url.absoluteString.range(of: "utm_content")
                        if range != nil {
                            allowNavigationsPass = false
                        }
                    default:
                        break
                }

                if !allowNavigationsPass {
                    UIApplication.shared.open(url)
                }
            }
        }

        return allowNavigationsPass
    }
    */

    @objc func ready(_ command: CDVInvokedUrlCommand) {
        readyCallbackId = command.callbackId

        DispatchQueue.global(qos: .background).async {
            self.emit(AMBEvents.ready, data: ["isRunningInTestLab": false])
        }
    }

    @objc func configure(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)
        ctx.configure()
    }

    @objc func configRequest(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)
        let requestConfiguration = GADMobileAds.sharedInstance().requestConfiguration

        if let maxAdContentRating = ctx.optMaxAdContentRating() {
            requestConfiguration.maxAdContentRating = maxAdContentRating
        }

        if let tag = ctx.optChildDirectedTreatmentTag() {
            requestConfiguration.tag(forChildDirectedTreatment: tag)
        }

        if let tag = ctx.optUnderAgeOfConsentTag() {
            requestConfiguration.tagForUnderAge(ofConsent: tag)
        }

        if let testDevices = ctx.optTestDeviceIds() {
            requestConfiguration.testDeviceIdentifiers = testDevices
        }

        ctx.resolve()
    }

    @objc func requestTrackingAuthorization(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        if #available(iOS 14, *) {
            ATTrackingManager.requestTrackingAuthorization(completionHandler: { status in
                ctx.resolve(status.rawValue)
            })
        } else {
            ctx.resolve(false)
        }
    }

    @objc func start(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        GADMobileAds.sharedInstance().start(completionHandler: { _ in
            ctx.resolve(["version": GADMobileAds.sharedInstance().sdkVersion])
        })
    }

    @objc func setAppMuted(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        if let muted = ctx.opt0() as? Bool {
            GADMobileAds.sharedInstance().applicationMuted = muted
            ctx.resolve()
        } else {
            ctx.reject()
        }
    }

    @objc func setAppVolume(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        if let volume = ctx.opt0() as? Float {
            GADMobileAds.sharedInstance().applicationVolume = volume
            ctx.resolve()
        } else {
            ctx.reject()
        }
    }

    @objc func adCreate(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        DispatchQueue.main.async {
            if let adClass = ctx.optString("cls") {
                var ad: AMBCoreAd?
                switch adClass {
                case "AppOpenAd":
                    ad = AMBAppOpenAd(ctx)
                case "BannerAd":
                    ad = AMBBanner(ctx)
                case "InterstitialAd":
                    ad = AMBInterstitial(ctx)
                case "NativeAd":
                    ad = AMBNativeAd(ctx)
                case "RewardedAd":
                    ad = AMBRewarded(ctx)
                case "RewardedInterstitialAd":
                    ad = AMBRewardedInterstitial(ctx)
                default:
                    break
                }
                if ad != nil {
                    ctx.resolve()
                } else {
                    ctx.reject("fail to create ad: \(ctx.optId() ?? "-")")
                }
            } else {
                ctx.reject()
            }
        }
    }

    @objc func adIsLoaded(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        DispatchQueue.main.async {
            if let ad = ctx.optAdOrError() as? AMBAdBase {
                ctx.resolve(ad.isLoaded())
            }
        }
    }

    @objc func adLoad(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        DispatchQueue.main.async {
            if let ad = ctx.optAdOrError() as? AMBAdBase {
                ad.load(ctx)
            }
        }
    }

    @objc func adShow(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        DispatchQueue.main.async {
            if let ad = ctx.optAdOrError() as? AMBAdBase {
                if ad.isLoaded() {
                    ad.show(ctx)
                    ctx.resolve(true)
                } else {
                    ctx.resolve(false)
                }
            }
        }
    }

    @objc func adHide(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        DispatchQueue.main.async {
            if let ad = ctx.optAdOrError() as? AMBAdBase {
                ad.hide(ctx)
            }
        }
    }

    @objc func bannerConfig(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        DispatchQueue.main.async {
            AMBBanner.config(ctx)
        }
    }

    @objc func webviewGoto(_ command: CDVInvokedUrlCommand) {
        let ctx = AMBContext(command)

        DispatchQueue.main.async {
            if let url = URL(string: ctx.optWebviewGoto()) {
                let webView = self.webViewEngine.engineWebView as! WKWebView
                self.overrideUrlLoading = false
                webView.load(URLRequest(url: url))
            }
        }
    }

    func emit(_ eventName: String, data: Any = NSNull()) {
        let result = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: ["type": eventName, "data": data])
        result?.setKeepCallbackAs(true)
        self.commandDelegate.send(result, callbackId: readyCallbackId)
    }

    // WKNavigationDelegate - this can be removed and replaced with shouldOverrideLoadWithRequest when it works without the limitation

    @objc func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {

        var allowNavigationsPass = true

        if overrideUrlLoading {
            if let url = navigationAction.request.url, url.scheme == "http" || url.scheme == "https" {

                if navigationAction.sourceFrame == nil {
                    allowNavigationsPass = false
                }

                switch navigationAction.navigationType {
                    case .linkActivated:
                        allowNavigationsPass = false
                    case .other:
                        let range = url.absoluteString.range(of: "utm_content")
                        if range != nil {
                            allowNavigationsPass = false
                        }
                    default:
                        break
                }

                if !allowNavigationsPass {
                    UIApplication.shared.open(url)
                    decisionHandler(.cancel)
                    return
                }
            }
        }

        if let navigationDelegate = self.navigationDelegate, navigationDelegate.responds(to: #selector(webView(_:decidePolicyFor:decisionHandler:))) {
            navigationDelegate.webView?(webView, decidePolicyFor: navigationAction, decisionHandler: decisionHandler)
        } else {
            decisionHandler(.allow)
        }
    }

    @objc func webView(_ webView: WKWebView, didCommit navigation: WKNavigation!) {
        if let navigationDelegate = self.navigationDelegate, navigationDelegate.responds(to: #selector(webView(_:didCommit:))) {
            navigationDelegate.webView?(webView, didCommit: navigation)
        }
    }

    @objc func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        if let navigationDelegate = self.navigationDelegate, navigationDelegate.responds(to: #selector(webView(_:didFinish:))) {
            navigationDelegate.webView?(webView, didFinish: navigation)
        }
    }

    @objc func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        if let navigationDelegate = self.navigationDelegate, navigationDelegate.responds(to: #selector(webView(_:didFail:withError:))) {
            navigationDelegate.webView?(webView, didFail: navigation, withError: error)
        }
    }

    @objc func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
        if let navigationDelegate = self.navigationDelegate, navigationDelegate.responds(to: #selector(webViewWebContentProcessDidTerminate(_:))) {
            navigationDelegate.webViewWebContentProcessDidTerminate?(webView)
        }
    }

    @objc func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!) {
        if let navigationDelegate = self.navigationDelegate, navigationDelegate.responds(to: #selector(webView(_:didStartProvisionalNavigation:))) {
            navigationDelegate.webView?(webView, didStartProvisionalNavigation: navigation)
        }
    }

    @objc func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        if let navigationDelegate = self.navigationDelegate, navigationDelegate.responds(to: #selector(webView(_:didFailProvisionalNavigation:withError:))) {
            navigationDelegate.webView?(webView, didFailProvisionalNavigation: navigation, withError: error)
        }
    }

    @objc func webView(_ webView: WKWebView, didReceiveServerRedirectForProvisionalNavigation navigation: WKNavigation!) {
        if let navigationDelegate = self.navigationDelegate, navigationDelegate.responds(to: #selector(webView(_:didReceiveServerRedirectForProvisionalNavigation:))) {
            navigationDelegate.webView?(webView, didReceiveServerRedirectForProvisionalNavigation: navigation)
        }
    }

}
