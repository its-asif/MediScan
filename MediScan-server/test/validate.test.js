const { requireFields, validateEmailParam, validateObjectIdParam } = require('../src/middlewares/validate');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}

describe('validate middleware', () => {
  test('requireFields rejects when missing fields', () => {
    const mw = requireFields(['name', 'email']);
    const req = { body: { name: 'a' } };
    const res = mockRes();
    const next = jest.fn();

    mw(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ message: expect.stringContaining('Missing required') }));
    expect(next).not.toHaveBeenCalled();
  });

  test('validateEmailParam rejects invalid email param', () => {
    const mw = validateEmailParam('email');
    const req = { params: { email: 'not-an-email' } };
    const res = mockRes();
    const next = jest.fn();

    mw(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: 'Invalid email' });
  });

  test('validateObjectIdParam rejects invalid id', () => {
    // Mock ObjectId.isValid via requiring module's db helper
    jest.mock('../src/config/db', () => ({ ObjectId: { isValid: () => false } }));
    // re-require the module under test to pick up the mock
    const { validateObjectIdParam: validateObjectIdParamMocked } = require('../src/middlewares/validate');

    const mw = validateObjectIdParamMocked('id');
    const req = { params: { id: 'invalid' } };
    const res = mockRes();
    const next = jest.fn();

    mw(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: 'Invalid id' });
  });
});
