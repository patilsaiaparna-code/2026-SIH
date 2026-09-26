const app = require('./app');
const env = require('./config/env');

const PORT = env.port || 5000;

const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🎓 StudentHub Backend API running on port ${PORT}`);
  console.log(`📡 Health check available at: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});

module.exports = server;
