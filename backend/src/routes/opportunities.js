const express = require('express');
const router = express.Router();
const opportunityService = require('../services/opportunityService');

router.get('/', async (req, res, next) => {
  try {
    const data = await opportunityService.getOpportunities(req.query.type, req.query);
    res.json({ success: true, ...data });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
