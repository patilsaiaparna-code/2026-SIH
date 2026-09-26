const express = require('express');
const router = express.Router();
const repository = require('../db/repository');
const { generateBranchRecommendation } = require('../services/branchRecommendationService');

// GET /api/branches - List supported engineering branches
router.get('/', (req, res, next) => {
  try {
    const branches = repository.getBranches();
    res.json({ success: true, count: branches.length, branches });
  } catch (err) {
    next(err);
  }
});

// GET /api/branches/:branch/courses - List branch-specific domain courses
router.get('/:branch/courses', (req, res, next) => {
  try {
    const branch = req.params.branch;
    const { difficulty, search } = req.query;
    const courses = repository.getBranchCourses(branch, { difficulty, search });
    res.json({ success: true, branch, count: courses.length, courses });
  } catch (err) {
    next(err);
  }
});

// GET /api/branches/:branch/careers - List branch career roles
router.get('/:branch/careers', (req, res, next) => {
  try {
    const branch = req.params.branch;
    const careers = repository.getBranchCareers(branch);
    res.json({ success: true, branch, count: careers.length, careers });
  } catch (err) {
    next(err);
  }
});

// GET /api/branches/:branch/roadmap - Get branch career roadmap
router.get('/:branch/roadmap', (req, res, next) => {
  try {
    const branch = req.params.branch;
    const { career } = req.query;
    const roadmap = repository.getBranchRoadmap(branch, career);
    res.json({ success: true, branch, roadmap });
  } catch (err) {
    next(err);
  }
});

// POST /api/branches/recommendations - Personalized branch recommendation engine
router.post('/recommendations', (req, res, next) => {
  try {
    const { branch, currentSkills, targetRole, selectedCourseName, difficulty } = req.body;
    const result = generateBranchRecommendation({
      branch,
      currentSkills: Array.isArray(currentSkills) ? currentSkills : [],
      targetRole,
      selectedCourseName,
      difficulty
    });
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
