/**
 * @jest-environment ./examples/cordova/test/wdio.env.ts
 */
// @ts-ignore
import type _ from './wdio.env';
import {describe, expect, test} from '@jest/globals';

test('browser', () => {
  expect(browser).not.toBeUndefined();
});

if (typeof browser !== 'undefined') {
  describe('wdio', () => {
    it('status', async () => {
      expect(await browser?.status()).toMatchObject({
        build: {
          version: expect.anything(),
        },
      });
    });

    it('set title', async () => {
      expect(await browser?.getTitle()).toBe('Hello World');
    });

    it('click banner button', async () => {
      const btnShowBanner = await browser?.$('#show-banner-btn');
      await btnShowBanner.click();
    });

    it('click interstitial button', async () => {
      const btnShowInterstitial = await browser?.$('#show-interstitial-btn');
      await btnShowInterstitial.click();
    });
  });
}
