const express = require('express');
const { collections, ObjectId } = require('../config/db');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');

const router = express.Router();

// GET /tests
router.get('/tests', async (req, res, next) => {
  try {
    const { testCollection } = collections();
    const tests = await testCollection.find().toArray();
    res.send(tests);
  } catch (e) { next(e); }
});

// GET /tests/:id
router.get('/tests/:id', async (req, res, next) => {
  try {
    const { testCollection } = collections();
    const id = req.params.id;
    let test = await testCollection.findOne({ _id: id });
    if (!test) test = await testCollection.findOne({ _id: new ObjectId(id) });
    res.send(test);
  } catch (e) { next(e); }
});

// POST /tests (admin)
router.post('/tests', verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const { testCollection } = collections();
    const result = await testCollection.insertOne(req.body);
    res.json(result);
  } catch (e) { next(e); }
});

// DELETE /tests/:id (admin)
router.delete('/tests/:id', verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const { testCollection } = collections();
    const id = req.params.id;
    let query = { _id: new ObjectId(id) };
    let result = await testCollection.deleteOne(query);
    if (result.deletedCount === 0) {
      query = { _id: id };
      result = await testCollection.deleteOne(query);
    }
    res.send(result);
  } catch (e) { next(e); }
});

// PATCH /tests/:id (kept unauthenticated to avoid endpoint behavior change)
router.patch('/tests/:id', async (req, res, next) => {
  try {
    const { testCollection } = collections();
    const id = req.params.id;
    let filter = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: {
        name: req.body.name,
        price: req.body.price,
        slots: req.body.slots,
        details: req.body.details,
        image: req.body.image,
        date: req.body.date,
      },
    };
    let result = await testCollection.updateOne(filter, updateDoc);
    if (result.modifiedCount === 0) {
      filter = { _id: id };
      result = await testCollection.updateOne(filter, updateDoc);
    }
    res.send(result);
  } catch (e) { next(e); }
});

// PATCH /tests/slots/:id (kept unauthenticated)
router.patch('/tests/slots/:id', async (req, res, next) => {
  try {
    const { testCollection } = collections();
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const existingTest = await testCollection.findOne(filter);
    const slots = existingTest?.slots ?? 0;
    const updateDoc = { $set: { slots: slots - 1 } };
    const result = await testCollection.updateOne(filter, updateDoc);
    res.send(result);
  } catch (e) { next(e); }
});

module.exports = router;
