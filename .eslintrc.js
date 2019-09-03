module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'prettier/prettier': ['error', { 'singleQuote': true }],
    'react/jsx-filename-extension': ['error', { 'extensions': ['.js', '.jsx'] }]
  },
  globals: {
    jest: true,
    document: true,
    it: true,
    ENVIRONMENT_CONFIGURATION: true,
  }

};
