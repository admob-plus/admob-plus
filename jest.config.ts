import type {Config} from '@jest/types';
import {defaults} from 'jest-config';

export default async (): Promise<Config.InitialOptions> => ({
  transform: {
    // @ts-expect-error wrong type
    ...defaults.transform,
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
  moduleFileExtensions: ['ts', 'tsx', ...defaults.moduleFileExtensions],
});
