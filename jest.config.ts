import {defaults} from 'jest-config';
import type {JestConfigWithTsJest} from 'ts-jest';
import {defaultsESM as tsDefaults} from 'ts-jest/presets';

export default async (): Promise<JestConfigWithTsJest> => ({
  preset: 'ts-jest/presets/default-esm',
  moduleNameMapper: {
    ...defaults.moduleNameMapper,
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    // @ts-expect-error wrong type
    ...defaults.transform,
    ...tsDefaults.transform,
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  testPathIgnorePatterns: [
    ...defaults.testPathIgnorePatterns,
    '<rootDir>/[.].*',
    '/examples/.*/platforms/',
    '/examples/.*/plugins/',
    '/examples/ionic-angular/',
    '/examples/ionic-angular-capacitor',
    '/examples/playground/',
  ].concat(
    process.env.WDIO_TEST ? [] : ['/examples/cordova/test/wdio.test.ts']
  ),
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    ...(tsDefaults.moduleFileExtensions ?? []),
    ...defaults.moduleFileExtensions,
  ],
});
