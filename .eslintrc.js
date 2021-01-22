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
  ],
  rules: {
    'function-paren-newline': 'off',
  },
}
