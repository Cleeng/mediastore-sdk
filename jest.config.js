const config = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}'],
  testPathIgnorePatterns: ['<rootDir>/(build|config|node_modules|dist)/'],
  moduleNameMapper: {
    "\\.(scss|sass|css)$": "identity-obj-proxy"
  }
};

module.exports = config;
