const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const config = require('./env');

let client;

function getClient() {
  if (!client) {
    client = new MongoClient(config.mongoUri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }
  return client;
}

async function connectDB() {
  const cli = getClient();
  await cli.connect();
  return cli;
}

async function closeDB() {
  if (client) {
    await client.close();
    client = undefined;
  }
}

function getDb() {
  return getClient().db('mediScanDB');
}

function collections() {
  const db = getDb();
  return {
    testCollection: db.collection('tests'),
    userCollection: db.collection('users'),
    bannerCollection: db.collection('banners'),
    paymentCollection: db.collection('payments'),
    suggestionCollection: db.collection('suggestions'),
  };
}

module.exports = {
  connectDB,
  closeDB,
  getDb,
  collections,
  ObjectId,
};
