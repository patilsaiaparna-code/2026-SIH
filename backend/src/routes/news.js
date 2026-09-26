const express = require('express');
const router = express.Router();
const newsService = require('../services/newsService');

router.get('/', async (req, res, next) => {
  try {
    const articles = await newsService.getNews(req.query.q);
    res.json({ success: true, count: articles.length, news: articles });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
