package admob.plus.core

import android.annotation.SuppressLint
import android.app.Activity
import android.content.res.Resources
import android.os.Bundle
import android.provider.Settings
import android.util.DisplayMetrics
import com.google.ads.mediation.admob.AdMobAdapter
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.MobileAds
import org.json.JSONArray
import org.json.JSONObject
import java.math.BigInteger
import java.security.MessageDigest
import java.security.NoSuchAlgorithmException
import java.util.Locale
import kotlin.math.roundToInt

fun buildAdRequest(opts: JSONObject): AdRequest {
    val builder = AdRequest.Builder()
    opts.optString("contentUrl", null)?.let {
        builder.setContentUrl(it)
    }
    val extras = Bundle().apply {
        opts.optString("npa", null)?.let { npa ->
            putString("npa", npa)
        }
    }
    return builder.addNetworkExtrasBundle(AdMobAdapter::class.java, extras).build()
}

fun configForTestLabIfNeeded(activity: Activity) {
    if (!isRunningInTestLab(activity)) {
        return
    }
    val config = MobileAds.getRequestConfiguration()
    val testDeviceIds = config.testDeviceIds
    val deviceId = computeDeviceID(activity)
    if (deviceId in testDeviceIds) {
        return
    }
    testDeviceIds.add(deviceId)
    val builder = config.toBuilder()
    builder.setTestDeviceIds(testDeviceIds)
    MobileAds.setRequestConfiguration(builder.build())
}

fun computeDeviceID(activity: Activity): String {
    // This will request test ads on the emulator and device by passing this hashed device ID.
    @SuppressLint("HardwareIds") val androidID = Settings.Secure.getString(
        activity.contentResolver, Settings.Secure.ANDROID_ID
    )
    return md5(androidID).uppercase(Locale.getDefault())
}

fun isRunningInTestLab(activity: Activity): Boolean {
    val testLabSetting =
        Settings.System.getString(activity.contentResolver, "firebase.test.lab")
    return "true" == testLabSetting
}

fun dpToPx(dp: Double): Double {
    return dp * Resources.getSystem().displayMetrics.density
}

fun pxToDp(px: Int): Int {
    val displayMetrics = Resources.getSystem().displayMetrics
    return (px / (displayMetrics.xdpi / DisplayMetrics.DENSITY_DEFAULT)).roundToInt()
}

fun jsonArray2stringList(a: JSONArray?): List<String> {
    val result: MutableList<String> = ArrayList()
    a?.let {
        for (i in 0 until it.length()) {
            it.optString(i)?.let { id ->
                result.add(id)
            }
        }
    }
    return result
}

fun md5(s: String): String {
    try {
        val digest = MessageDigest.getInstance("MD5")
        digest.update(s.toByteArray())
        val bigInt = BigInteger(1, digest.digest())
        return String.format("%32s", bigInt.toString(16)).replace(' ', '0')
    } catch (ignore: NoSuchAlgorithmException) {
    }
    return ""
}
