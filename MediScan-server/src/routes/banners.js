const express = require('express');
const { collections, ObjectId } = require('../config/db');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');

const router = express.Router();

// GET /banners
router.get('/banners', async (req, res, next) => {
  try {
    const { bannerCollection } = collections();
    const banners = await bannerCollection.find().toArray();
    res.send(banners);
  } catch (e) { next(e); }
});

// GET /banners/active
router.get('/banners/active', async (req, res, next) => {
  try {
    const { bannerCollection } = collections();
    const banners = await bannerCollection.find({ isActive: true }).toArray();
    res.send(banners);
  } catch (e) { next(e); }
});

// POST /banners (admin)
router.post('/banners', verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const { bannerCollection } = collections();
    const result = await bannerCollection.insertOne(req.body);
    res.json(result);
  } catch (e) { next(e); }
});

// PATCH /banners/active/:id (admin)
router.patch('/banners/active/:id', verifyToken, verifyAdmin, async (req, res, next) => {
  const { bannerCollection } = collections();
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const activateBanner = async () => bannerCollection.updateOne(filter, { $set: { isActive: true } });
  const deactivateOtherBanners = async () =>
    bannerCollection.updateMany({ _id: { $ne: new ObjectId(id) } }, { $set: { isActive: false } });
  try {
    const [activateResult, deactivateResult] = await Promise.all([activateBanner(), deactivateOtherBanners()]);
    res.send({ activateResult, deactivateResult });
  } catch (error) {
    next(error);
  }
});

// DELETE /banners/:id (admin)
router.delete('/banners/:id', verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const { bannerCollection } = collections();
    const id = req.params.id;
    const result = await bannerCollection.deleteOne({ _id: new ObjectId(id) });
    res.send(result);
  } catch (e) { next(e); }
});

module.exports = router;
