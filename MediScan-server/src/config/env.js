const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function buildLegacyMongoUri() {
  const dbUser = process.env.DB_USER;
  const dbPass = process.env.DB_PASS;

  if (!dbUser || !dbPass) {
    return null;
  }

  return `mongodb+srv://${encodeURIComponent(dbUser)}:${encodeURIComponent(dbPass)}@cluster0.gf8ipgr.mongodb.net/mediScanDB?retryWrites=true&w=majority`;
}

const mongoUri = process.env.MONGO_URI || buildLegacyMongoUri();

if (!mongoUri) {
  throw new Error('Missing required environment variable: MONGO_URI or DB_USER/DB_PASS');
}

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  accessTokenSecret: requiredEnv('ACCESS_TOKEN_SECRET'),
  mongoUri,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  // Optional comma separated origins, defaults to * in development
  corsOrigins: (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean),
};

module.exports = config;
