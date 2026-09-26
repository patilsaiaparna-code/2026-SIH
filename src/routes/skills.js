const express = require('express');
const router = express.Router();
const skillService = require('../services/skillService');

router.get('/', async (req, res, next) => {
  try {
    const skills = await skillService.getAllSkills();
    res.json({ success: true, count: skills.length, skills });
  } catch (e) {
    next(e);
  }
});

router.get('/:name/path', async (req, res, next) => {
  try {
    const result = await skillService.getSkillPath(req.params.name);
    res.json({ success: true, ...result });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
