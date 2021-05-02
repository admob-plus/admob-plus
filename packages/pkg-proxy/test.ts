import findPkg from './src'

test('pkg-proxy', async () => {
  const pkg = await findPkg()
  expect(pkg?.name).toBe('admob-plus-monorepo')

  const json = JSON.stringify(pkg)
  expect(json).toBe(JSON.stringify(pkg?.json))

  Object.assign(pkg, { newprop: 'newprop' })
  expect(JSON.stringify(pkg)).not.toBe(json)
})
