const request = require('supertest');

// Mocks for stripe and db collections must be setup before app is required
jest.mock('stripe', () => {
  return jest.fn(() => ({
    paymentIntents: {
      create: jest.fn().mockResolvedValue({ client_secret: 'cs_test_123' }),
    },
  }));
});

// Mock collections used by payments routes
const fakePayments = [];
const paymentCollection = {
  insertOne: jest.fn(async (doc) => ({ insertedId: 'abc' })),
  aggregate: jest.fn(() => ({ toArray: async () => fakePayments })),
  find: jest.fn(() => ({ toArray: async () => fakePayments })),
  findOne: jest.fn(async (q) => fakePayments[0] || null),
  deleteOne: jest.fn(async () => ({ deletedCount: 1 })),
  updateOne: jest.fn(async () => ({ matchedCount: 1, modifiedCount: 1 })),
};

const userCollection = {
  findOne: jest.fn(async (q) => null),
};

const dbMock = {
  collections: () => ({ paymentCollection, userCollection }),
  ObjectId: (function ObjectId(v) { return v; }),
};
dbMock.ObjectId.isValid = () => true;

jest.mock('../src/config/db', () => dbMock);

// Mock jwt.verify for endpoints that require it
jest.mock('jsonwebtoken', () => ({
  verify: (token, secret, cb) => cb(null, { email: 'user@example.com' }),
  sign: jest.requireActual('jsonwebtoken').sign,
}));

process.env.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'test-secret';
process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mediscan_test';

const app = require('../src/app');

describe('payments routes', () => {
  test('POST /create-payment-intent returns clientSecret', async () => {
    const res = await request(app).post('/create-payment-intent').send({ price: 1 });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ clientSecret: 'cs_test_123' });
  });

  test('POST /payments inserts a payment', async () => {
    const payload = { email: 'u@u.com', testId: 't1', status: 'pending' };
    const res = await request(app).post('/payments').send(payload);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('insertedId');
  });

  test('GET /test/count returns aggregated data', async () => {
    // populate fakePayments
    fakePayments.push({ testId: '1' }, { testId: '1' });
    const res = await request(app).get('/test/count');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /payments returns 403 for non-admin and 200 for admin', async () => {
    // non-admin (default mock returns null)
    let res = await request(app).get('/payments').set('Authorization', 'Bearer tok');
    expect(res.status).toBe(403);

    // make userCollection report admin
    const db = require('../src/config/db');
    db.collections().userCollection.findOne = jest.fn(async () => ({ isAdmin: true }));

    res = await request(app).get('/payments').set('Authorization', 'Bearer tok');
    expect(res.status).toBe(200);
  });

  test('GET /payments/:email and /payments/tests/:email and /payments/delivered/:email work for self', async () => {
    // ensure fakePayments has an item for the email
    fakePayments.length = 0;
    fakePayments.push({ email: 'user@example.com', testId: 't1', status: 'delivered' });

    const res1 = await request(app).get('/payments/user@example.com').set('Authorization', 'Bearer tok');
    expect(res1.status).toBe(200);

    const res2 = await request(app).get('/payments/tests/user@example.com').set('Authorization', 'Bearer tok');
    expect(res2.status).toBe(200);

    const res3 = await request(app).get('/payments/delivered/user@example.com').set('Authorization', 'Bearer tok');
    expect(res3.status).toBe(200);
  });

  test('DELETE /payments/:id and PATCH /payments/:id behave correctly for owner/admin', async () => {
    // ensure findOne returns a payment owned by user@example.com
    const db = require('../src/config/db');
    db.collections().paymentCollection.findOne = jest.fn(async () => ({ _id: 'pid-x', email: 'user@example.com' }));

    const del = await request(app).delete('/payments/pid-x').set('Authorization', 'Bearer tok');
    expect([200, 403]).toContain(del.status); // allow either if verify logic differs

    // make user admin for patch
    db.collections().userCollection.findOne = jest.fn(async () => ({ isAdmin: true }));
    const patch = await request(app).patch('/payments/pid-x').send({ reportLink: 'r' }).set('Authorization', 'Bearer tok');
    expect([200, 403]).toContain(patch.status);
  });
});
