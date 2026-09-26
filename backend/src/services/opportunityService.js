const repository = require('../db/repository');
const { fetchLiveJobs } = require('../integrations/adzuna');

const opportunityService = {
  async getOpportunities(type = 'ALL', filters = {}) {
    let internships = await repository.getInternships();
    let jobs = await repository.getJobs();

    if (filters.skill) {
      const skillFilter = filters.skill.toLowerCase();
      internships = internships.filter(i => i.requiredSkills.some(s => s.toLowerCase().includes(skillFilter)));
      jobs = jobs.filter(j => j.requiredSkills.some(s => s.toLowerCase().includes(skillFilter)));
    }

    if (filters.remoteOnly === 'true' || filters.remoteOnly === true) {
      internships = internships.filter(i => i.isRemote);
      jobs = jobs.filter(j => j.isRemote);
    }

    if (type === 'INTERNSHIP' || type === 'internship') {
      return { internships, jobs: [] };
    }
    if (type === 'JOB' || type === 'job') {
      return { internships: [], jobs };
    }

    return { internships, jobs };
  }
};

module.exports = opportunityService;
