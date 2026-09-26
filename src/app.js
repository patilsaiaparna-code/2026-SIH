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

// Serve static frontend UI (combining Frontend + Backend on http://localhost:5000)
app.use(express.static(path.join(__dirname, '..')));

// API Route Mounts
app.use('/api/health', healthRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/career-roles', roleRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/planner', plannerRoutes);
app.use('/api/trends', trendRoutes);
app.use('/api/learning-plan', learningPlanRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/branches', branchRoutes);


// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
