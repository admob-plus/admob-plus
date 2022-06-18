/**
 * @jest-environment jsdom
 */
/// <reference types="jest" />

test('export admob', async () => {
  const admob = await import('..');
  expect(admob.default).not.toBeUndefined();
  expect(admob).toMatchObject({
    default: expect.any(Function),
    BannerAd: expect.any(Function),
  });
});
