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
      files: ['__tests__/**/*.ts'],
      rules: {
        '@typescript-eslint/no-var-requires': 'warn',
        'node/no-missing-require': 'warn',
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
    'unicorn/prefer-spread': 'warn',
  },
}
