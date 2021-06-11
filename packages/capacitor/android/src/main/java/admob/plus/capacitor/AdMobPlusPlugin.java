package admob.plus.capacitor;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.gms.ads.MobileAds;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Map;

import admob.plus.capacitor.ads.Banner;
import admob.plus.capacitor.ads.Interstitial;
import admob.plus.capacitor.ads.Rewarded;
import admob.plus.capacitor.ads.RewardedInterstitial;
import admob.plus.core.GenericAd;
import admob.plus.core.Helper;

@CapacitorPlugin(name = "AdMobPlus")
public class AdMobPlusPlugin extends Plugin implements Helper.Adapter {
    public Helper helper;

    @Override
    public void load() {
        super.load();

        this.helper = new Helper(this);
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

        ctx.resolve();
    }

    @PluginMethod
    public void configRequest(PluginCall call) {
        final ExecuteContext ctx = new ExecuteContext(call);
        MobileAds.setRequestConfiguration(ctx.optRequestConfiguration());
        helper.configForTestLab();
        ctx.resolve();
    }

    @PluginMethod
    public void adCreate(PluginCall call) {
        final ExecuteContext ctx = new ExecuteContext(call);

        getBridge().executeOnMainThread(() -> {
            String adClass = ctx.optString("cls");
            if (adClass == null) {
                ctx.reject("ad cls is missing");
            } else {
                switch (adClass) {
                    case "BannerAd":
                        new Banner(ctx);
                        break;
                    case "InterstitialAd":
                        new Interstitial(ctx);
                        break;
                    case "RewardedAd":
                        new Rewarded(ctx);
                        break;
                    case "RewardedInterstitialAd":
                        new RewardedInterstitial(ctx);
                        break;
                    default:
                        ctx.reject("ad cls is not supported: " + adClass);
                }
                ctx.resolve();
            }
        });
    }

    @PluginMethod
    public void adIsLoaded(PluginCall call) {
        final ExecuteContext ctx = new ExecuteContext(call);

        getBridge().executeOnMainThread(() -> {
            GenericAd ad = (GenericAd) ctx.optAdOrError();
            if (ad != null) {
                ctx.resolve(ad.isLoaded());
            }
        });
    }

    @PluginMethod
    public void adLoad(PluginCall call) {
        final ExecuteContext ctx = new ExecuteContext(call);

        getBridge().executeOnMainThread(() -> {
            GenericAd ad = (GenericAd) ctx.optAdOrError();
            if (ad != null) {
                ad.load(ctx);
            }
        });
    }

    @PluginMethod
    public void adShow(PluginCall call) {
        final ExecuteContext ctx = new ExecuteContext(call);

        getBridge().executeOnMainThread(() -> {
            GenericAd ad = (GenericAd) ctx.optAdOrError();
            if (ad != null) {
                if (ad.isLoaded()) {
                    ad.show(ctx);
                } else {
                    ctx.reject("ad is not loaded");
                }
            }
        });
    }

    @PluginMethod
    public void adHide(PluginCall call) {
        final ExecuteContext ctx = new ExecuteContext(call);

        getBridge().executeOnMainThread(() -> {
            GenericAd ad = (GenericAd) ctx.optAdOrError();
            if (ad != null) {
                ad.hide(ctx);
            }
        });
    }

    public void emit(String eventName, JSObject data) {
        notifyListeners(eventName, data);
    }

    @Override
    public void emit(String eventName, Map<String, Object> data) {
        try {
            emit(eventName, JSObject.fromJSONObject(new JSONObject(data)));
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}
