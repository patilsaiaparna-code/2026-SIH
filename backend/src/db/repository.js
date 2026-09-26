const prisma = require('./prisma');
const seedData = require('../../prisma/seed');

let isDbConnected = false;

// Attempt an initial health ping
async function checkDbConnection() {
  if (!prisma) {
    isDbConnected = false;
    return false;
  }
  try {
    await prisma.$queryRaw`SELECT 1`;
    isDbConnected = true;
    return true;
  } catch (err) {
    isDbConnected = false;
    return false;
  }
}

checkDbConnection();

const repository = {
  isDbConnected: () => isDbConnected,

  async getCareerRoles() {
    if (isDbConnected) {
      try {
        const roles = await prisma.careerRole.findMany({
          include: { roleSkills: { include: { skill: true } } }
        });
        if (roles && roles.length > 0) return roles;
      } catch (e) {
        isDbConnected = false;
      }
    }
    return seedData.careerRoles;
  },

  async getCareerRoleByName(name) {
    if (isDbConnected) {
      try {
        const role = await prisma.careerRole.findUnique({
          where: { name },
          include: { roleSkills: { include: { skill: true } } }
        });
        if (role) return role;
      } catch (e) {
        isDbConnected = false;
      }
    }
    const target = seedData.careerRoles.find(r => r.name.toLowerCase() === name.toLowerCase());
    return target || seedData.careerRoles[0];
  },

  async getSkills() {
    if (isDbConnected) {
      try {
        const skills = await prisma.skill.findMany();
        if (skills && skills.length > 0) return skills;
      } catch (e) {
        isDbConnected = false;
      }
    }
    return seedData.skills;
  },

  async getSkillByName(name) {
    if (isDbConnected) {
      try {
        const skill = await prisma.skill.findUnique({ where: { name } });
        if (skill) return skill;
      } catch (e) {
        isDbConnected = false;
      }
    }
    const skill = seedData.skills.find(s => s.name.toLowerCase() === name.toLowerCase());
    return skill || seedData.skills[0];
  },

  async getCourses(filters = {}) {
    let courses = seedData.courses;
    if (isDbConnected) {
      try {
        const dbCourses = await prisma.course.findMany({ include: { skill: true } });
        if (dbCourses && dbCourses.length > 0) courses = dbCourses;
      } catch (e) {
        isDbConnected = false;
      }
    }

    if (filters.platform && filters.platform !== 'ALL') {
      courses = courses.filter(c => c.platform.toLowerCase() === filters.platform.toLowerCase());
    }
    if (filters.isFree !== undefined && filters.isFree !== 'ALL') {
      const wantFree = filters.isFree === true || filters.isFree === 'true' || filters.isFree === 'FREE';
      courses = courses.filter(c => c.isFree === wantFree);
    }
    if (filters.skill) {
      courses = courses.filter(c => c.skillName?.toLowerCase() === filters.skill.toLowerCase() || c.skill?.name?.toLowerCase() === filters.skill.toLowerCase());
    }
    return courses;
  },

  async getProjects() {
    if (isDbConnected) {
      try {
        const projects = await prisma.project.findMany();
        if (projects && projects.length > 0) return projects;
      } catch (e) {
        isDbConnected = false;
      }
    }
    return seedData.projects;
  },

  async getInternships() {
    if (isDbConnected) {
      try {
        const internships = await prisma.internship.findMany();
        if (internships && internships.length > 0) return internships;
      } catch (e) {
        isDbConnected = false;
      }
    }
    return seedData.internships;
  },

  async getJobs() {
    if (isDbConnected) {
      try {
        const jobs = await prisma.job.findMany();
        if (jobs && jobs.length > 0) return jobs;
      } catch (e) {
        isDbConnected = false;
      }
    }
    return seedData.jobs;
  },

  async getTrends() {
    if (isDbConnected) {
      try {
        const trends = await prisma.trend.findMany();
        if (trends && trends.length > 0) return trends;
      } catch (e) {
        isDbConnected = false;
      }
    }
    return seedData.trends;
  },

  async getTrendByTopic(topic) {
    if (isDbConnected) {
      try {
        const trend = await prisma.trend.findUnique({ where: { topic } });
        if (trend) return trend;
      } catch (e) {
        isDbConnected = false;
      }
    }
    const trend = seedData.trends.find(t => t.topic.toLowerCase() === topic.toLowerCase());
    return trend || seedData.trends[0];
  }
};

module.exports = repository;
