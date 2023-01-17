module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
};
