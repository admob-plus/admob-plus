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
    private void interstitialLoad(PluginCall call) {
        InterstitialAd interstitialAd = InterstitialAd.getOrCreate(call);
        AdRequest adRequest = new AdRequest.Builder().build();

        getActivity().runOnUiThread(() -> {
            interstitialAd.load(this, call, adRequest);
        });
    }

    @PluginMethod
    private void interstitialShow(PluginCall call) {
        InterstitialAd interstitialAd = InterstitialAd.getOrCreate(call);
        getActivity().runOnUiThread(() -> {
            interstitialAd.show(this, call);
        });
    }

    @PluginMethod
    private void rewardedLoad(PluginCall call) {
        RewardedAd rewardedAd = RewardedAd.getOrCreate(call);
        AdRequest adRequest = new AdRequest.Builder().build();

        getActivity().runOnUiThread(() -> {
            rewardedAd.load(this, call, adRequest);
        });
    }

    @PluginMethod
    private void rewardedShow(PluginCall call) {
        RewardedAd rewardedAd = RewardedAd.getOrCreate(call);
        getActivity().runOnUiThread(() -> {
            rewardedAd.show(this, call);
        });
    }
}
