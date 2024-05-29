module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'prettier/react',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    document: true,
    ENVIRONMENT_CONFIGURATION: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, endOfLine: 'auto' }],
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.ts', '.tsx', '.js', '.jsx'] }
    ],
    'import/no-cycle': 'off', // TODO: remove after clean localstorage
    'react/forbid-prop-types': 'off', // TODO: remove after moving to redux
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false
      }
    ],
    'no-use-before-define': 'off',
    'react/require-default-props': 'off'
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        moduleDirectory: ['node_modules', 'src/'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
};
