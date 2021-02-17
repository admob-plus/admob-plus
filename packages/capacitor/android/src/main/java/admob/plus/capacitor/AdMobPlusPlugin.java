package admob.plus.capacitor;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.initialization.InitializationStatus;
import com.google.android.gms.ads.initialization.OnInitializationCompleteListener;

import admob.plus.capacitor.ads.InterstitialAd;
import admob.plus.capacitor.ads.RewardedAd;

@CapacitorPlugin(name = "AdMobPlus")
public class AdMobPlusPlugin extends Plugin {

    @PluginMethod
    public void start(PluginCall call) {
        MobileAds.initialize(getContext(), new OnInitializationCompleteListener() {
            @Override
            public void onInitializationComplete(InitializationStatus status) {
                call.resolve();
            }
        });
    }

    @PluginMethod
    public void interstitialLoad(PluginCall call) {
        final InterstitialAd interstitialAd = InterstitialAd.getOrCreate(call);
        final AdRequest adRequest = new AdRequest.Builder().build();

        getBridge().executeOnMainThread(() -> {
            interstitialAd.load(this, call, adRequest);
        });
    }

    @PluginMethod
    public void interstitialShow(PluginCall call) {
        InterstitialAd interstitialAd = InterstitialAd.getOrCreate(call);
        getBridge().executeOnMainThread(() -> {
            interstitialAd.show(this, call);
        });
    }

    @PluginMethod
    public void rewardedLoad(PluginCall call) {
        final RewardedAd rewardedAd = RewardedAd.getOrCreate(call);
        final AdRequest adRequest = new AdRequest.Builder().build();

        getBridge().executeOnMainThread(() -> {
            rewardedAd.load(this, call, adRequest);
        });
    }

    @PluginMethod
    public void rewardedShow(PluginCall call) {
        RewardedAd rewardedAd = RewardedAd.getOrCreate(call);
        getBridge().executeOnMainThread(() -> {
            rewardedAd.show(this, call);
        });
    }
}
