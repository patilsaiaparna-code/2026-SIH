const express = require('express');
const router = express.Router();
const jobService = require('../services/jobService');

router.get('/', async (req, res, next) => {
  try {
    const jobs = await jobService.getJobs(req.query.q, req.query.location);
    res.json({ success: true, count: jobs.length, jobs });
  } catch (e) {
    next(e);
  }
});

router.get('/analysis', async (req, res, next) => {
  try {
    const analysis = await jobService.analyzeJobsForSkills(req.query.role);
    res.json({ success: true, analysis });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
