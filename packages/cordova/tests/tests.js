/* eslint-env browser,jasmine */

exports.defineAutoTests = () => {
  describe('window.admob', () => {
    it('should exist', () => {
      expect(window.admob).toBeDefined()
    })
  })
}
