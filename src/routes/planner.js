const express = require('express');
const router = express.Router();
const plannerService = require('../services/plannerService');

router.post('/', async (req, res, next) => {
  try {
    const { targetRole, skills } = req.body;
    const plan = await plannerService.generateBackwardPlan(targetRole, skills);
    res.json({ success: true, plan });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
