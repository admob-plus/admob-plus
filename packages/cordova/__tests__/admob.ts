/**
 * @jest-environment jsdom
 */
import {expect, test} from '@jest/globals';

test('export admob', async () => {
  const admob = await import('..');
  expect(admob.default).not.toBeUndefined();
  expect(admob).toMatchObject({
    default: expect.any(Function),
    BannerAd: expect.any(Function),
  });
});
