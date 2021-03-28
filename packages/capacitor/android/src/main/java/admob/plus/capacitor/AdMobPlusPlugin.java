package admob.plus.capacitor;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.gms.ads.MobileAds;

import admob.plus.capacitor.ads.Banner;
import admob.plus.capacitor.ads.Interstitial;
import admob.plus.capacitor.ads.Rewarded;
import admob.plus.capacitor.ads.RewardedInterstitial;

@CapacitorPlugin(name = "AdMobPlus")
public class AdMobPlusPlugin extends Plugin {

    @Override
    public void load() {
        super.load();

        ExecuteContext.plugin = this;
    }

    @PluginMethod
    public void start(PluginCall call) {
        MobileAds.initialize(getContext(), status -> call.resolve());
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
        MobileAds.setRequestConfiguration(ctx.optRequestConfiguration());
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
}
