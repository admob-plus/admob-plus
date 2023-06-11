import GoogleMobileAds

@objc(AdMobWebviewAdPlugin)
class AdMobWebviewAdPlugin: CDVPlugin, WKNavigationDelegate {

    var navigationDelegate: WKNavigationDelegate?
    var overrideUrlLoading: Bool = true

    override func pluginInitialize() {
        super.pluginInitialize()

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

                // Allow webviewGoto urls to pass
                let range = url.absoluteString.range(of: "from_webview_goto")
                if range != nil {
                    allowNavigationsPass = true
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
