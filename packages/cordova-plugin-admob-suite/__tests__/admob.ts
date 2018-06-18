import admob from '../src/admob'

test('export admob', () => {
  expect(admob).toMatchObject(expect.any(Object))
})
