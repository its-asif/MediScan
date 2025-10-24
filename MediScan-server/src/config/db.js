const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const config = require('./env');

let client;

const uri = `mongodb+srv://${config.dbUser}:${config.dbPass}@cluster0.gf8ipgr.mongodb.net/?retryWrites=true&w=majority`;

function getClient() {
  if (!client) {
    client = new MongoClient(uri, {
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
  if (!cli.topology?.isConnected()) {
    await cli.connect();
  }
  return cli;
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
  getDb,
  collections,
  ObjectId,
};
