import {configDefaults, defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    exclude: [
      ...configDefaults.exclude,
      '.*/**',
      './examples/.*/platforms/**',
      './examples/.*/plugins/**',
      './examples/ionic-angular/**',
      './examples/ionic-angular-capacitor/**',
      './examples/playground/**',
    ],
  },
});
