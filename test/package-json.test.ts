import {expect, test} from 'vitest'

test('@admob-plus/ionic peerDependencies', () => {
  const pkg = require('../packages/ionic/package.json');
  expect(pkg.peerDependencies).toMatchObject({
    'admob-plus-cordova': '>=1.0.0',
  });
});

test('@admob-plus/react-native peerDependencies', () => {
  const pkg = require('../packages/react-native/package.json');
  expect(pkg.peerDependencies).toEqual({
    react: '>=16.8.1',
    'react-native': '>=0.60.0-rc.0 <1.0.x',
  });
});
