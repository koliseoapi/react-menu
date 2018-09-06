// Jest config
// See https://facebook.github.io/jest/docs/en/configuration.html
module.exports = {
  // load babel.config.js instead of .babelrc
  //transform: { '^.+\\.js?$': '<rootDir>/src/main/es6/test/jest-transform.js' },
  testMatch: ["<rootDir>/test/MenuTest.js"],
  notify: true,
  verbose: true
};
