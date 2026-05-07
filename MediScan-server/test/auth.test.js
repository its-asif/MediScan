const request = require('supertest');

// Ensure env is set before loading the app
process.env.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'test-secret';
process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mediscan_test';

const app = require('../src/app');

describe('auth routes', () => {
  test('POST /jwt returns 400 when email missing', async () => {
    const res = await request(app).post('/jwt').send({});
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: 'Missing required field(s): email' });
  });

  test('POST /jwt returns a token when email provided', async () => {
    const res = await request(app).post('/jwt').send({ email: 'a@b.com' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  });
});
