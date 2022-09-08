package admob.plus.core

import android.content.res.Resources
import android.util.DisplayMetrics
import org.json.JSONArray
import kotlin.math.roundToInt

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
