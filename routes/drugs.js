const express = require('express');
const router = express.Router();
const Drug = require('../models/Drug');

// GET 所有藥品
router.get('/', async (req, res) => {
  const drugs = await Drug.find();
  res.json(drugs);
});

// GET 指定藥品
router.get('/:code', async (req, res) => {
  const drug = await Drug.findOne({ code: req.params.code });
  if (!drug) return res.status(404).send('Drug not found');
  res.json(drug);
});

// POST 新增藥品
router.post('/', async (req, res) => {
  const drug = new Drug(req.body);
  await drug.save();
  res.status(201).json(drug);
});

// PUT 更新藥品
router.put('/:code', async (req, res) => {
  const drug = await Drug.findOneAndUpdate({ code: req.params.code }, req.body, { new: true });
  res.json(drug);
});

// DELETE 刪除藥品
router.delete('/:code', async (req, res) => {
  await Drug.findOneAndDelete({ code: req.params.code });
  res.json({ message: 'Drug deleted' });
});

module.exports = router;
