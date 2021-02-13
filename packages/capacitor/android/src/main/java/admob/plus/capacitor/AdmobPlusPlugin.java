package admob.plus.capacitor;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "AdmobPlus")
public class AdmobPlusPlugin extends Plugin {

    private AdmobPlus implementation = new AdmobPlus();

    @PluginMethod
    public void start(PluginCall call) {
        call.resolve();
    }
}
