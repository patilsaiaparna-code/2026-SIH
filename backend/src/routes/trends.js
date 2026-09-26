const express = require('express');
const router = express.Router();
const repository = require('../db/repository');
const { evaluateTrendReality } = require('../logic/trendChecker');

router.get('/', async (req, res, next) => {
  try {
    const trends = await repository.getTrends();
    res.json({ success: true, count: trends.length, trends });
  } catch (e) {
    next(e);
  }
});

router.get('/:topic', async (req, res, next) => {
  try {
    const evaluation = evaluateTrendReality(req.params.topic, req.query.role);
    res.json({ success: true, trend: evaluation });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
