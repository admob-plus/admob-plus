test('@admob-plus/ionic peerDependencies', () => {
  const pkg = require('../packages/ionic/package.json')
  const pkgRef = require('@ionic-native/admob-plus//package.json')
  expect(pkg.peerDependencies).toMatchObject({
    ...pkgRef.peerDependencies,
    'admob-plus-cordova': '^1.0.0',
  })
})

test('@admob-plus/react-native peerDependencies', () => {
  const pkg = require('../packages/react-native/package.json')
  expect(pkg.peerDependencies).toEqual({
    react: '>=16.8.1',
    'react-native': '>=0.60.0-rc.0 <1.0.x',
  })
})

test('ionic example dependencies', () => {
  const pkg = require('../examples/ionic-angular/package.json')
  expect(pkg.devDependencies).toMatchObject({
    typescript: '~4.1.5',
  })
})
