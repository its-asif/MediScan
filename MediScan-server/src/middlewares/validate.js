const { ObjectId } = require('../config/db');

function reject(res, status, message) {
  return res.status(status).send({ message });
}

function requireFields(fields) {
  return (req, res, next) => {
    const missing = fields.filter((field) => typeof req.body?.[field] === 'undefined' || req.body[field] === null || req.body[field] === '');
    if (missing.length > 0) {
      return reject(res, 400, `Missing required field(s): ${missing.join(', ')}`);
    }
    return next();
  };
}

function validateObjectIdParam(paramName) {
  return (req, res, next) => {
    const value = req.params?.[paramName];
    if (!value || !ObjectId.isValid(value)) {
      return reject(res, 400, `Invalid ${paramName}`);
    }
    return next();
  };
}

function validateEmailParam(paramName) {
  return (req, res, next) => {
    const value = req.params?.[paramName];
    if (!value || typeof value !== 'string' || !value.includes('@')) {
      return reject(res, 400, `Invalid ${paramName}`);
    }
    return next();
  };
}

module.exports = {
  requireFields,
  validateObjectIdParam,
  validateEmailParam,
};
