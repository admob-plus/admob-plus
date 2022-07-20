module.exports = {
  // eslint-disable-next-line node/no-unpublished-require
  extends: [require.resolve('gts/.eslintrc.json')],
  overrides: [
    {
      files: ['__tests__/**/*.ts'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  rules: {
    'max-classes-per-file': 'off',
    'node/no-extraneous-import': 'warn',
    'node/no-extraneous-require': 'warn',
    'node/no-unpublished-import': 'warn',
    'node/no-unpublished-require': 'warn',
    'node/no-unsupported-features/es-syntax': 'off',
  },
};
