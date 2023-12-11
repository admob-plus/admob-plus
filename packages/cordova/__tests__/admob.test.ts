// @vitest-environment jsdom
import {expect, test} from 'vitest';

test('export admob', async () => {
  const admob = await import('..');
  expect(admob).toMatchObject({
    default: expect.any(Function),
    BannerAd: expect.any(Function),
  });
});
