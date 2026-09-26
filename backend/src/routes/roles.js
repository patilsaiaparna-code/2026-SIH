const express = require('express');
const router = express.Router();
const roleService = require('../services/roleService');

router.get('/', async (req, res, next) => {
  try {
    const roles = await roleService.getAllRoles();
    res.json({ success: true, count: roles.length, roles });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
