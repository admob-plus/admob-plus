package admob.plus.capacitor;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.initialization.InitializationStatus;
import com.google.android.gms.ads.initialization.OnInitializationCompleteListener;

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
}
