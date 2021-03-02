'use strict'

const { defaults } = require('jest-config')

module.exports = {
  transform: {
    ...defaults.transform,
    '^.+\\.tsx?$': 'ts-jest',
  },
  testPathIgnorePatterns: [
    ...defaults.testPathIgnorePatterns,
    '/examples/.*/plugins/',
    '/examples/ionic-angular/',
    '/examples/playground/',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  testURL: 'http://localhost/',
  moduleFileExtensions: ['ts', 'tsx', ...defaults.moduleFileExtensions],
}
