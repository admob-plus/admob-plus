package admob.plus.capacitor;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.gms.ads.MobileAds;

import org.json.JSONException;

import admob.plus.AdMobHelper;
import admob.plus.capacitor.ads.Banner;
import admob.plus.capacitor.ads.Interstitial;
import admob.plus.capacitor.ads.Rewarded;
import admob.plus.capacitor.ads.RewardedInterstitial;

@CapacitorPlugin(name = "AdMobPlus")
public class AdMobPlusPlugin extends Plugin implements AdMobHelper.Adapter {
    public AdMobHelper helper;

    @Override
    public void load() {
        super.load();

        this.helper = new AdMobHelper(this);

        ExecuteContext.plugin = this;
    }

    @PluginMethod
    public void trackingAuthorizationStatus(PluginCall call) {
        try {
            call.resolve(new JSObject("{\"status\": false}"));
        } catch (JSONException ex) {
            call.reject(ex.toString());
        }
    }

    @PluginMethod
    public void requestTrackingAuthorization(PluginCall call) {
        try {
            call.resolve(new JSObject("{\"status\": false}"));
        } catch (JSONException ex) {
            call.reject(ex.toString());
        }
    }

    @PluginMethod
    public void start(PluginCall call) {
        MobileAds.initialize(getContext(), status -> {
            helper.configForTestLab();
            call.resolve();
        });
    }

    @PluginMethod
    public void configure(PluginCall call) {
        final ExecuteContext ctx = new ExecuteContext(call);

        if (ctx.optAppMuted() != null) {
            MobileAds.setAppMuted(ctx.optAppMuted());
        }

        if (ctx.optAppVolume() != null) {
            MobileAds.setAppVolume(ctx.optAppVolume());
        }

        ctx.success();
    }

    @PluginMethod
    public void configRequest(PluginCall call) {
        final ExecuteContext ctx = new ExecuteContext(call);
        MobileAds.setRequestConfiguration(helper.buildRequestConfiguration(call.getData()));
        helper.configForTestLab();
        ctx.success();
    }

    @PluginMethod
    public void bannerShow(PluginCall call) {
        final ExecuteContext ctx = new ExecuteContext(call);

        getBridge().executeOnMainThread(() -> {
            Banner ad = ctx.optAdOrCreate(Banner.class);
            if (ad != null) {
                ad.show(ctx);
            }
        });
    }

    @PluginMethod
    public void bannerHide(PluginCall call) {
        final ExecuteContext ctx = new ExecuteContext(call);

        getBridge().executeOnMainThread(() -> {
            final Banner ad = (Banner) ctx.optAdOrError();
            if (ad != null) {
                ad.hide(ctx);
            }
        });
    }

    @PluginMethod
    public void interstitialLoad(PluginCall call) {
        final ExecuteContext ctx = new ExecuteContext(call);

        getBridge().executeOnMainThread(() -> {
            Interstitial ad = ctx.optAdOrCreate(Interstitial.class);
            if (ad != null) {
                ad.load(ctx);
            }
        });
    }

    @PluginMethod
    public void interstitialShow(PluginCall call) {
        final ExecuteContext ctx = new ExecuteContext(call);

        getBridge().executeOnMainThread(() -> {
            Interstitial ad = (Interstitial) ctx.optAdOrError();
            if (ad != null) {
                ad.show(ctx);
            }
        });
    }

    @PluginMethod
    public void rewardedLoad(PluginCall call) {
        final ExecuteContext ctx = new ExecuteContext(call);

        getBridge().executeOnMainThread(() -> {
            Rewarded ad = ctx.optAdOrCreate(Rewarded.class);
            ad.load(ctx);
        });
    }

    @PluginMethod
    public void rewardedShow(PluginCall call) {
        final ExecuteContext ctx = new ExecuteContext(call);

        getBridge().executeOnMainThread(() -> {
            Rewarded ad = (Rewarded) ctx.optAd();
            ad.show(ctx);
        });
    }

    @PluginMethod
    public void rewardedInterstitialLoad(PluginCall call) {
        final ExecuteContext ctx = new ExecuteContext(call);

        getBridge().executeOnMainThread(() -> {
            RewardedInterstitial ad = ctx.optAdOrCreate(RewardedInterstitial.class);
            ad.load(ctx);
        });
    }

    @PluginMethod
    public void rewardedInterstitialShow(PluginCall call) {
        final ExecuteContext ctx = new ExecuteContext(call);

        getBridge().executeOnMainThread(() -> {
            RewardedInterstitial ad = (RewardedInterstitial) ctx.optAd();
            ad.show(ctx);
        });
    }

    public void emit(String eventName, JSObject data) {
        notifyListeners(eventName, data);
    }
}
