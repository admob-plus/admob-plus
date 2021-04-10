import Table from 'cli-table3'
import _ from 'lodash'
import { testAppIds, testAdUnitIds } from '../test-ids'

export const command = 'test-ids'

export const desc = 'Print test IDs'

export const handler = async () => {
  const tableAppIds = new Table({
    head: ['App ID (Android)', 'App ID (iOS)'],
  })
  tableAppIds.push([testAppIds.android, testAppIds.ios])
  console.log(tableAppIds.toString())

  const tableAdUnitIds = new Table({
    head: ['Ad Format', 'Ad Unit ID (Android)', 'Ad Unit ID (iOS)'],
  })
  tableAdUnitIds.push(
    ...Object.entries(testAdUnitIds).map(([k, v]) => [k, v.android, v.ios]),
  )
  console.log(tableAdUnitIds.toString())
}
