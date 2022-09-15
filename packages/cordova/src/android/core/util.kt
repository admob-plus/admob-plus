package admob.plus.core

import android.annotation.SuppressLint
import android.app.Activity
import android.content.res.Resources
import android.provider.Settings
import android.util.DisplayMetrics
import com.google.android.gms.ads.MobileAds
import com.google.android.gms.ads.RequestConfiguration
import org.json.JSONArray
import java.math.BigInteger
import java.security.MessageDigest
import java.security.NoSuchAlgorithmException
import java.util.Locale
import kotlin.math.roundToInt

fun configForTestLab(activity: Activity) {
    if (!isRunningInTestLab(activity)) {
        return
    }
    val config: RequestConfiguration = MobileAds.getRequestConfiguration()
    val testDeviceIds: MutableList<String> = config.testDeviceIds
    val deviceId = computeDeviceID(activity)
    if (testDeviceIds.contains(deviceId)) {
        return
    }
    testDeviceIds.add(deviceId)
    val builder: RequestConfiguration.Builder = config.toBuilder()
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
