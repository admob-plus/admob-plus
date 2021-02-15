package admob.plus.capacitor;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "AdMobPlus")
public class AdMobPlusPlugin extends Plugin {

    private AdMobPlus implementation = new AdMobPlus();

    @PluginMethod
    public void start(PluginCall call) {
        call.resolve();
    }
}
