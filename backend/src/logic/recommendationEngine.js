const repository = require('../db/repository');
const { calculateSkillGap } = require('./skillGap');

async function generateRecommendations(studentProfile = {}) {
  const targetRoleName = studentProfile.targetRole || 'Data Scientist';
  const currentSkills = studentProfile.currentSkills || ['Python'];
  const branch = studentProfile.branch || 'CSE';
  const year = studentProfile.year || '2nd Year';

  // 1. Determine Target Role & Skill Gap
  const role = await repository.getCareerRoleByName(targetRoleName);
  const allSkills = await repository.getSkills();
  const allCourses = await repository.getCourses();
  const allInternships = await repository.getInternships();
  const allJobs = await repository.getJobs();
  const allTrends = await repository.getTrends();

  // Primary Skill Focus (highest priority missing skill or primary skill)
  let targetSkillName = 'Python';
  if (targetRoleName.toLowerCase().includes('data analyst')) {
    targetSkillName = currentSkills.includes('SQL') ? 'Data Visualization' : 'SQL';
  } else if (targetRoleName.toLowerCase().includes('cloud') || targetRoleName.toLowerCase().includes('devops')) {
    targetSkillName = currentSkills.includes('AWS') ? 'Docker & Kubernetes' : 'AWS';
  } else if (targetRoleName.toLowerCase().includes('software') || targetRoleName.toLowerCase().includes('sde')) {
    targetSkillName = currentSkills.includes('Data Structures & Algorithms (DSA)') ? 'Git & GitHub' : 'Data Structures & Algorithms (DSA)';
  } else {
    targetSkillName = currentSkills.includes('Python') ? 'Machine Learning' : 'Python';
  }

  const primarySkill = allSkills.find(s => s.name.toLowerCase() === targetSkillName.toLowerCase()) || allSkills[0];

  // Recommended Course matching primary skill
  const matchedCourse = allCourses.find(c => 
    c.skillName?.toLowerCase() === primarySkill.name.toLowerCase() ||
    c.title.toLowerCase().includes(primarySkill.name.toLowerCase())
  ) || allCourses[0];

  // Matched Internship
  const matchedInternship = allInternships.find(i => 
    i.requiredSkills.some(s => currentSkills.includes(s) || s.toLowerCase() === primarySkill.name.toLowerCase())
  ) || allInternships[0];

  // Target Early Job
  const matchedJob = allJobs.find(j => 
    j.title.toLowerCase().includes(targetRoleName.toLowerCase()) ||
    j.requiredSkills.some(s => currentSkills.includes(s))
  ) || allJobs[0];

  // Key Industry Trend
  let matchedTrendTopic = 'Generative AI';
  if (targetRoleName.toLowerCase().includes('cloud') || targetRoleName.toLowerCase().includes('devops')) {
    matchedTrendTopic = 'Cloud Computing';
  } else if (targetRoleName.toLowerCase().includes('analyst')) {
    matchedTrendTopic = 'Data Analytics';
  }
  const matchedTrend = allTrends.find(t => t.topic.toLowerCase() === matchedTrendTopic.toLowerCase()) || allTrends[0];

  return {
    studentSummary: {
      branch,
      year,
      targetRole: targetRoleName,
      currentSkillsCount: currentSkills.length
    },
    recommendations: {
      primarySkill: {
        type: "PRIMARY_SKILL",
        title: primarySkill.name,
        badge: primarySkill.demandBadge || "HIGH DEMAND",
        description: primarySkill.whyItMatters || primarySkill.description,
        actionText: "EXPLORE SKILL →"
      },
      recommendedCourse: {
        type: "COURSE",
        title: matchedCourse.title,
        platform: matchedCourse.platform,
        priceTag: matchedCourse.isFree ? "FREE" : matchedCourse.price,
        url: matchedCourse.url,
        actionText: "VIEW COURSE →"
      },
      matchedInternship: {
        type: "INTERNSHIP",
        title: matchedInternship.title,
        company: matchedInternship.company,
        location: matchedInternship.location,
        stipend: matchedInternship.stipend,
        applyUrl: matchedInternship.applyUrl,
        actionText: "APPLY PORTAL →"
      },
      targetJob: {
        type: "JOB",
        title: matchedJob.title,
        company: matchedJob.company,
        salary: matchedJob.salary,
        location: matchedJob.location,
        applyUrl: matchedJob.applyUrl,
        actionText: "VIEW JOB →"
      },
      industryTrend: {
        type: "TREND",
        topic: matchedTrend.topic,
        trendLevel: matchedTrend.trendLevel,
        takeaway: matchedTrend.takeaway,
        actionText: "CHECK REALITY →"
      }
    }
  };
}

module.exports = { generateRecommendations };
