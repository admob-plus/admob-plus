#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(AdMobPlusPlugin, "AdMobPlus",
           CAP_PLUGIN_METHOD(start, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(interstitialLoad, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(interstitialShow, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(rewardedLoad, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(rewardedShow, CAPPluginReturnPromise);
)
