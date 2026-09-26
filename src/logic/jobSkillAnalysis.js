const { normalizeSkillName } = require('./skillGap');

function analyzeJobSkills(jobListings = [], knownSkills = []) {
  const skillFrequency = {};

  knownSkills.forEach(skill => {
    skillFrequency[skill.name] = 0;
  });

  jobListings.forEach(job => {
    const combinedText = `${job.title} ${job.requiredSkills ? job.requiredSkills.join(' ') : ''} ${job.description || ''}`.toLowerCase();
    
    knownSkills.forEach(skill => {
      const normName = normalizeSkillName(skill.name).toLowerCase();
      if (combinedText.includes(normName)) {
        skillFrequency[skill.name] = (skillFrequency[skill.name] || 0) + 1;
      }
    });

    if (job.requiredSkills && Array.isArray(job.requiredSkills)) {
      job.requiredSkills.forEach(req => {
        const normReq = normalizeSkillName(req);
        if (!skillFrequency[normReq]) {
          skillFrequency[normReq] = 1;
        }
      });
    }
  });

  const sortedSkills = Object.entries(skillFrequency)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return {
    totalJobsAnalyzed: jobListings.length,
    inDemandSkills: sortedSkills.filter(s => s.count > 0)
  };
}

module.exports = { analyzeJobSkills };
