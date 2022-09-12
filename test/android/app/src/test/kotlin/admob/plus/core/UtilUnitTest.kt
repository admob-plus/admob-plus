package admob.plus.core

import org.json.JSONArray
import kotlin.test.Test
import kotlin.test.assertContentEquals

class UtilUnitTest {
    @Test
    fun jsonArray2stringList() {
        assertContentEquals(arrayListOf(), jsonArray2stringList(null))
        assertContentEquals(arrayListOf(), jsonArray2stringList(JSONArray("[]")))
        assertContentEquals(
            arrayListOf("1", "2", "3"),
            jsonArray2stringList(JSONArray(listOf(1, 2, 3)))
        )
    }
}
