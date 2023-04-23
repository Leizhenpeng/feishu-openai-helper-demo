/**
 * @type {import('eslint-define-config').EslintConfig}
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:prettier/recommended'],
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    // ts will check these rule
    'no-undef': 'off',
    'no-unused-vars': 'off',
    // replace 'no-redeclare' with @typescript-eslint
    'no-redeclare': 'off',
    '@typescript-eslint/space-before-blocks': ['off'],
    '@typescript-eslint/no-redeclare': ['error'],
    // note you must disable the base rule as it can report incorrect errors
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
  },
}
