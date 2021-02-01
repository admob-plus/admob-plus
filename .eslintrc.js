'use strict'

module.exports = {
  extends: ['concise'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['concise-typescript'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
    {
      files: ['packages/cordova/src/browser/AdMobProxy.js'],
      rules: {
        strict: 'off',
      },
    },
  ],
  rules: {
    'function-paren-newline': 'off',
  },
}
