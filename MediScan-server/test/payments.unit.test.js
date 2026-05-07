// mock db collections for helper tests (use simple string ids to avoid ObjectId constructor in tests)
const mockFakePayments = [
  { _id: 'pid1', testId: 'tid1', email: 'a@a.com' },
];

const mockPaymentCollection = {
  aggregate: jest.fn(() => ({ toArray: async () => mockFakePayments })),
  findOne: jest.fn(async (q) => mockFakePayments[0]),
  find: jest.fn(() => ({ toArray: async () => mockFakePayments })),
};

const mockUserCollection = {
  findOne: jest.fn(async (q) => ({ email: 'admin@x.com', isAdmin: true })),
};

jest.mock('../src/config/db', () => {
  function ObjectId(v) { return v; }
  ObjectId.isValid = (v) => !!v;
  ObjectId.toString = (v) => String(v);

  return {
    collections: () => ({ paymentCollection: mockPaymentCollection, userCollection: mockUserCollection }),
    ObjectId,
  };
});

const paymentsRouter = require('../src/routes/payments');
const helpers = paymentsRouter._test;

describe('payments helpers', () => {
  test('buildPaymentTestLookupPipeline returns pipeline array with match when provided', () => {
    const pipeline = helpers.buildPaymentTestLookupPipeline({ email: 'a@a.com' });
    expect(Array.isArray(pipeline)).toBe(true);
    // first stage should be $match
    expect(pipeline[0]).toHaveProperty('$match');
  });

  test('getPaymentsWithTests calls aggregate and returns array', async () => {
    const res = await helpers.getPaymentsWithTests({});
    expect(Array.isArray(res)).toBe(true);
    expect(res[0]).toHaveProperty('email');
  });

  test('isAdminEmail returns true for mocked admin', async () => {
    const isAdmin = await helpers.isAdminEmail('admin@x.com');
    expect(isAdmin).toBe(true);
  });

  test('findPaymentOwnerEmail returns owner email for payment id', async () => {
    const owner = await helpers.findPaymentOwnerEmail(String(mockFakePayments[0]._id));
    expect(owner).toBe(mockFakePayments[0].email);
  });
});

describe('verifySelfOrAdmin and verifyPaymentOwnerOrAdmin middleware', () => {
  test('verifySelfOrAdmin allows when requester equals target', async () => {
    const req = { decoded: { email: 'a@a.com' }, params: { email: 'a@a.com' } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();
    await helpers.verifySelfOrAdmin(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('verifyPaymentOwnerOrAdmin allows when requester is owner', async () => {
    const paymentId = String(mockFakePayments[0]._id);
    const req = { decoded: { email: mockFakePayments[0].email }, params: { id: paymentId } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();
    await helpers.verifyPaymentOwnerOrAdmin(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
