require('dotenv').config();

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'changeme-dev-only',
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  // Optional comma separated origins, defaults to * in development
  corsOrigins: (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean),
};

module.exports = config;
