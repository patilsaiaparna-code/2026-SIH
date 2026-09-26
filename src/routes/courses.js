const express = require('express');
const router = express.Router();
const courseService = require('../services/courseService');

router.get('/', async (req, res, next) => {
  try {
    const courses = await courseService.getCourses(req.query);
    res.json({ success: true, count: courses.length, courses });
  } catch (e) {
    next(e);
  }
});

router.get('/videos', async (req, res, next) => {
  try {
    const videos = await courseService.getEducationalVideos(req.query.q);
    res.json({ success: true, videos });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
