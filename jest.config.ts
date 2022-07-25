import {defaults} from 'jest-config';
import type {InitialOptionsTsJest} from 'ts-jest';
import {defaultsESM as tsDefaults} from 'ts-jest/presets';

export default async (): Promise<InitialOptionsTsJest> => ({
  preset: 'ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    // @ts-expect-error wrong type
    ...defaults.transform,
    ...tsDefaults.transform,
    '^.+\\.tsx?$': 'ts-jest',
  },
  testPathIgnorePatterns: [
    ...defaults.testPathIgnorePatterns,
    '/examples/.*/platforms/',
    '/examples/.*/plugins/',
    '/examples/ionic-angular/',
    '/examples/ionic-angular-capacitor',
    '/examples/playground/',
  ],
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
