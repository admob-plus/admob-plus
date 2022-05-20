/**
 * @jest-environment jsdom
 */
import {expect} from '@jest/globals';
import '../src/www/cordova.d.ts';

test.skip('export admob', async () => {
  const {default: admob} = await import('../src/www/admob');
  expect(admob).toMatchObject(expect.any(Object));
});
