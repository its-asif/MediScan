// Provide minimal env required by src/config/env.js and test determinism
process.env.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'test-secret';
process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mediscan_test';
process.env.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_123';

// Avoid noisy console.error during tests
const origConsoleError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    // keep errors visible but keep them concise in test output
    origConsoleError(...args);
  };
});
