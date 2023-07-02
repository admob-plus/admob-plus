package admob.plus.core

import org.json.JSONObject
import kotlin.test.Test
import kotlin.test.assertEquals

internal class optFloatTest {
    @Test
    fun `return null for undefined key`() {
        assertEquals(optFloat(JSONObject("{}"), "key"), null)
    }

    @Test
    fun `return float`() {
        assertEquals(optFloat(JSONObject("{\"v\": 1}"), "v"), 1.0f)
    }
}
