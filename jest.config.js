// https://github.com/thymikee/jest-preset-angular#brief-explanation-of-config
module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@assets/(.*)': '<rootDir>/src/assets/$1',
    '@core/(.*)': '<rootDir>/src/app/core/$1',
    '@env': '<rootDir>/src/environments/environment',
    '@src/(.*)': '<rootDir>/src/src/$1',
    '@state/(.*)': '<rootDir>/src/app/state/$1',
  },
  transform: {
    "^.+\.(ts|html)$": "<rootDir>/node_modules/jest-preset-angular/preprocessor.js",
    "^.+\.js$": "babel-jest"
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!ngx-cookie-service)'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/polyfills',
    '<rootDir>/src/setup-jest.ts'
  ]
  // transformIgnorePatterns: [
  //   'node_modules/(?!(jest-test))',
  //   '<rootDir>/node_modules/(?!ngx-cookie-service)'
  // ],
};
