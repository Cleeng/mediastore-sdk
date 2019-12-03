module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.(d.ts|stories.js)',
    '!src/**/*Styled.js',
    '!src/**/index.js',
    '!src/serviceWorker.js',
    '!src/containers/labeling.js',
    '!src/test/testComponentHelper.js',
    '!src/i18NextInit.js'
  ],
  coverageDirectory: '<rootDir>/coverage',
  resolver: 'jest-pnp-resolver',
  setupFiles: ['react-app-polyfill/jsdom', '<rootDir>/src/setupTests.js'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}'
  ],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^.+\\.svg$': '<rootDir>/config/jest/svgTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json|svg)$)':
      '<rootDir>/config/jest/fileTransform.js'
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$'
  ],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js'
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
    'node'
  ],
  watchPlugins: [
    '<rootDir>/node_modules/jest-watch-typeahead/filename.js',
    '<rootDir>/node_modules/jest-watch-typeahead/testname.js'
  ],
  globals: {
    ENVIRONMENT_CONFIGURATION: {}
  }
};
