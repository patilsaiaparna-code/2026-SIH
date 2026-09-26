const repository = require('../db/repository');
const { fetchLiveJobs } = require('../integrations/adzuna');
const { analyzeJobSkills } = require('../logic/jobSkillAnalysis');

const jobService = {
  async getJobs(query = 'Data Scientist', location = 'India') {
    const liveJobs = await fetchLiveJobs(query, location);
    const curatedJobs = await repository.getJobs();
    
    // Combine and deduplicate
    const combined = [...liveJobs, ...curatedJobs];
    const unique = Array.from(new Map(combined.map(j => [j.title + j.company, j])).values());
    
    return unique;
  },

  async analyzeJobsForSkills(query = 'Data Scientist') {
    const jobs = await this.getJobs(query);
    const knownSkills = await repository.getSkills();
    return analyzeJobSkills(jobs, knownSkills);
  }
};

module.exports = jobService;
