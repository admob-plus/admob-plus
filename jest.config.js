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
    '<rootDir>/packages/cli/',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  testURL: 'http://localhost/',
  moduleFileExtensions: ['ts', 'tsx', ...defaults.moduleFileExtensions],
}
