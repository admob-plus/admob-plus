package admob.plus.core

import android.annotation.SuppressLint
import android.app.Activity
import android.content.res.Resources
import android.provider.Settings
import android.util.DisplayMetrics
import android.util.SparseArray
import android.view.View
import android.view.ViewGroup
import com.google.android.gms.ads.MobileAds
import org.json.JSONArray
import java.math.BigInteger
import java.security.MessageDigest
import java.security.NoSuchAlgorithmException
import java.util.Locale

class Helper(private val adapter: Adapter) {
    val activity: Activity
        get() = adapter.activity
    val isRunningInTestLab: Boolean
        get() {
            val testLabSetting =
                Settings.System.getString(activity.contentResolver, "firebase.test.lab")
            return "true" == testLabSetting
        }

    fun configForTestLab() {
        if (!isRunningInTestLab) {
            return
        }
        val config = MobileAds.getRequestConfiguration()
        val testDeviceIds = config.testDeviceIds
        val deviceId = deviceId
        if (testDeviceIds.contains(deviceId)) {
            return
        }
        testDeviceIds.add(deviceId)
        val builder = config.toBuilder()
        builder.setTestDeviceIds(testDeviceIds)
        MobileAds.setRequestConfiguration(builder.build())
    }

    private val deviceId: String
        private get() {
            // This will request test ads on the emulator and device by passing this hashed device ID.
            @SuppressLint("HardwareIds") val ANDROID_ID = Settings.Secure.getString(
                activity.contentResolver, Settings.Secure.ANDROID_ID
            )
            return md5(ANDROID_ID).uppercase(Locale.getDefault())
        }

    interface Adapter {
        val activity: Activity
        fun emit(eventName: String?, data: Map<String?, Any?>?)
        fun emit(eventName: String?) {
            emit(eventName, HashMap())
        }
    }

    companion object {
        val ads = SparseArray<Ad>()
        fun getAd(id: Int?): Ad {
            return ads[id!!]
        }

        fun dpToPx(dp: Double): Double {
            return dp * Resources.getSystem().displayMetrics.density
        }

        fun pxToDp(px: Int): Int {
            val displayMetrics =
                Resources.getSystem().displayMetrics
            return Math.round(px / (displayMetrics.xdpi / DisplayMetrics.DENSITY_DEFAULT))
        }

        @JvmStatic
        fun jsonArray2stringList(a: JSONArray?): List<String> {
            val result: MutableList<String> = ArrayList()
            if (a == null) {
                return result
            }
            for (i in 0 until a.length()) {
                val testDeviceId = a.optString(i)
                if (testDeviceId != null) {
                    result.add(testDeviceId)
                }
            }
            return result
        }

        @JvmStatic
        fun getParentView(view: View?): ViewGroup? {
            return if (view == null) null else view.parent as ViewGroup
        }

        @JvmStatic
        fun removeFromParentView(view: View?): ViewGroup? {
            val viewParent = getParentView(view)
            viewParent?.removeView(view)
            return viewParent
        }

        fun NOT_IMPLEMENTED() {
            throw UnsupportedOperationException("Not implemented.")
        }

        private fun md5(s: String): String {
            try {
                val digest = MessageDigest.getInstance("MD5")
                digest.update(s.toByteArray())
                val bigInt = BigInteger(1, digest.digest())
                return String.format("%32s", bigInt.toString(16)).replace(' ', '0')
            } catch (ignore: NoSuchAlgorithmException) {
            }
            return ""
        }
    }
}
