let prisma = null;

try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error']
  });
} catch (e) {
  // Prisma client unavailable or not yet generated; fallback mode active
  prisma = null;
}

module.exports = prisma;

