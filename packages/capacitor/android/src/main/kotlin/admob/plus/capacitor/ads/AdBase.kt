package admob.plus.capacitor.ads

import admob.plus.capacitor.ExecuteContext
import admob.plus.core.Ad
import admob.plus.core.Helper

open class AdBase(ctx: ExecuteContext?) : Ad(ctx!!) {
    override val adapter: Helper.Adapter
        get() = ExecuteContext.Companion.plugin!!
}
