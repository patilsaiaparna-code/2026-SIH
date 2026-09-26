const express = require('express');
const router = express.Router();
const studentService = require('../services/studentService');

router.post('/', async (req, res, next) => {
  try {
    const student = await studentService.saveStudentProfile(req.body);
    res.status(201).json({ success: true, student });
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const student = await studentService.saveStudentProfile({ ...req.body, id: req.params.id });
    res.json({ success: true, student });
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const student = await studentService.getStudentProfile(req.params.id);
    res.json({ success: true, student });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
