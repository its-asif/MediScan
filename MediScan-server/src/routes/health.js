const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('MediScan is running');
});

router.get('/healthz', (req, res) => {
  res.json({ status: 'ok' });
});

router.get('/readyz', (req, res) => {
  res.json({ status: 'ready' });
});

module.exports = router;
