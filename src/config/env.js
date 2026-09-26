require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,
  newsApiKey: process.env.NEWS_API_KEY || '',
  youtubeApiKey: process.env.YOUTUBE_API_KEY || '',
  adzunaAppId: process.env.ADZUNA_APP_ID || '',
  adzunaAppKey: process.env.ADZUNA_APP_KEY || '',
  cacheTTL: 3600 // 1 hour in seconds
};
