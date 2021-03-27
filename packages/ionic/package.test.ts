test('peerDependencies', () => {
  const pkg = require('./package.json')
  expect(pkg.peerDependencies['admob-plus-cordova']).toBe('^1.0.0')

  const pkgRef = require('@ionic-native/admob-plus//package.json')
  expect(pkg.peerDependencies).toMatchObject(pkgRef.peerDependencies)
})
