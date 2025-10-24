const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/env');

const router = express.Router();

// Issue JWT (kept same behavior)
router.post('/jwt', async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, config.accessTokenSecret, { expiresIn: '6h' });
  res.send({ token });
});

module.exports = router;
