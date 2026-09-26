const repository = require('../db/repository');

const skillService = {
  async getAllSkills() {
    return await repository.getSkills();
  },

  async getSkillByName(name) {
    return await repository.getSkillByName(name);
  },

  async getSkillPath(skillName) {
    const skill = await repository.getSkillByName(skillName);
    const allCourses = await repository.getCourses();
    const allInternships = await repository.getInternships();
    const allJobs = await repository.getJobs();

    const relatedCourses = allCourses.filter(c => 
      c.skillName?.toLowerCase() === skill.name.toLowerCase() ||
      c.title.toLowerCase().includes(skill.name.toLowerCase())
    );

    const relatedInternships = allInternships.filter(i => {
      const reqs = i.requiredSkills || i.requirements || [];
      return reqs.some(s => s.toLowerCase() === skill.name.toLowerCase() || skill.name.toLowerCase().includes(s.toLowerCase()));
    });

    const relatedJobs = allJobs.filter(j => {
      const reqs = j.requiredSkills || j.requirements || [];
      return reqs.some(s => s.toLowerCase() === skill.name.toLowerCase() || skill.name.toLowerCase().includes(s.toLowerCase()));
    });

    return {
      skill,
      trajectory: {
        skillName: skill.name,
        whyItMatters: skill.whyItMatters,
        demandBadge: skill.demandBadge,
        relatedCourses: relatedCourses.length > 0 ? relatedCourses : [allCourses[0]],
        relatedInternships: relatedInternships.length > 0 ? relatedInternships : [allInternships[0]],
        relatedJobs: relatedJobs.length > 0 ? relatedJobs : [allJobs[0]]
      }
    };
  }
};

module.exports = skillService;
