const repository = require('../db/repository');
const { resolveBranch } = require('./branchRecommendationService');
const { fetchLiveJobs } = require('../integrations/adzuna');

const opportunityService = {
  async getOpportunities(type = 'ALL', filters = {}) {
    let internships = await repository.getInternships();
    let jobs = await repository.getJobs();

    if (filters.branch) {
      const branchObj = resolveBranch(filters.branch);
      const targetBranchId = branchObj ? branchObj.id : null;
      const normBranch = filters.branch.toLowerCase();

      // Normalize internship items into a uniform format
      internships = internships.map(i => ({
        id: i.id,
        title: i.title || i.role,
        company: i.company,
        location: i.location || 'India',
        isRemote: i.isRemote || false,
        stipend: i.stipend || i.stipendOrSalary || 'Stipend Provided',
        requiredSkills: i.requiredSkills || i.requirements || [],
        eligibility: i.eligibility || 'Engineering Students',
        applyUrl: i.applyUrl || 'https://linkedin.com',
        source: i.source || 'Verified Portal',
        branch_id: i.branch_id
      }));

      // Sort branch-matched internships first
      internships.sort((a, b) => {
        const aMatch = a.branch_id === targetBranchId ? 1 : 0;
        const bMatch = b.branch_id === targetBranchId ? 1 : 0;
        return bMatch - aMatch;
      });

      // Similar sorting for entry jobs
      jobs = jobs.map(j => ({
        id: j.id,
        title: j.title || j.role,
        company: j.company,
        location: j.location || 'India',
        isRemote: j.isRemote || false,
        salary: j.salary || j.stipendOrSalary || 'Market Standard',
        requiredSkills: j.requiredSkills || j.requirements || [],
        eligibility: j.eligibility || 'Fresh Graduates',
        applyUrl: j.applyUrl || 'https://linkedin.com',
        source: j.source || 'Verified Portal',
        branch_id: j.branch_id
      }));

      jobs.sort((a, b) => {
        const aMatch = a.branch_id === targetBranchId ? 1 : 0;
        const bMatch = b.branch_id === targetBranchId ? 1 : 0;
        return bMatch - aMatch;
      });
    }

    if (filters.skill) {
      const skillFilter = filters.skill.toLowerCase();
      internships = internships.filter(i => (i.requiredSkills || []).some(s => s.toLowerCase().includes(skillFilter)));
      jobs = jobs.filter(j => (j.requiredSkills || []).some(s => s.toLowerCase().includes(skillFilter)));
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
