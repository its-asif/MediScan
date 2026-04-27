const express = require('express');
const { collections } = require('../config/db');

const router = express.Router();

// GET /suggestions
router.get('/suggestions', async (req, res, next) => {
  try {
    const { suggestionCollection } = collections();
    const suggestions = await suggestionCollection.find().toArray();
    res.send(suggestions);
  } catch (e) { next(e); }
});

module.exports = router;
