import {expect, test} from '@jest/globals';
import pkg from '../package.json';

test('deps', async () => {
  const deps = Object.entries({
    ...pkg.dependencies,
    ...pkg.devDependencies,
  })
    .filter(
      ([k]) =>
        k.includes('angular') ||
        k.includes('@ionic/') ||
        ['npm', 'rxjs', 'ionic'].includes(k)
    )
    .reduce((acc, [k, v]) => ({...acc, [k]: v}), {});
  expect(deps).toMatchInlineSnapshot(`
    Object {
      "@angular/animations": "5.2.11",
      "@angular/common": "5.2.11",
      "@angular/compiler": "5.2.11",
      "@angular/compiler-cli": "5.2.11",
      "@angular/core": "5.2.11",
      "@angular/forms": "5.2.11",
      "@angular/platform-browser": "5.2.11",
      "@angular/platform-browser-dynamic": "5.2.11",
      "@ionic/app-scripts": "3.2.4",
      "@ionic/storage": "2.2.0",
      "ionic": "3.20.1",
      "ionic-angular": "3.9.10",
      "rxjs": "5.5.11",
    }
  `);
});
