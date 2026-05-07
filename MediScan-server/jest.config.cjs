module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: [
    'src/middlewares/*.js',
    'src/routes/auth.js',
    'src/routes/payments.js',
    'src/middlewares/validate.js',
    'src/middlewares/auth.js'
  ],
  coverageDirectory: 'coverage',
};
