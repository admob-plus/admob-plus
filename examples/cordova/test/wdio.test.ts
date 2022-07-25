/**
 * @jest-environment ./examples/cordova/test/wdio.env.ts
 */
// @ts-ignore
import type _ from './wdio.env';
import {describe, expect, it, test} from '@jest/globals';

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

    it('check contexts', async () => {
      const contexts = await browser?.getContexts();
      expect(contexts).toHaveLength(4);

      const wv = 'WEBVIEW_com.google.android.gms.example.bannerexample';
      expect(await browser?.getContext()).toBe(wv);
    }, 30_000);

    it('get title', async () => {
      let i = 0;
      while ((await browser?.getTitle()) !== 'Hello World' && i < 60) {
        await browser?.switchContext('NATIVE_APP');
        await browser?.switchContext('WEBVIEW');
        i += 1;
      }

      expect(await browser?.getTitle()).toBe('Hello World');
    }, 30_000);

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
