/// <reference types="@types/mocha" />
import { expect, test } from '@oclif/test'

describe('info', () => {
  test
    .stdout()
    .command(['info'])
    .it('runs info', (ctx) => {
      expect(ctx.stdout).to.contain('cordova')
    })
})
