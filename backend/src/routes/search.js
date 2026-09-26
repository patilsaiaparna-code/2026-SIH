const express = require('express');
const router = express.Router();
const repository = require('../db/repository');
const newsService = require('../services/newsService');

router.get('/', async (req, res, next) => {
  try {
    const q = (req.query.q || '').trim().toLowerCase();
    if (!q) {
      return res.json({ success: true, results: { courses: [], skills: [], jobs: [], internships: [], news: [] } });
    }

    const allCourses = await repository.getCourses();
    const allSkills = await repository.getSkills();
    const allJobs = await repository.getJobs();
    const allInternships = await repository.getInternships();
    const allNews = await newsService.getNews(q);

    const filteredCourses = allCourses.filter(c => c.title.toLowerCase().includes(q) || c.platform.toLowerCase().includes(q));
    const filteredSkills = allSkills.filter(s => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
    const filteredJobs = allJobs.filter(j => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q));
    const filteredInternships = allInternships.filter(i => i.title.toLowerCase().includes(q) || i.company.toLowerCase().includes(q));
    const filteredNews = allNews.filter(n => n.title.toLowerCase().includes(q) || n.snippet.toLowerCase().includes(q));

    res.json({
      success: true,
      query: q,
      results: {
        courses: filteredCourses,
        skills: filteredSkills,
        jobs: filteredJobs,
        internships: filteredInternships,
        news: filteredNews
      }
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
