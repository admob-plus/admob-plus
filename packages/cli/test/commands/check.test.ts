import { expect, test } from '@oclif/test'

describe('check', () => {
  test
    .stdout()
    .command(['check'])
    .it('runs check', ctx => {
      expect(ctx.stdout).to.contain('ok')
    })
})
