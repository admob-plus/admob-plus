@objc(AdMobNativePlugin)
class AdMobNativePlugin: CDVPlugin {
    override func pluginInitialize() {
        super.pluginInitialize()

        AMBPlugin.registerNativeAdViewProviders(["default": AMNAdViewProvider()])
    }
}
