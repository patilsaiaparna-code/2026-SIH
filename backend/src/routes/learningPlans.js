const express = require('express');
const router = express.Router();
const { generateLearningPlan } = require('../logic/learningPlan');

router.post('/', (req, res, next) => {
  try {
    const { days, hoursPerWeek, goal } = req.body;
    const plan = generateLearningPlan(Number(days) || 30, Number(hoursPerWeek) || 5, goal || 'Data Scientist');
    res.json({ success: true, plan });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
