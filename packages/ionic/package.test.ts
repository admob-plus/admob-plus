test('peerDependencies', () => {
  const pkg = require('./package.json')
  expect(pkg.peerDependencies['admob-plus-cordova']).toBe('^1.0.0')
})
