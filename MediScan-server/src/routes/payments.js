const express = require('express');
const config = require('../config/env');
const stripe = require('stripe')(config.stripeSecretKey);
const { collections, ObjectId } = require('../config/db');
const { verifyToken } = require('../middlewares/auth');
const { requireFields, validateEmailParam, validateObjectIdParam } = require('../middlewares/validate');

const router = express.Router();

async function isAdminEmail(email) {
  const { userCollection } = collections();
  const user = await userCollection.findOne({ email });
  return !!user?.isAdmin;
}

async function findPaymentOwnerEmail(paymentId) {
  const { paymentCollection } = collections();
  const payment = await paymentCollection.findOne({ _id: new ObjectId(paymentId) });
  return payment?.email;
}

async function verifySelfOrAdmin(req, res, next) {
  try {
    const requesterEmail = req.decoded?.email;
    const targetEmail = req.params.email;

    if (!requesterEmail || !targetEmail) {
      return res.status(403).send({ message: 'Unauthorized access' });
    }

    if (requesterEmail === targetEmail || await isAdminEmail(requesterEmail)) {
      return next();
    }

    return res.status(403).send({ message: 'Unauthorized access' });
  } catch (e) {
    return next(e);
  }
}

async function verifyPaymentOwnerOrAdmin(req, res, next) {
  try {
    const requesterEmail = req.decoded?.email;
    const paymentOwnerEmail = await findPaymentOwnerEmail(req.params.id);

    if (!requesterEmail || !paymentOwnerEmail) {
      return res.status(403).send({ message: 'Unauthorized access' });
    }

    if (requesterEmail === paymentOwnerEmail || await isAdminEmail(requesterEmail)) {
      return next();
    }

    return res.status(403).send({ message: 'Unauthorized access' });
  } catch (e) {
    return next(e);
  }
}

function buildPaymentTestLookupPipeline(matchStage = {}) {
  const pipeline = [];

  if (Object.keys(matchStage).length > 0) {
    pipeline.push({ $match: matchStage });
  }

  pipeline.push(
    {
      $addFields: {
        testIdString: { $toString: '$testId' },
      },
    },
    {
      $lookup: {
        from: 'tests',
        let: {
          testIdValue: '$testId',
          testIdString: '$testIdString',
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $or: [
                  { $eq: ['$_id', '$$testIdValue'] },
                  { $eq: [{ $toString: '$_id' }, '$$testIdString'] },
                ],
              },
            },
          },
          {
            $project: {
              name: 1,
              date: 1,
            },
          },
        ],
        as: 'testInfo',
      },
    },
    {
      $addFields: {
        testInfo: { $arrayElemAt: ['$testInfo', 0] },
      },
    },
    {
      $project: {
        testIdString: 0,
      },
    }
  );

  return pipeline;
}

async function getPaymentsWithTests(matchStage = {}) {
  const { paymentCollection } = collections();
  return paymentCollection.aggregate(buildPaymentTestLookupPipeline(matchStage)).toArray();
}

// POST /create-payment-intent
router.post('/create-payment-intent', requireFields(['price']), async (req, res, next) => {
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
router.post('/payments', requireFields(['email', 'testId', 'status']), async (req, res, next) => {
  try {
    const { paymentCollection } = collections();
    const result = await paymentCollection.insertOne(req.body);
    res.json(result);
  } catch (e) { next(e); }
});

// GET /payments (admin)
router.get('/payments', verifyToken, async (req, res, next) => {
  try {
    if (!(await isAdminEmail(req.decoded?.email))) {
      return res.status(403).send({ message: 'Unauthorized access' });
    }

    const combinedData = await getPaymentsWithTests();
    res.send(combinedData);
  } catch (e) { next(e); }
});

// GET /payments/delivered/:email (self or admin)
router.get('/payments/delivered/:email', validateEmailParam('email'), verifyToken, verifySelfOrAdmin, async (req, res, next) => {
  try {
    const { paymentCollection } = collections();
    const payments = await paymentCollection.find({ email: req.params.email, status: 'delivered' }).toArray();
    res.send(payments);
  } catch (e) { next(e); }
});

// GET /payments/:email (self or admin)
router.get('/payments/:email', validateEmailParam('email'), verifyToken, verifySelfOrAdmin, async (req, res, next) => {
  try {
    const combinedData = await getPaymentsWithTests({ email: req.params.email });
    res.send(combinedData);
  } catch (e) { next(e); }
});

// GET /payments/tests/:email (self or admin)
router.get('/payments/tests/:email', validateEmailParam('email'), verifyToken, verifySelfOrAdmin, async (req, res, next) => {
  try {
    const { paymentCollection } = collections();
    const payments = await paymentCollection.find({ email: req.params.email }).toArray();
    const testIds = payments.map((p) => p.testId);
    res.send(testIds);
  } catch (e) { next(e); }
});

// GET /payments/test/:id (admin)
router.get('/payments/test/:id', validateObjectIdParam('id'), verifyToken, async (req, res, next) => {
  try {
    if (!(await isAdminEmail(req.decoded?.email))) {
      return res.status(403).send({ message: 'Unauthorized access' });
    }

    const { paymentCollection } = collections();
    const payments = await paymentCollection.find({ testId: req.params.id }).toArray();
    res.send(payments);
  } catch (e) { next(e); }
});

// GET /test/count
router.get('/test/count', async (req, res, next) => {
  try {
    const { paymentCollection } = collections();
    const combinedData = await paymentCollection.aggregate([
      {
        $addFields: {
          testIdString: { $toString: '$testId' },
        },
      },
      {
        $group: {
          _id: '$testIdString',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'tests',
          let: { testIdString: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    { $eq: [{ $toString: '$_id' }, '$$testIdString'] },
                    { $eq: ['$_id', '$$testIdString'] },
                  ],
                },
              },
            },
          ],
          as: 'test',
        },
      },
      {
        $addFields: {
          test: { $arrayElemAt: ['$test', 0] },
        },
      },
      {
        $project: {
          _id: 0,
          count: 1,
          testIdString: '$_id',
          test: 1,
        },
      },
    ]).toArray();
    res.send(combinedData);
  } catch (error) {
    next(error);
  }
});

// DELETE /payments/:id (owner or admin)
router.delete('/payments/:id', validateObjectIdParam('id'), verifyToken, verifyPaymentOwnerOrAdmin, async (req, res, next) => {
  try {
    const { paymentCollection } = collections();
    const result = await paymentCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.send(result);
  } catch (e) { next(e); }
});

// PATCH /payments/:id (admin)
router.patch('/payments/:id', validateObjectIdParam('id'), verifyToken, async (req, res, next) => {
  try {
    if (!(await isAdminEmail(req.decoded?.email))) {
      return res.status(403).send({ message: 'Unauthorized access' });
    }

    const { paymentCollection } = collections();
    const filter = { _id: new ObjectId(req.params.id) };
    const updateDoc = { $set: { status: 'delivered', reportLink: req.body.reportLink } };
    const result = await paymentCollection.updateOne(filter, updateDoc);
    res.send(result);
  } catch (e) { next(e); }
});

// Expose helpers on the router object for unit testing without changing the runtime behavior
router._test = {
  isAdminEmail,
  findPaymentOwnerEmail,
  verifySelfOrAdmin,
  verifyPaymentOwnerOrAdmin,
  buildPaymentTestLookupPipeline,
  getPaymentsWithTests,
};

module.exports = router;
