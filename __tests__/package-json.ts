/// <reference types="@types/jest" />

test('@admob-plus/ionic peerDependencies', () => {
  const pkg = require('../packages/ionic/package.json');
  const pkgRef = require('@ionic-native/admob-plus//package.json');
  expect(pkg.peerDependencies).toMatchObject({
    'admob-plus-cordova': '^1.0.0',
  });
});

test('@admob-plus/react-native peerDependencies', () => {
  const pkg = require('../packages/react-native/package.json');
  expect(pkg.peerDependencies).toEqual({
    react: '>=16.8.1',
    'react-native': '>=0.60.0-rc.0 <1.0.x',
  });
});

test('ionic example dependencies', () => {
  const pkg = require('../examples/ionic-angular/package.json');
  const deps = Object.entries({
    ...pkg.dependencies,
    ...pkg.devDependencies,
  })
    .filter(([k]) => k.includes('angular') || ['typescript'].includes(k))
    .reduce((acc, [k, v]) => ({...acc, [k]: v}), {});
  expect(deps).toMatchInlineSnapshot(`
    Object {
      "@angular-devkit/build-angular": "12.2.0",
      "@angular/cli": "12.2.0",
      "@angular/common": "12.2.0",
      "@angular/compiler": "12.2.0",
      "@angular/compiler-cli": "12.2.0",
      "@angular/core": "12.2.0",
      "@angular/forms": "12.2.0",
      "@angular/language-service": "12.2.0",
      "@angular/platform-browser": "12.2.0",
      "@angular/platform-browser-dynamic": "12.2.0",
      "@angular/router": "12.2.0",
      "@ionic/angular": "^5.8.1",
      "@ionic/angular-toolkit": "^4.0.0",
      "typescript": "~4.3.5",
    }
  `);
});
