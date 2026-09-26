const express = require('express');
const router = express.Router();
const studentService = require('../services/studentService');
const { generateRecommendations } = require('../logic/recommendationEngine');

router.get('/:studentId', async (req, res, next) => {
  try {
    const student = await studentService.getStudentProfile(req.params.studentId);
    const data = await generateRecommendations(student);
    res.json({ success: true, ...data });
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const data = await generateRecommendations(req.body);
    res.json({ success: true, ...data });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
