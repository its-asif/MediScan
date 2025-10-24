const express = require('express');
const config = require('../config/env');
const stripe = require('stripe')(config.stripeSecretKey);
const { collections, ObjectId } = require('../config/db');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

// POST /create-payment-intent
router.post('/create-payment-intent', async (req, res, next) => {
  try {
    const { price } = req.body;
    const amount = parseInt(price * 100);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (e) { next(e); }
});

// POST /payments
router.post('/payments', async (req, res, next) => {
  try {
    const { paymentCollection } = collections();
    const result = await paymentCollection.insertOne(req.body);
    res.json(result);
  } catch (e) { next(e); }
});

// GET /payments
router.get('/payments', async (req, res, next) => {
  try {
    const { paymentCollection, testCollection } = collections();
    const payments = await paymentCollection.find().toArray();

    const testIds = payments.map((p) => p.testId);
    const tests = [];
    for (const id of testIds) {
      let test = await testCollection.findOne({ _id: new ObjectId(id) });
      if (!test) test = await testCollection.findOne({ _id: id });
      tests.push(test);
    }

    const combinedData = payments.map((payment, i) => ({
      testName: tests[i]?.name,
      testDate: tests[i]?.date,
      ...payment,
    }));
    res.send(combinedData);
  } catch (e) { next(e); }
});

// GET /payments/delivered/:email
router.get('/payments/delivered/:email', async (req, res, next) => {
  try {
    const { paymentCollection } = collections();
    const payments = await paymentCollection.find({ email: req.params.email, status: 'delivered' }).toArray();
    res.send(payments);
  } catch (e) { next(e); }
});

// GET /payments/:email
router.get('/payments/:email', async (req, res, next) => {
  try {
    const { paymentCollection, testCollection } = collections();
    const payments = await paymentCollection.find({ email: req.params.email }).toArray();
    const testIds = payments.map((p) => p.testId);
    const tests = [];
    for (const id of testIds) {
      const test = await testCollection.findOne({ _id: new ObjectId(id) });
      tests.push(test);
    }
    const combinedData = payments.map((payment, i) => ({
      testName: tests[i]?.name,
      testDate: tests[i]?.date,
      ...payment,
    }));
    res.send(combinedData);
  } catch (e) { next(e); }
});

// GET /payments/tests/:email
router.get('/payments/tests/:email', async (req, res, next) => {
  try {
    const { paymentCollection } = collections();
    const payments = await paymentCollection.find({ email: req.params.email }).toArray();
    const testIds = payments.map((p) => p.testId);
    res.send(testIds);
  } catch (e) { next(e); }
});

// GET /payments/test/:id
router.get('/payments/test/:id', async (req, res, next) => {
  try {
    const { paymentCollection } = collections();
    const payments = await paymentCollection.find({ testId: req.params.id }).toArray();
    res.send(payments);
  } catch (e) { next(e); }
});

// GET /test/count
router.get('/test/count', async (req, res, next) => {
  try {
    const { paymentCollection, testCollection } = collections();
    const payments = await paymentCollection.find().toArray();
    const testIds = payments.map((p) => p.testId);
    const testIdsCount = {};
    testIds.forEach((id) => { testIdsCount[id] = (testIdsCount[id] || 0) + 1; });
    const uniqueTestIds = [...new Set(testIds)];
    const tests = await testCollection
      .find({ _id: { $in: uniqueTestIds.map((id) => new ObjectId(id)) } })
      .toArray();
    const combinedData = tests.map((test) => ({
      ...test,
      count: testIdsCount[test._id.toString()] || 0,
    }));
    res.send(combinedData);
  } catch (error) {
    next(error);
  }
});

// DELETE /payments/:id (JWT)
router.delete('/payments/:id', verifyToken, async (req, res, next) => {
  try {
    const { paymentCollection } = collections();
    const result = await paymentCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.send(result);
  } catch (e) { next(e); }
});

// PATCH /payments/:id (JWT)
router.patch('/payments/:id', verifyToken, async (req, res, next) => {
  try {
    const { paymentCollection } = collections();
    const filter = { _id: new ObjectId(req.params.id) };
    const updateDoc = { $set: { status: 'delivered', reportLink: req.body.reportLink } };
    const result = await paymentCollection.updateOne(filter, updateDoc);
    res.send(result);
  } catch (e) { next(e); }
});

module.exports = router;
