const express = require('express');
const router = express.Router();
const repository = require('../db/repository');
const env = require('../config/env');

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'StudentHub Backend API',
    timestamp: new Date().toISOString(),
    environment: env.nodeEnv,
    database: {
      connected: repository.isDbConnected(),
      mode: repository.isDbConnected() ? 'PostgreSQL (Prisma)' : 'Seeded Local Fallback Store'
    },
    integrations: {
      newsApi: !!env.newsApiKey,
      youtubeApi: !!env.youtubeApiKey,
      adzunaApi: !!(env.adzunaAppId && env.adzunaAppKey)
    }
  });
});

module.exports = router;
