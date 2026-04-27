const express = require('express');
const { collections, ObjectId } = require('../config/db');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');
const { requireFields, validateEmailParam, validateObjectIdParam } = require('../middlewares/validate');

const router = express.Router();

// GET /users (admin)
router.get('/users', verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const { userCollection } = collections();
    const users = await userCollection.find().toArray();
    res.send(users);
  } catch (e) { next(e); }
});

// GET /users/:email (admin)
router.get('/users/:email', validateEmailParam('email'), verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const { userCollection } = collections();
    const users = await userCollection.find({ email: req.params.email }).toArray();
    res.send(users);
  } catch (e) { next(e); }
});

// POST /users
router.post('/users', requireFields(['name', 'email', 'photoURL', 'bloodGroup', 'district', 'upazila', 'uid', 'isAdmin', 'active']), async (req, res, next) => {
  try {
    const { userCollection } = collections();
    const result = await userCollection.insertOne(req.body);
    res.json(result);
  } catch (e) { next(e); }
});

// PATCH /users/:email (JWT required)
router.patch('/users/:email', validateEmailParam('email'), verifyToken, requireFields(['name', 'bloodGroup', 'district', 'upazila', 'photoURL']), async (req, res, next) => {
  try {
    const { userCollection } = collections();
    const email = req.params.email;
    const updateDoc = {
      $set: {
        name: req.body.name,
        bloodGroup: req.body.bloodGroup,
        district: req.body.district,
        upazila: req.body.upazila,
        photoURL: req.body.photoURL,
      },
    };
    const result = await userCollection.updateOne({ email }, updateDoc);
    res.send(result);
  } catch (e) { next(e); }
});

// PATCH /users/admin/:id (admin)
router.patch('/users/admin/:id', validateObjectIdParam('id'), verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const { userCollection } = collections();
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const existingUser = await userCollection.findOne(filter);
    const newRole = !existingUser?.isAdmin;
    const result = await userCollection.updateOne(filter, { $set: { isAdmin: newRole } });
    res.send(result);
  } catch (e) { next(e); }
});

// PATCH /users/active/:id (admin)
router.patch('/users/active/:id', validateObjectIdParam('id'), verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const { userCollection } = collections();
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const existingUser = await userCollection.findOne(filter);
    const newStatus = !existingUser?.active;
    const result = await userCollection.updateOne(filter, { $set: { active: newStatus } });
    res.send(result);
  } catch (e) { next(e); }
});

// GET /users/admin/:email
router.get('/users/admin/:email', validateEmailParam('email'), async (req, res, next) => {
  try {
    const { userCollection } = collections();
    const email = req.params.email;
    const user = await userCollection.findOne({ email });
    res.send({ isAdmin: !!user?.isAdmin });
  } catch (e) { next(e); }
});

// GET /users/active/:email
router.get('/users/active/:email', validateEmailParam('email'), async (req, res, next) => {
  try {
    const { userCollection } = collections();
    const email = req.params.email;
    const user = await userCollection.findOne({ email });
    res.send({ isActive: !!user?.active });
  } catch (e) { next(e); }
});

module.exports = router;
