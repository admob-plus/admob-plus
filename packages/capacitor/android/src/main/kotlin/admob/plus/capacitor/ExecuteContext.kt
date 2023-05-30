package admob.plus.capacitor

import admob.plus.capacitor.ads.AdBase
import admob.plus.core.Context
import admob.plus.core.Helper.Companion.jsonArray2stringList
import android.app.Activity
import com.getcapacitor.JSObject
import com.getcapacitor.PluginCall
import org.json.JSONException
import org.json.JSONObject
import java.lang.reflect.InvocationTargetException

class ExecuteContext internal constructor(val call: PluginCall) : Context {
    fun <T : AdBase?> optAdOrCreate(type: Class<T>): T? {
        var ad = type.cast(optAd())
        if (ad == null) {
            try {
                ad = type.getDeclaredConstructor(ExecuteContext::class.java).newInstance(this)
            } catch (e: IllegalAccessException) {
                e.printStackTrace()
                this.reject("Fail to create ad")
            } catch (e: InstantiationException) {
                e.printStackTrace()
                this.reject("Fail to create ad")
            } catch (e: InvocationTargetException) {
                e.printStackTrace()
                this.reject("Fail to create ad")
            } catch (e: NoSuchMethodException) {
                e.printStackTrace()
                this.reject("Fail to create ad")
            }
        }
        return ad
    }

    val activity: Activity
        get() = plugin!!.getActivity()

    override fun has(name: String): Boolean {
        return call.hasOption(name)
    }

    override fun opt(name: String?): Any? {
        return call.data.opt(name)
    }

    override fun optBoolean(name: String?): Boolean? {
        return call.getBoolean(name)
    }

    override fun optDouble(name: String): Double? {
        return call.getDouble(name)
    }

    override fun optFloat(name: String): Float? {
        return call.getFloat(name)
    }

    override fun optInt(name: String?): Int? {
        return call.getInt(name)
    }

    override fun optString(name: String?): String? {
        return call.getString(name)
    }

    override fun optStringList(name: String?): List<String?> {
        return jsonArray2stringList(call.getArray(name))
    }

    override fun optObject(name: String?): JSONObject? {
        return call.getObject(name, null)
    }

    override fun resolve() {
        call.resolve()
    }

    override fun resolve(data: Boolean) {
        try {
            call.resolve(JSObject("true"))
        } catch (e: JSONException) {
            e.printStackTrace()
            reject()
        }
    }

    override fun reject(msg: String?) {
        call.reject(msg)
    }

    companion object {
        var plugin: AdMobPlusPlugin? = null
    }
}
