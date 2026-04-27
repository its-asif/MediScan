const jwt = require('jsonwebtoken');
const config = require('../config/env');
const { collections } = require('../config/db');

function verifyToken(req, res, next) {
  try {
    const auth = req.headers.authorization || '';
    if (!auth.startsWith('Bearer ')) {
      return res.status(401).send({ message: 'Unauthorized request' });
    }
    const token = auth.split(' ')[1];
    jwt.verify(token, config.accessTokenSecret, (err, decoded) => {
      if (err) return res.status(403).send({ message: 'Unauthorized request' });
      req.decoded = decoded;
      next();
    });
  } catch (e) {
    next(e);
  }
}

async function verifyAdmin(req, res, next) {
  try {
    const email = req.decoded?.email;
    if (!email) return res.status(403).send({ message: 'Unauthorized access' });
    const { userCollection } = collections();
    const user = await userCollection.findOne({ email });
    if (!user?.isAdmin) return res.status(403).send({ message: 'Unauthorized access' });
    next();
  } catch (e) {
    next(e);
  }
}

module.exports = { verifyToken, verifyAdmin };
