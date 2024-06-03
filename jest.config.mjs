export default {
  setupFilesAfterEnv: ['<rootDir>/config/setupTests.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss)$': '<rootDir>/config/styleMock.js',
  },
  testEnvironment: 'jest-environment-jsdom',
};
