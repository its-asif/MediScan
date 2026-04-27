const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/env');
const { requireFields } = require('../middlewares/validate');

const router = express.Router();

// Issue JWT (kept same behavior)
router.post('/jwt', requireFields(['email']), async (req, res) => {
  const { email, uid } = req.body || {};

  if (!email) {
    return res.status(400).send({ message: 'email is required' });
  }

  const token = jwt.sign({ email, uid }, config.accessTokenSecret, { expiresIn: '6h' });
  res.send({ token });
});

module.exports = router;
