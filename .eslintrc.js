module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'eslint-disable-next-line': 'off',
    'no-return-assign': 'off',
    'no-param-reassign': 'off',
    'no-unused-expressions': 'off',
    'array-callback-return': 'off',
    // 'consistent-return': 'off',
    // 'no-restricted-syntax': 'off',
    // 'guard-for-in': 'off',
  },
};
