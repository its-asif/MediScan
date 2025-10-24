const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const config = require('../config/env');

function buildCors() {
  if (config.nodeEnv === 'development' || config.corsOrigins.length === 0) {
    return cors(); // allow all in dev by default
  }
  return cors({
    origin: (origin, cb) => {
      if (!origin || config.corsOrigins.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
  });
}

function applySecurity(app) {
  app.use(helmet());
  app.use(buildCors());
  app.use(compression());
  app.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'MediScan');
    next();
  });
  // Generic JSON parser
  app.use(require('express').json());

  // Attach selective rate limiters to sensitive paths
  const sensitiveLimiter = rateLimit({ windowMs: 60 * 1000, max: 100 });
  app.use('/jwt', sensitiveLimiter);
  app.use('/create-payment-intent', sensitiveLimiter);
}

module.exports = { applySecurity };
