'use strict'

module.exports = {
  extends: ['concise'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['concise-typescript'],
    },
  ],
}
