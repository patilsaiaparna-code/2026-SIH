const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const apiRateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

const healthRoutes = require('./routes/health');
const studentRoutes = require('./routes/students');
const roleRoutes = require('./routes/roles');
const skillRoutes = require('./routes/skills');
const courseRoutes = require('./routes/courses');
const jobRoutes = require('./routes/jobs');
const opportunityRoutes = require('./routes/opportunities');
const newsRoutes = require('./routes/news');
const plannerRoutes = require('./routes/planner');
const trendRoutes = require('./routes/trends');
const learningPlanRoutes = require('./routes/learningPlans');
const recommendationRoutes = require('./routes/recommendations');
const searchRoutes = require('./routes/search');
const branchRoutes = require('./routes/branches');

const app = express();

// Security & Parsing Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRateLimiter);

// Serve static frontend UI
app.use(express.static(path.join(__dirname, '..')));

// API Route Mounts (Support both /api/path and /path for Vercel Serverless Rewrites)
const routes = [
  ['health', healthRoutes],
  ['students', studentRoutes],
  ['career-roles', roleRoutes],
  ['skills', skillRoutes],
  ['courses', courseRoutes],
  ['jobs', jobRoutes],
  ['opportunities', opportunityRoutes],
  ['news', newsRoutes],
  ['planner', plannerRoutes],
  ['trends', trendRoutes],
  ['learning-plan', learningPlanRoutes],
  ['recommendations', recommendationRoutes],
  ['search', searchRoutes],
  ['branches', branchRoutes]
];

routes.forEach(([pathName, router]) => {
  app.use([`/api/${pathName}`, `/${pathName}`], router);
});

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
